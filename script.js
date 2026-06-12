
// --- GOOGLE SHEETS INTERFACE URL ---
const GOOGLE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwVcLK_qD7fDpF1VyaeIeSCVcAjYE8FC9kRGB6lHww7iBlzlAch_p0AqSOQ0hyUdl5dCw/exec";

// --- 1. ACCESS CONTROL ---
window.onload = function() {
    if (localStorage.getItem('quiz23') === 'true') {
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
    // --- BLOCK 1: SPACE & ASTRONOMY ---
    { topic: "Space", q: "Which planet is the largest in our solar system?", a: ["Saturn", "Jupiter", "Uranus", "Neptune"], c: 1 },
    { topic: "Space", q: "Who was the first human to ever travel into space?", a: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"], c: 2 },
    { topic: "Space", q: "Which is the hottest planet in our solar system?", a: ["Mercury", "Mars", "Venus", "Jupiter"], c: 2 },
    { topic: "Space", q: "What is the name of the galaxy that contains Earth?", a: ["Andromeda", "Sombrero", "Triangulum", "Milky Way"], c: 3 },
    { topic: "Space", q: "As of recent discoveries, which planet has the most moons?", a: ["Jupiter", "Saturn", "Uranus", "Neptune"], c: 1 },
    { topic: "Space", q: "Which astronomer formulated the laws of planetary motion?", a: ["Galileo Galilei", "Isaac Newton", "Johannes Kepler", "Nicolaus Copernicus"], c: 2 },
    { topic: "Space", q: "What exactly is the 'Great Red Spot' on Jupiter?", a: ["A massive storm", "A giant volcano", "An ocean of lava", "A massive crater"], c: 0 },
    { topic: "Space", q: "Which Apollo mission was the first to successfully land humans on the Moon?", a: ["Apollo 8", "Apollo 11", "Apollo 13", "Apollo 17"], c: 1 },
    { topic: "Space", q: "What is the closest star to Earth?", a: ["The Sun", "Proxima Centauri", "Sirius", "Alpha Centauri A"], c: 0 },
    { topic: "Space", q: "Which planet is often referred to as the 'Red Planet' due to its iron oxide surface?", a: ["Venus", "Jupiter", "Saturn", "Mars"], c: 3 },

    // --- BLOCK 2: FOOD & CULINARY HISTORY ---
    { topic: "Food History", q: "Which European country is credited with inventing the modern pizza?", a: ["France", "Italy", "Greece", "Spain"], c: 1 },
    { topic: "Food History", q: "What is the primary ingredient used to make traditional guacamole?", a: ["Tomato", "Onion", "Avocado", "Lime"], c: 2 },
    { topic: "Food History", q: "Which spice is known as the most expensive in the world by weight?", a: ["Saffron", "Vanilla", "Cardamom", "Cinnamon"], c: 0 },
    { topic: "Food History", q: "What rice-based seafood dish is considered the national dish of Spain?", a: ["Tapas", "Paella", "Tortilla", "Gazpacho"], c: 1 },
    { topic: "Food History", q: "Despite their name, 'French fries' were actually invented in which country?", a: ["France", "USA", "Belgium", "Germany"], c: 2 },
    { topic: "Food History", q: "Botanically speaking, what type of food is a macadamia?", a: ["Fruit", "Nut", "Vegetable", "Legume"], c: 1 },
    { topic: "Food History", q: "Which country currently stands as the largest producer of coffee in the world?", a: ["Colombia", "Vietnam", "Ethiopia", "Brazil"], c: 3 },
    { topic: "Food History", q: "According to global retail data, what is the most frequently stolen food in the world?", a: ["Cheese", "Chocolate", "Meat", "Wine"], c: 0 },
    { topic: "Food History", q: "The popular hot sauce 'Sriracha' is named after a coastal city in which country?", a: ["Vietnam", "Japan", "Thailand", "China"], c: 2 },
    { topic: "Food History", q: "What plant is traditional tofu primarily made from?", a: ["Rice", "Soybeans", "Wheat", "Corn"], c: 1 },

    // --- BLOCK 3: TECHNOLOGY & INVENTIONS ---
    { topic: "Technology", q: "Who is widely considered the father of theoretical computer science and artificial intelligence?", a: ["Bill Gates", "Steve Jobs", "Alan Turing", "Charles Babbage"], c: 2 },
    { topic: "Technology", q: "In website URLs, what does 'HTTP' stand for?", a: ["HyperText Transfer Protocol", "High-Tech Transfer Program", "Hyper-Transfer Text Page", "Hyperlink Text Process"], c: 0 },
    { topic: "Technology", q: "Which company created the first commercially available handheld mobile phone in 1983?", a: ["Nokia", "Motorola", "Apple", "Samsung"], c: 1 },
    { topic: "Technology", q: "In what year did Tim Berners-Lee invent the World Wide Web?", a: ["1985", "1989", "1995", "1999"], c: 1 },
    { topic: "Technology", q: "Launched in 1957, what was the name of the first artificial Earth satellite?", a: ["Sputnik 1", "Apollo 1", "Voyager 1", "Explorer 1"], c: 0 },
    { topic: "Technology", q: "Who is credited with inventing the first practical telephone?", a: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"], c: 1 },
    { topic: "Technology", q: "What does the 'U' in the acronym USB stand for?", a: ["Unified", "Unique", "Universal", "Utility"], c: 2 },
    { topic: "Technology", q: "Which massive social media platform originally launched under the name 'Twttr'?", a: ["Facebook", "Twitter", "Instagram", "Snapchat"], c: 1 },
    { topic: "Technology", q: "What was the name of the first programmable, general-purpose electronic digital computer?", a: ["UNIVAC", "Colossus", "Mark I", "ENIAC"], c: 3 },
    { topic: "Technology", q: "Who co-founded Microsoft alongside Bill Gates?", a: ["Paul Allen", "Steve Wozniak", "Larry Page", "Elon Musk"], c: 0 },

    // --- BLOCK 4: MUSIC HISTORY & LEGENDS ---
    { topic: "Music Legends", q: "Which global superstar is universally referred to as the 'King of Pop'?", a: ["Elvis Presley", "Prince", "Michael Jackson", "Stevie Wonder"], c: 2 },
    { topic: "Music Legends", q: "Which British rock band released the legendary 1973 album 'The Dark Side of the Moon'?", a: ["The Beatles", "Pink Floyd", "Led Zeppelin", "The Rolling Stones"], c: 1 },
    { topic: "Music Legends", q: "How many strings does a standard acoustic violin have?", a: ["Four", "Five", "Six", "Eight"], c: 0 },
    { topic: "Music Legends", q: "Which composer famously wrote 'Symphony No. 9' while completely deaf?", a: ["Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach", "Frederic Chopin"], c: 1 },
    { topic: "Music Legends", q: "Which legendary guitarist played an iconic rendition of the US National Anthem at Woodstock?", a: ["Eric Clapton", "Jimmy Page", "Carlos Santana", "Jimi Hendrix"], c: 3 },
    { topic: "Music Legends", q: "According to Guinness World Records, what is the best-selling single of all time?", a: ["Bohemian Rhapsody", "Thriller", "White Christmas", "Shape of You"], c: 2 },
    { topic: "Music Legends", q: "Freddie Mercury was the legendary lead singer of which iconic rock band?", a: ["AC/DC", "Queen", "Aerosmith", "Guns N' Roses"], c: 1 },
    { topic: "Music Legends", q: "What genre of music originated in the African-American communities of New Orleans?", a: ["Jazz", "Blues", "Country", "Rock and Roll"], c: 0 },
    { topic: "Music Legends", q: "Which female artist is widely known as the 'Queen of Soul'?", a: ["Diana Ross", "Whitney Houston", "Aretha Franklin", "Tina Turner"], c: 2 },
    { topic: "Music Legends", q: "The legendary rock band 'The Beatles' originated from which English city?", a: ["London", "Liverpool", "Manchester", "Birmingham"], c: 1 },

    // --- BLOCK 5: MYTHOLOGY & FOLKLORE ---
    { topic: "Mythology", q: "In ancient Greek mythology, who is the King of the Gods?", a: ["Poseidon", "Hades", "Zeus", "Apollo"], c: 2 },
    { topic: "Mythology", q: "What is the name of King Arthur's legendary magical sword?", a: ["Joyeuse", "Excalibur", "Durandal", "Balisarda"], c: 1 },
    { topic: "Mythology", q: "In Norse mythology, what is the name of the thunder god Thor's hammer?", a: ["Mjölnir", "Gungnir", "Leviathan", "Aegis"], c: 0 },
    { topic: "Mythology", q: "Which mythical bird is famous for bursting into flames and being reborn from its own ashes?", a: ["Griffin", "Dragon", "Pegasus", "Phoenix"], c: 3 },
    { topic: "Mythology", q: "Who was the ancient Egyptian god of the afterlife, the underworld, and the dead?", a: ["Ra", "Osiris", "Anubis", "Horus"], c: 1 },
    { topic: "Mythology", q: "Which gorgon from Greek myth had snakes for hair and could turn onlookers to stone?", a: ["Chimera", "Hydra", "Medusa", "Sphinx"], c: 2 },
    { topic: "Mythology", q: "In Roman mythology, who is the god of war?", a: ["Mars", "Jupiter", "Neptune", "Vulcan"], c: 0 },
    { topic: "Mythology", q: "Which legendary cryptid is said to inhabit a famous loch in the Scottish Highlands?", a: ["Banshee", "Loch Ness Monster", "Kelpie", "Selkie"], c: 1 },
    { topic: "Mythology", q: "According to Plato, what highly advanced legendary island nation sank into the ocean?", a: ["Avalon", "El Dorado", "Atlantis", "Lemuria"], c: 2 },
    { topic: "Mythology", q: "In Japanese folklore, what are the supernatural spirits and entities known as 'Yokai'?", a: ["Monsters and spirits", "Samurai ancestors", "Holy dragons", "Temple priests"], c: 0 },

    // --- BLOCK 6: HUMAN ANATOMY & BIOLOGY ---
    { topic: "Anatomy", q: "What is the largest organ in the human body?", a: ["Liver", "Skin", "Lungs", "Heart"], c: 1 },
    { topic: "Anatomy", q: "How many bones are there in a standard adult human body?", a: ["186", "195", "206", "215"], c: 2 },
    { topic: "Anatomy", q: "Which part of the human brain is primarily responsible for balance and coordination?", a: ["Cerebellum", "Cerebrum", "Brainstem", "Hypothalamus"], c: 0 },
    { topic: "Anatomy", q: "What is the primary biological function of red blood cells?", a: ["Fighting infection", "Clotting blood", "Digesting food", "Carrying oxygen"], c: 3 },
    { topic: "Anatomy", q: "What is the rarest human blood type across the global population?", a: ["O Positive", "AB Negative", "A Negative", "B Positive"], c: 1 },
    { topic: "Anatomy", q: "Which major organ is responsible for pumping oxygenated blood throughout the body?", a: ["Heart", "Lungs", "Kidneys", "Brain"], c: 0 },
    { topic: "Anatomy", q: "What is the hardest naturally occurring substance in the human body?", a: ["Femur bone", "Skull", "Tooth enamel", "Kneecap"], c: 2 },
    { topic: "Anatomy", q: "Where are the smallest bones in the human body (the ossicles) located?", a: ["Fingers", "Ear", "Toes", "Nose"], c: 1 },
    { topic: "Anatomy", q: "What is the chemical acronym for the molecule that provides energy to cells?", a: ["DNA", "ATP", "RNA", "H2O"], c: 1 },
    { topic: "Anatomy", q: "Which human internal organ has the unique ability to regenerate itself from as little as 25% of its tissue?", a: ["Heart", "Brain", "Lungs", "Liver"], c: 3 }
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
    localStorage.setItem('quiz23', 'true');

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

```
