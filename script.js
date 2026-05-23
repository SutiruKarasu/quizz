const FORMSPREE_URL = "https://formspree.io/f/xzdojayg";

// --- 1. ACCESS CONTROL ---
window.onload = function() {
    if (localStorage.getItem('quiz_completedzf') === 'true') {
        document.getElementById('start-screen').innerHTML = `
            <div class="login-card" style="text-align: center;">
                <h1 style="color: #ff4757; margin-bottom: 15px;">Shift Denied</h1>
                <p style="margin-bottom: 30px;">You have already clocked in for this event.<br>Only one attempt per session is authorized.</p>
                <button id="restart-btn" class="primary-btn" style="background: #333; color: #fff;">Debug: Reset (Host Only)</button>
            </div>
        `;
        const restartBtn = document.getElementById('restart-btn');
        if(restartBtn) restartBtn.onclick = () => { localStorage.clear(); location.reload(); };
    }
};

// --- DIE DATENBANK (ACHTUNG: FÜGE HIER DEINE 60 FRAGEN EIN!) ---
// Ich lasse das Array hier leer, damit der Codeblock nicht ewig lang wird. 
// Nutze exakt das gleiche quizData-Array aus der vorherigen Antwort!
const quizData = [ /* ... Deine 60 Fragen ... */ ];

// --- 3. CORE LOGIC ---
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10.0;
let timerInterval;
let isAnswered = false;

let streak = 0;
let maxStreak = 0;
let isDoublePointsPhase = false; // Neuer Switch für den Boss-Mode

const startBtn = document.getElementById('start-btn');
const answersContainer = document.getElementById('answers-container');
const eventScreen = document.getElementById('event-screen');
const quizScreen = document.getElementById('quiz-screen'); 

// --- ANIMATE SCORE ---
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

// --- START BUTTON ---
if (startBtn) {
    startBtn.onclick = () => {
        const nameValue = document.getElementById('player-name').value.trim();
        if(!nameValue) return alert("Please enter your name!");
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
            }
        }, 1000);
        
        setTimeout(() => {
            eventScreen.classList.remove('fade-in-overlay');
            eventScreen.style.display = 'none';
            if(document.getElementById("transition-countdown")) document.getElementById("transition-countdown").remove();
            quizScreen.classList.add('active');
            loadQuestion();
        }, 3000);
    };
}

function loadQuestion() {
    isAnswered = false;
    timeLeft = 10.0;
    
    // Check, ob wir in der Critical Phase sind (Fragen 40 bis 49 = Block 5)
    isDoublePointsPhase = (currentQuestionIndex >= 40 && currentQuestionIndex < 50);
    
    // UI Anpassungen für Hard Mode
    if(isDoublePointsPhase) {
        document.body.classList.add('red-alert-mode');
        document.getElementById('phase-badge').classList.add('active');
        document.getElementById('phase-badge').innerText = "2X POINTS";
    } else {
        document.body.classList.remove('red-alert-mode');
        document.getElementById('phase-badge').classList.remove('active');
    }

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

    if (scoreContainer) {
        scoreContainer.classList.remove('flames-normal', 'flames-blue');
        if (streak >= 5) {
            scoreContainer.classList.add('flames-blue');
        } else if (streak >= 3) {
            scoreContainer.classList.add('flames-normal');
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
        streak++;
        if (streak > maxStreak) maxStreak = streak;
        
        let streakMultiplier = 1.0;
        if (streak >= 5) streakMultiplier = 1.5; 
        else if (streak >= 3) streakMultiplier = 1.2; 
        
        let phaseMultiplier = isDoublePointsPhase ? 2.0 : 1.0;
        
        // BERECHNUNG MIT HARD-MODE MULTIPLIKATOR
        score += Math.round(timeLeft * 100 * streakMultiplier * phaseMultiplier); 
        animateValue(document.getElementById('score-display'), oldScore, score, 800);
        
    } else {
        streak = 0;
        if(btn) btn.classList.add('wrong');
        
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
    
    // Boss-Mode Check für Block 5
    if(currentQuestionIndex === 40) {
        titleEl.innerHTML = `<span class="glitch-text" data-text="⚠️ CRITICAL PHASE ⚠️">⚠️ CRITICAL PHASE ⚠️</span>`;
        descEl.innerHTML = `<strong>ALL OR NOTHING.</strong><br>The next 10 questions grant <span style="color:#ff4757; font-weight:bold;">DOUBLE</span> points.<br>Precision is mandatory.`;
    } else {
        titleEl.innerHTML = `SHIFT COMPLETED`;
        descEl.innerHTML = `NEXT PHASE: ${nextTopic.toUpperCase()}`;
    }
    
    if(eventScreen) {
        eventScreen.style.display = 'flex';
        eventScreen.classList.add('fade-in-overlay');
    }
    
    let countdownTime = currentQuestionIndex === 40 ? 4 : 3; // 1 Sekunde länger Zeit zum Lesen bei der Warnung
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
            if(document.getElementById("transition-countdown")) document.getElementById("transition-countdown").remove();
        }
        loadQuestion();
    }, (currentQuestionIndex === 40 ? 3400 : 2600)); 
}

function showResults() {
    localStorage.setItem('quiz_completedzf', 'true');
    const finalName = document.getElementById('player-name').value;
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    
    document.getElementById('result-name').innerText = finalName.toUpperCase();
    animateValue(document.getElementById('final-score'), 0, score, 1500);

    const finalMaxStreakEl = document.getElementById('final-max-streak');
    if (finalMaxStreakEl) finalMaxStreakEl.innerText = maxStreak;

    fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
            Player: finalName, 
            Score: score,
            MaxStreak: maxStreak, 
            Timestamp: new Date().toLocaleString()
        })
    })
    .then(() => { document.getElementById('mail-status').innerText = "Report transmitted to host successfully."; })
    .catch(() => { document.getElementById('mail-status').innerText = "Sync error. Please screenshot your score!"; });
}
