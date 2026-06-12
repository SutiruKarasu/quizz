// --- GOOGLE SHEETS INTERFACE URL ---
const GOOGLE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwVcLK_qD7fDpF1VyaeIeSCVcAjYE8FC9kRGB6lHww7iBlzlAch_p0AqSOQ0hyUdl5dCw/exec";

// --- 1. ACCESS CONTROL ---
window.onload = function() {
    if (localStorage.getItem('quiz_c') === 'true') {
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

// --- 2. THE 60-QUESTION DATABASE ---
const quizData = [
    // --- BLOCK 1: SPACE & COSMOS ---
    { topic: "Space", q: "Which planet is known as the 'Red Planet'?", a: ["Venus", "Mars", "Jupiter", "Saturn"], c: 1 },
    { topic: "Space", q: "What is the largest planet in our solar system?", a: ["Earth", "Saturn", "Jupiter", "Neptune"], c: 2 },
    { topic: "Space", q: "Which galaxy is home to the Earth?", a: ["Andromeda", "Milky Way", "Sombrero", "Triangulum"], c: 1 },
    { topic: "Space", q: "What is the closest star to Earth?", a: ["Proxima Centauri", "Sirius", "The Sun", "Betelgeuse"], c: 2 },
    { topic: "Space", q: "Which moon of Saturn is famous for having a thick atmosphere and liquid lakes?", a: ["Titan", "Enceladus", "Europa", "Io"], c: 0 },
    { topic: "Space", q: "What do we call a star that has collapsed under its own gravity?", a: ["Red Dwarf", "Black Hole", "White Dwarf", "Supernova"], c: 1 },
    { topic: "Space", q: "How many planets are currently recognized in our solar system?", a: ["7", "8", "9", "10"], c: 1 },
    { topic: "Space", q: "Which planet rotates on its side?", a: ["Uranus", "Neptune", "Mercury", "Mars"], c: 0 },
    { topic: "Space", q: "What is the name of the first human-made satellite to orbit Earth?", a: ["Apollo 11", "Sputnik 1", "Voyager", "Hubble"], c: 1 },
    { topic: "Space", q: "What is the study of the universe called?", a: ["Astrology", "Astronomy", "Geology", "Physics"], c: 1 },

    // --- BLOCK 2: WORLD HISTORY ---
    { topic: "History", q: "Who was the first Emperor of Rome?", a: ["Julius Caesar", "Augustus", "Nero", "Constantine"], c: 1 },
    { topic: "History", q: "In which year did the Titanic sink?", a: ["1910", "1912", "1914", "1918"], c: 1 },
    { topic: "History", q: "Which civilization built the pyramids of Giza?", a: ["Romans", "Greeks", "Egyptians", "Mayans"], c: 2 },
    { topic: "History", q: "Who painted the Mona Lisa?", a: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], c: 2 },
    { topic: "History", q: "Which war was fought between the North and South regions of the US?", a: ["WWII", "Civil War", "Revolutionary War", "Cold War"], c: 1 },
    { topic: "History", q: "Who discovered electricity?", a: ["Nikola Tesla", "Benjamin Franklin", "Thomas Edison", "Isaac Newton"], c: 1 },
    { topic: "History", q: "What was the name of the ship that brought the Pilgrims to America?", a: ["Santa Maria", "Mayflower", "Endeavour", "Beagle"], c: 1 },
    { topic: "History", q: "The Berlin Wall fell in which year?", a: ["1987", "1989", "1991", "1993"], c: 1 },
    { topic: "History", q: "Who was the longest-reigning British monarch?", a: ["Victoria", "Elizabeth I", "Elizabeth II", "George III"], c: 2 },
    { topic: "History", q: "Which empire was ruled by Genghis Khan?", a: ["Ottoman", "Mongol", "Persian", "Roman"], c: 1 },

    // --- BLOCK 3: TECH & INNOVATION ---
    { topic: "Tech", q: "What does 'CPU' stand for?", a: ["Central Process Unit", "Core Processing Unit", "Computer Personal Unit", "Central Processor Unit"], c: 0 },
    { topic: "Tech", q: "Which company created the iPhone?", a: ["Microsoft", "Google", "Apple", "Samsung"], c: 2 },
    { topic: "Tech", q: "What is the main language used for AI development today?", a: ["HTML", "Python", "CSS", "SQL"], c: 1 },
    { topic: "Tech", q: "Which of these is a web browser?", a: ["Linux", "Safari", "Windows", "Android"], c: 1 },
    { topic: "Tech", q: "What does 'HTTP' stand for?", a: ["HyperText Transfer Protocol", "High Tech Transfer Program", "Home Tool Transfer Page", "Hyperlink Transfer Protocol"], c: 0 },
    { topic: "Tech", q: "Who is the founder of Microsoft?", a: ["Steve Jobs", "Bill Gates", "Jeff Bezos", "Elon Musk"], c: 1 },
    { topic: "Tech", q: "What is the term for a malicious software program?", a: ["Hardware", "Malware", "Firmware", "Software"], c: 1 },
    { topic: "Tech", q: "Which device is used to connect multiple networks?", a: ["Router", "Monitor", "Keyboard", "Mouse"], c: 0 },
    { topic: "Tech", q: "What is the most popular video platform?", a: ["Vimeo", "YouTube", "Dailymotion", "Twitch"], c: 1 },
    { topic: "Tech", q: "What unit measures internet speed?", a: ["Mbps", "GB", "Hz", "Pixel"], c: 0 },

    // --- BLOCK 4: SCIENCE ---
    { topic: "Science", q: "What is the chemical symbol for water?", a: ["HO2", "H2O", "O2H", "WH2"], c: 1 },
    { topic: "Science", q: "Which gas do plants absorb from the atmosphere?", a: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], c: 2 },
    { topic: "Science", q: "What is the center of an atom called?", a: ["Electron", "Proton", "Nucleus", "Neutron"], c: 2 },
    { topic: "Science", q: "Which blood type is the universal donor?", a: ["A+", "O-", "B-", "AB+"], c: 1 },
    { topic: "Science", q: "How many bones are in the adult human body?", a: ["206", "208", "210", "204"], c: 0 },
    { topic: "Science", q: "Which planet is the hottest?", a: ["Mercury", "Venus", "Mars", "Jupiter"], c: 1 },
    { topic: "Science", q: "What is the hardest natural substance?", a: ["Gold", "Iron", "Diamond", "Quartz"], c: 2 },
    { topic: "Science", q: "What force keeps us on the ground?", a: ["Magnetism", "Friction", "Gravity", "Inertia"], c: 2 },
    { topic: "Science", q: "Which organ pumps blood?", a: ["Brain", "Lungs", "Heart", "Liver"], c: 2 },
    { topic: "Science", q: "What is the study of living things?", a: ["Biology", "Chemistry", "Physics", "Geology"], c: 0 },

    // --- BLOCK 5: SPORTS & GEOGRAPHY ---
    { topic: "General", q: "How many players are on a soccer team?", a: ["9", "10", "11", "12"], c: 2 },
    { topic: "General", q: "Which country is the largest by land area?", a: ["USA", "China", "Russia", "Canada"], c: 2 },
    { topic: "General", q: "Which city is known as the Big Apple?", a: ["Chicago", "New York", "Los Angeles", "Miami"], c: 1 },
    { topic: "General", q: "Which sport uses a shuttlecock?", a: ["Tennis", "Badminton", "Table Tennis", "Squash"], c: 1 },
    { topic: "General", q: "Which is the longest river in the world?", a: ["Amazon", "Nile", "Yangtze", "Mississippi"], c: 1 },
    { topic: "General", q: "How many rings are on the Olympic flag?", a: ["4", "5", "6", "7"], c: 1 },
    { topic: "General", q: "Which country is famous for Sushi?", a: ["China", "Thailand", "Japan", "Korea"], c: 2 },
    { topic: "General", q: "What is the capital of France?", a: ["Berlin", "Madrid", "Paris", "Rome"], c: 2 },
    { topic: "General", q: "Which mountain is the highest in the world?", a: ["K2", "Everest", "Kilimanjaro", "Denali"], c: 1 },
    { topic: "General", q: "In which sport do you score a 'Touchdown'?", a: ["Soccer", "Rugby", "American Football", "Basketball"], c: 2 },

    // --- BLOCK 6: POP CULTURE ---
    { topic: "Pop Culture", q: "Who is the 'King of Pop'?", a: ["Prince", "Michael Jackson", "Elvis Presley", "Freddie Mercury"], c: 1 },
    { topic: "Pop Culture", q: "Which band is from Liverpool?", a: ["The Rolling Stones", "The Who", "The Beatles", "Queen"], c: 2 },
    { topic: "Pop Culture", q: "Who is the main character in 'The Legend of Zelda'?", a: ["Zelda", "Ganon", "Link", "Mario"], c: 2 },
    { topic: "Pop Culture", q: "Which film features the line 'May the Force be with you'?", a: ["Star Trek", "Star Wars", "Avatar", "Dune"], c: 1 },
    { topic: "Pop Culture", q: "What is the name of the wizard school in Harry Potter?", a: ["Rivendell", "Hogwarts", "Narnia", "Middle Earth"], c: 1 },
    { topic: "Pop Culture", q: "Which character lives in a pineapple under the sea?", a: ["Patrick", "SpongeBob", "Squidward", "Mr. Krabs"], c: 1 },
    { topic: "Pop Culture", q: "Which superhero is known as the 'Dark Knight'?", a: ["Superman", "Iron Man", "Batman", "Spider-Man"], c: 2 },
    { topic: "Pop Culture", q: "Which streaming service has 'Stranger Things'?", a: ["Hulu", "Disney+", "Netflix", "Prime Video"], c: 2 },
    { topic: "Pop Culture", q: "Who wrote 'Romeo and Juliet'?", a: ["Dickens", "Shakespeare", "Hemingway", "Austen"], c: 1 },
    { topic: "Pop Culture", q: "What is the name of the superhero team led by Nick Fury?", a: ["Justice League", "Avengers", "X-Men", "Guardians"], c: 1 }
];


