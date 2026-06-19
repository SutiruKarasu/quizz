Hier ist dein kompletter, modifizierter JavaScript-Code. Ich habe deine drei neuen Features (Punkte-Prognose, die taktischen Lifelines/Perks und die finale Rang-Berechnung) nahtlos in deine bestehende Engine, die Audio-Synthese und das Google-Sheets-Matching integriert.
```javascript
// --- GOOGLE SHEETS INTERFACE URL ---
const GOOGLE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwVcLK_qD7fDpF1VyaeIeSCVcAjYE8FC9kRGB6lHww7iBlzlAch_p0AqSOQ0hyUdl5dCw/exec";

// --- 1. ACCESS CONTROL ---
window.onload = function() {
    // Geändert auf 'quiz_v2', damit alte Spieler wieder teilnehmen können
    if (localStorage.getItem('quiz_v2') === 'true') {
        document.getElementById('start-screen').innerHTML = `
            <div class="login-card" style="text-align: center;">
                <h1 style="color: #ff4757; margin-bottom: 15px;">Shift Denied</h1>
                <p style="margin-bottom: 30px;">You have already clocked in for this event.<br>Only one attempt per session is authorized.</p>
            </div>
        `;
        const restartBtn = document.getElementById('restart-btn');
        if(restartBtn) restartBtn.onclick = () => { localStorage.clear(); location.reload(); };
    }
};

// --- 2. THE 60-QUESTION DATABASE (NEW QUESTIONS) ---
const quizData = [
    // --- BLOCK 1: NATURE & ANIMALS ---
    { topic: "Nature", q: "What is the fastest land animal?", a: ["Cheetah", "Lion", "Horse", "Gazelle"], c: 0 },
    { topic: "Nature", q: "What is the largest mammal in the world?", a: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], c: 1 },
    { topic: "Nature", q: "Which bird is known for its ability to fly backwards?", a: ["Eagle", "Pigeon", "Hummingbird", "Woodpecker"], c: 2 },
    { topic: "Nature", q: "How many legs does an arachnid (spider) have?", a: ["6", "8", "10", "12"], c: 1 },
    { topic: "Nature", q: "What do you call a group of lions?", a: ["Pack", "Herd", "Flock", "Pride"], c: 3 },
    { topic: "Nature", q: "Which sea creature has three hearts?", a: ["Dolphin", "Shark", "Octopus", "Seahorse"], c: 2 },
    { topic: "Nature", q: "What is the tallest species of tree in the world?", a: ["Oak", "Redwood", "Pine", "Maple"], c: 1 },
    { topic: "Nature", q: "Which bear lives exclusively in the Arctic?", a: ["Grizzly Bear", "Black Bear", "Polar Bear", "Panda Bear"], c: 2 },
    { topic: "Nature", q: "What is the national animal of Australia?", a: ["Koala", "Kangaroo", "Platypus", "Emu"], c: 1 },
    { topic: "Nature", q: "Which animal is known to have the longest lifespan?", a: ["Giant Tortoise", "Elephant", "Parrot", "Chimpanzee"], c: 0 },

    // --- BLOCK 2: FOOD & DRINK ---
    { topic: "Food", q: "What is the primary ingredient in guacamole?", a: ["Tomato", "Avocado", "Onion", "Lime"], c: 1 },
    { topic: "Food", q: "Which country is the origin of Pizza?", a: ["France", "Greece", "USA", "Italy"], c: 3 },
    { topic: "Food", q: "What is sushi traditionally wrapped in?", a: ["Lettuce", "Rice Paper", "Seaweed", "Tortilla"], c: 2 },
    { topic: "Food", q: "Which nut is used to make marzipan?", a: ["Peanut", "Almond", "Walnut", "Cashew"], c: 1 },
    { topic: "Food", q: "What is tofu made from?", a: ["Wheat", "Almonds", "Soybeans", "Rice"], c: 2 },
    { topic: "Food", q: "Which fast-food chain is famous for the 'Golden Arches'?", a: ["Burger King", "Wendy's", "McDonald's", "KFC"], c: 2 },
    { topic: "Food", q: "What type of pasta is shaped like little bows or butterflies?", a: ["Spaghetti", "Penne", "Farfalle", "Macaroni"], c: 2 },
    { topic: "Food", q: "What is the main ingredient in traditional hummus?", a: ["Lentils", "Chickpeas", "Black Beans", "Peas"], c: 1 },
    { topic: "Food", q: "Which beverage is brewed from roasted beans?", a: ["Tea", "Coffee", "Hot Chocolate", "Kombucha"], c: 1 },
    { topic: "Food", q: "What is the spiciest chili pepper in the world (as of recent records)?", a: ["Jalapeno", "Habanero", "Carolina Reaper", "Ghost Pepper"], c: 2 },

    // --- BLOCK 3: CINEMA & MOVIES ---
    { topic: "Cinema", q: "Who directed the movie 'Jurassic Park'?", a: ["James Cameron", "Steven Spielberg", "George Lucas", "Christopher Nolan"], c: 1 },
    { topic: "Cinema", q: "What is the first rule of Fight Club?", a: ["Always win", "Do not talk about Fight Club", "Bring your own gloves", "No weapons"], c: 1 },
    { topic: "Cinema", q: "What color is the pill Neo takes in 'The Matrix'?", a: ["Blue", "Red", "Green", "Yellow"], c: 1 },
    { topic: "Cinema", q: "Which movie holds the record for the highest-grossing film of all time?", a: ["Avengers: Endgame", "Titanic", "Avatar", "Star Wars"], c: 2 },
    { topic: "Cinema", q: "Who played the character Jack in 'Titanic'?", a: ["Brad Pitt", "Johnny Depp", "Leonardo DiCaprio", "Tom Cruise"], c: 2 },
    { topic: "Cinema", q: "What is the name of the hobbit who destroys the One Ring?", a: ["Sam", "Merry", "Pippin", "Frodo"], c: 3 },
    { topic: "Cinema", q: "Which horror movie features a terrifying clown named Pennywise?", a: ["Halloween", "IT", "Scream", "The Conjuring"], c: 1 },
    { topic: "Cinema", q: "Who is Darth Vader's son?", a: ["Han Solo", "Chewbacca", "Luke Skywalker", "Kylo Ren"], c: 2 },
    { topic: "Cinema", q: "Which actor plays Iron Man in the Marvel Cinematic Universe?", a: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"], c: 2 },
    { topic: "Cinema", q: "Which animated film features a flying house suspended by balloons?", a: ["Toy Story", "Up", "Finding Nemo", "Shrek"], c: 1 },

    // --- BLOCK 4: ARTS & LITERATURE ---
    { topic: "Arts", q: "Who painted 'The Starry Night'?", a: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Salvador Dali"], c: 1 },
    { topic: "Arts", q: "Who wrote the dystopian novel '1984'?", a: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "J.D. Salinger"], c: 1 },
    { topic: "Arts", q: "Which artist is famous for painting melting clocks?", a: ["Salvador Dali", "Frida Kahlo", "Andy Warhol", "Henri Matisse"], c: 0 },
    { topic: "Arts", q: "Who is the author of the 'Harry Potter' series?", a: ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "Stephen King"], c: 2 },
    { topic: "Arts", q: "In which museum is the 'Mona Lisa' currently displayed?", a: ["The Met", "British Museum", "The Louvre", "Prado Museum"], c: 2 },
    { topic: "Arts", q: "What is the traditional Japanese art of paper folding called?", a: ["Ikebana", "Origami", "Haiku", "Bonsai"], c: 1 },
    { topic: "Arts", q: "Who wrote the ancient Greek epic 'The Odyssey'?", a: ["Sophocles", "Homer", "Aristotle", "Plato"], c: 1 },
    { topic: "Arts", q: "Which famous playwright wrote 'Hamlet'?", a: ["William Shakespeare", "Arthur Miller", "Oscar Wilde", "Anton Chekhov"], c: 0 },
    { topic: "Arts", q: "What architectural style is Notre-Dame Cathedral in Paris?", a: ["Baroque", "Renaissance", "Gothic", "Modernist"], c: 2 },
    { topic: "Arts", q: "Who sculpted the famous masterpiece 'David'?", a: ["Donatello", "Raphael", "Leonardo da Vinci", "Michelangelo"], c: 3 },

    // --- BLOCK 5: MYTHOLOGY ---
    { topic: "Mythology", q: "Who is the Greek god of the sea?", a: ["Zeus", "Hades", "Poseidon", "Apollo"], c: 2 },
    { topic: "Mythology", q: "What is the name of Thor's magical hammer?", a: ["Gungnir", "Mjolnir", "Excalibur", "Aegis"], c: 1 },
    { topic: "Mythology", q: "Who was the king of the Roman gods?", a: ["Mars", "Jupiter", "Neptune", "Mercury"], c: 1 },
    { topic: "Mythology", q: "Which mythological creature is half-man and half-bull?", a: ["Centaur", "Minotaur", "Satyr", "Griffin"], c: 1 },
    { topic: "Mythology", q: "Who flew too close to the sun with wings made of wax?", a: ["Icarus", "Daedalus", "Perseus", "Theseus"], c: 0 },
    { topic: "Mythology", q: "In Egyptian mythology, who is the god of the afterlife?", a: ["Ra", "Horus", "Osiris", "Seth"], c: 2 },
    { topic: "Mythology", q: "What is the Greek realm of the dead called?", a: ["Tartarus", "Hades", "Elysium", "Valhalla"], c: 1 },
    { topic: "Mythology", q: "Which Greek goddess sprang fully grown from Zeus's head?", a: ["Aphrodite", "Hera", "Athena", "Artemis"], c: 2 },
    { topic: "Mythology", q: "Who cursed himself by wishing everything he touched turned to gold?", a: ["King Arthur", "King Midas", "King Solomon", "King Oedipus"], c: 1 },
    { topic: "Mythology", q: "What mythical bird is known to rise from its own ashes?", a: ["Griffin", "Thunderbird", "Phoenix", "Harpy"], c: 2 },

    // --- BLOCK 6: GAMING ---
    { topic: "Gaming", q: "What is the best-selling video game console of all time?", a: ["Xbox 360", "PlayStation 2", "Nintendo Wii", "PlayStation 4"], c: 1 },
    { topic: "Gaming", q: "What is the highest-grossing video game franchise globally?", a: ["Mario", "Call of Duty", "Pokémon", "Grand Theft Auto"], c: 2 },
    { topic: "Gaming", q: "Who is the main protagonist of the 'Halo' series?", a: ["Master Chief", "Marcus Fenix", "Kratos", "Doomguy"], c: 0 },
    { topic: "Gaming", q: "What popular block-building game was created by Markus Persson?", a: ["Terraria", "Roblox", "Minecraft", "Fortnite"], c: 2 },
    { topic: "Gaming", q: "What is the name of Mario's taller brother?", a: ["Wario", "Toad", "Bowser", "Luigi"], c: 3 },
    { topic: "Gaming", q: "Which company created the Game Boy?", a: ["Sega", "Sony", "Nintendo", "Atari"], c: 2 },
    { topic: "Gaming", q: "In the classic arcade game 'Pac-Man', what are the primary enemies?", a: ["Aliens", "Zombies", "Ghosts", "Robots"], c: 2 },
    { topic: "Gaming", q: "What explosive enemy is famous for destroying players' buildings in Minecraft?", a: ["Zombie", "Skeleton", "Enderman", "Creeper"], c: 3 },
    { topic: "Gaming", q: "What is the primary setting of the 'Fallout' game series?", a: ["Fantasy Realm", "Post-apocalyptic wasteland", "Cyberpunk city", "Deep Space"], c: 1 },
    { topic: "Gaming", q: "Which popular game involves playing soccer with rocket-powered cars?", a: ["Twisted Metal", "Rocket League", "Forza Horizon", "Gran Turismo"], c: 1 }
];

// --- 3. NATIVE AUDIO SYNTHESIS FOR SOUND EFFECTS ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playTickSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, audioCtx.currentTime); 
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime); 
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04); 
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.04);
}

function playCorrectSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); 
    gain1.gain.setValueAtTime(0.06, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.08);

    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.07); 
    gain2.gain.setValueAtTime(0.06, now + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.22);
}

function playWrongSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    osc.type = 'sawtooth'; 
    osc.frequency.setValueAtTime(160, now); 
    osc.frequency.linearRampToValueAtTime(100, now + 0.25); 
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now); 
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.25);
}

// --- 4. CORE LOGIC ---
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10.0;
let timerInterval;
let isAnswered = false;
let lastSecond = 10; 

let streak = 0;
let maxStreak = 0;

// NEU: Globaler State für Prediction & Perks
let predictedScore = 0;
let perk5050Used = false;
let perkOvertimeUsed = false;

const startBtn = document.getElementById('start-btn');
const answersContainer = document.getElementById('answers-container');
const eventScreen = document.getElementById('event-screen');
const quizScreen = document.getElementById('quiz-screen'); 

function animateValue(obj, start, end, duration) {
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = progress * (2 - progress); 
        obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// --- INITIALIZE LIFELINE/PERK LISTENERS ---
const perk5050Btn = document.getElementById('perk-5050');
const perkOvertimeBtn = document.getElementById('perk-overtime');

if (perk5050Btn) {
    perk5050Btn.onclick = () => {
        if (perk5050Used || isAnswered || currentQuestionIndex >= quizData.length) return;
        perk5050Used = true;
        perk5050Btn.disabled = true;
        perk5050Btn.classList.add('used-perk');
        
        const correctIdx = quizData[currentQuestionIndex].c;
        const btns = answersContainer.querySelectorAll('.answer-btn');
        let hiddenCount = 0;
        
        for (let i = 0; i < btns.length; i++) {
            if (i !== correctIdx && hiddenCount < 2) {
                btns[i].style.visibility = 'hidden'; // Layout bleibt stabil
                hiddenCount++;
            }
        }
    };
}

if (perkOvertimeBtn) {
    perkOvertimeBtn.onclick = () => {
        if (perkOvertimeUsed || isAnswered || currentQuestionIndex >= quizData.length) return;
        perkOvertimeUsed = true;
        perkOvertimeBtn.disabled = true;
        perkOvertimeBtn.classList.add('used-perk');
        
        timeLeft += 5.0;
        updateClockUI();
    };
}

if (startBtn) {
    startBtn.onclick = () => {
        const nameValue = document.getElementById('player-name').value.trim();
        if(!nameValue) return alert("Please enter your name!");
        
        // NEU: Score Prediction auslesen
        const predictionInput = document.getElementById('score-prediction');
        predictedScore = parseInt(predictionInput ? predictionInput.value : 0) || 0;
        
        if (audioCtx.state === 'suspended') audioCtx.resume();

        document.getElementById('start-screen').classList.remove('active');
        
        const titleEl = document.getElementById('event-title');
        const descEl = document.getElementById('event-desc');
        titleEl.innerText = "GET READY";
        descEl.innerText = "Focus your mind.";
        
        eventScreen.style.display = 'flex';
        eventScreen.classList.add('fade-in-overlay');
        
        let countdownTime = 3;
        const countdownContainer = document.createElement('div');
        countdownContainer.id = "transition-countdown";
        countdownContainer.innerText = countdownTime;
        eventScreen.appendChild(countdownContainer);
        
        let countdownInterval = setInterval(() => {
            countdownTime--;
            if(countdownTime <= 0) {
                clearInterval(countdownInterval);
            } else {
                countdownContainer.innerText = countdownTime;
                playTickSound();
            }
        }, 1000);
        
        setTimeout(() => {
            eventScreen.classList.remove('fade-in-overlay');
            eventScreen.style.display = 'none';
            if(document.getElementById("transition-countdown")) {
                document.getElementById("transition-countdown").remove();
            }
            quizScreen.classList.add('active');
            loadQuestion();
        }, 3000);
    };
}

function loadQuestion() {
    isAnswered = false;
    timeLeft = 10.0;
    lastSecond = 10;
    const q = quizData[currentQuestionIndex];
    
    document.getElementById('topic-display').innerText = q.topic.toUpperCase();
    document.getElementById('question-counter').innerText = `QUESTION ${currentQuestionIndex + 1} / ${quizData.length}`;
    document.getElementById('question-text').innerText = q.q;
    
    updateStreakUI();
    
    answersContainer.innerHTML = "";
    q.a.forEach((alt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerText = alt.toUpperCase();
        btn.onclick = () => selectAnswer(i, btn);
        answersContainer.appendChild(btn);
    });
    
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft -= 0.05;
        
        let currentSecond = Math.ceil(timeLeft);
        if (currentSecond < lastSecond && currentSecond > 0 && !isAnswered) {
            playTickSound();
            lastSecond = currentSecond;
        }

        if(timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(timerInterval);
            selectAnswer(-1); 
        }
        updateClockUI();
    }, 50);
}

function updateClockUI() {
    document.getElementById('time-display').innerText = Math.max(0, Math.ceil(timeLeft));
    // Erlaubt flüssiges Zurückdrehen des Zeigers bei Overtime-Perk
    const rotation = (10 - timeLeft) * 36;
    const hand = document.getElementById('clock-hand');
    if(hand) hand.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
}

function updateStreakUI() {
    const streakBadgeEl = document.getElementById('streak-badge');
    const scoreContainer = document.getElementById('score-container');
    const timerRing = document.querySelector('.timer-ring');
    
    if (streakBadgeEl) {
        streakBadgeEl.classList.remove('active-streak', 'blue-streak');
        if (streak >= 5) {
            streakBadgeEl.classList.add('active-streak', 'blue-streak');
            streakBadgeEl.innerText = `🔥 STREAK: ${streak} 🔥`;
        } else if (streak >= 3) {
            streakBadgeEl.classList.add('active-streak');
            streakBadgeEl.innerText = `✨ STREAK: ${streak}`;
        } else {
            streakBadgeEl.innerText = "";
        }
    }

    if (scoreContainer && timerRing) {
        scoreContainer.classList.remove('flames-normal', 'flames-blue');
        timerRing.classList.remove('flames-normal', 'flames-blue');
        
        if (streak >= 5) {
            scoreContainer.classList.add('flames-blue');
            timerRing.classList.add('flames-blue'); 
        } else if (streak >= 3) {
            scoreContainer.classList.add('flames-normal');
            timerRing.classList.add('flames-normal');
        }
    }
}

function selectAnswer(idx, btn) {
    if(isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);
    
    const correctIdx = quizData[currentQuestionIndex].c;
    const btns = answersContainer.querySelectorAll('.answer-btn');
    let oldScore = score;

    if(idx === correctIdx) {
        if(btn) btn.classList.add('correct');
        playCorrectSound(); 
        
        streak++;
        if (streak > maxStreak) maxStreak = streak;
        
        let streakMultiplier = 1.0;
        if (streak >= 5) streakMultiplier = 1.5; 
        else if (streak >= 3) streakMultiplier = 1.2; 
        
        score += Math.round(timeLeft * 100 * streakMultiplier); 
        animateValue(document.getElementById('score-display'), oldScore, score, 800);
        
    } else {
        streak = 0;
        if(btn) btn.classList.add('wrong');
        playWrongSound(); 
        
        if (quizScreen) {
            quizScreen.classList.add('shake-active');
            setTimeout(() => { quizScreen.classList.remove('shake-active'); }, 500); 
        }
    }
    
    if(btns[correctIdx]) btns[correctIdx].classList.add('correct');
    updateStreakUI();

    setTimeout(() => {
        currentQuestionIndex++;
        
        if(currentQuestionIndex < quizData.length && currentQuestionIndex % 10 === 0) {
            showChapterTransition();
        } else if(currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showChapterTransition() {
    const nextTopic = quizData[currentQuestionIndex].topic;
    const titleEl = document.getElementById('event-title');
    const descEl = document.getElementById('event-desc');
    
    if(titleEl) titleEl.innerText = `SHIFT COMPLETED`;
    if(descEl) descEl.innerText = `NEXT PHASE: ${nextTopic.toUpperCase()}`;
    
    if(eventScreen) {
        eventScreen.style.display = 'flex';
        eventScreen.classList.add('fade-in-overlay');
    }
    
    let countdownTime = 3;
    const countdownContainer = document.createElement('div');
    countdownContainer.id = "transition-countdown";
    countdownContainer.innerText = countdownTime;
    if(eventScreen) eventScreen.appendChild(countdownContainer);
    
    let countdownInterval = setInterval(() => {
        countdownTime--;
        if(countdownTime <= 0) {
            clearInterval(countdownInterval);
        } else if (countdownContainer) {
            countdownContainer.innerText = countdownTime;
        }
    }, 800);
    
    setTimeout(() => {
        if(eventScreen) {
            eventScreen.classList.remove('fade-in-overlay');
            eventScreen.style.display = 'none';
            if(document.getElementById("transition-countdown")) {
                document.getElementById("transition-countdown").remove();
            }
        }
        loadQuestion();
    }, 2600); 
}

function showResults() {
    localStorage.setItem('quiz_v2', 'true');

    const finalName = document.getElementById('player-name').value;
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    
    document.getElementById('result-name').innerText = finalName.toUpperCase();

    // NEU: Logik für den Prediction-Multiplier & Score-Splitting
    const baseScore = score;
    const difference = Math.abs(baseScore - predictedScore);
    let multiplier = 1.0;

    if (difference === 0) {
        multiplier = 2.0; // Perfekter Tipp!
    } else if (difference <= 2000) {
        multiplier = 1.5; // Sehr nah dran (Toleranzfenster)
    } else if (difference <= 5000) {
        multiplier = 1.2; // Guter Riecher
    }

    const totalScore = Math.round(baseScore * multiplier);

    // UI Elemente befüllen
    const finalBaseScoreEl = document.getElementById('final-base-score');
    if (finalBaseScoreEl) finalBaseScoreEl.innerText = baseScore;

    const multiplierZone = document.getElementById('multiplier-zone');
    const appliedMultiplierEl = document.getElementById('applied-multiplier');
    
    if (multiplier > 1.0) {
        if (multiplierZone) {
            multiplierZone.classList.remove('class-hidden');
            multiplierZone.style.display = 'block';
        }
        if (appliedMultiplierEl) appliedMultiplierEl.innerText = `x${multiplier.toFixed(1)}`;
    } else {
        if (multiplierZone) multiplierZone.style.display = 'none';
    }

    // Animiert den finalen TOTAL SCORE statt der Base
    animateValue(document.getElementById('final-score'), 0, totalScore, 1500);

    const finalMaxStreakEl = document.getElementById('final-max-streak');
    if (finalMaxStreakEl) finalMaxStreakEl.innerText = maxStreak;

    // NEU: Performance Rank Berechnung (S, A, B, C, D) basierend auf Gesamtpunkten
    const rankEl = document.getElementById('performance-rank');
    let rank = "D";
    if (totalScore >= 60000) rank = "S";
    else if (totalScore >= 45000) rank = "A";
    else if (totalScore >= 30000) rank = "B";
    else if (totalScore >= 15000) rank = "C";
    
    if (rankEl) rankEl.innerText = rank;

    // DATA SYNC WITH GOOGLE SHEETS (Sendet den gewichteten totalScore)
    fetch(GOOGLE_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            Player: finalName, 
            Score: totalScore,
            Timestamp: new Date().toLocaleTimeString('de-DE') + ' Uhr'
        })
    })
    .then(() => {
        document.getElementById('mail-status').innerText = "Data safely stored in Google Sheets.";
    })
    .catch((err) => {
        console.error(err);
        document.getElementById('mail-status').innerText = "Sync error. Please screenshot your score!";
    });
}

```