// --- 3. NATIVE AUDIO SYNTHESIS FOR SOUND EFFECTS ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Mechanisches Ticken
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

// Harmonisches Doppel-Signal bei Richtig
function playCorrectSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    
    // Erster Ton (helles C)
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

    // Zweiter Ton kurz danach (höheres E)
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

// Tieferer Brummton mit Abfall bei Falsch
function playWrongSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    osc.type = 'sawtooth'; 
    osc.frequency.setValueAtTime(160, now); 
    osc.frequency.linearRampToValueAtTime(100, now + 0.25); // Frequenz fällt ab
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now); // Nimmt die schrillen Höhen raus
    
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

const startBtn = document.getElementById('start-btn');
const answersContainer = document.getElementById('answers-container');
const eventScreen = document.getElementById('event-screen');
const quizScreen = document.getElementById('quiz-screen'); 

function animateValue(obj, start, end, duration) {
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

if (startBtn) {
    startBtn.onclick = () => {
        const nameValue = document.getElementById('player-name').value.trim();
        if(!nameValue) return alert("Please enter your name!");
        
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
    document.getElementById('time-display').innerText = Math.ceil(timeLeft);
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
        playCorrectSound(); // <-- SOUND BEI RICHTIG
        
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
        playWrongSound(); // <-- SOUND BEI FALSCH (ODER TIMEOUT)
        
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
    localStorage.setItem('quiz_c', 'true');

    const finalName = document.getElementById('player-name').value;
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    
    document.getElementById('result-name').innerText = finalName.toUpperCase();
    animateValue(document.getElementById('final-score'), 0, score, 1500);

    const finalMaxStreakEl = document.getElementById('final-max-streak');
    if (finalMaxStreakEl) finalMaxStreakEl.innerText = maxStreak;

    // DATA SYNC WITH GOOGLE SHEETS
    fetch(GOOGLE_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            Player: finalName, 
            Score: score,
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
