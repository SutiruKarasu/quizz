const FORMSPREE_URL = "https://formspree.io/f/xzdojayg";
let audioCtx, currentQuestionIndex = 0, score = 0, streak = 0, maxStreak = 0, timeLeft = 10, timerInterval, isAnswered = false, isDoublePointsPhase = false;
const quizData = [ /* HIER DEINE 60 FRAGEN EINTRAGEN */ ];

function playMechanicalTick() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode); gainNode.connect(audioCtx.destination);
    osc.type = 'triangle'; osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.start(); osc.stop(audioCtx.currentTime + 0.05);
}

document.getElementById('start-btn').onclick = () => {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    loadQuestion();
};

function loadQuestion() {
    isAnswered = false; timeLeft = 10;
    isDoublePointsPhase = (currentQuestionIndex >= 40 && currentQuestionIndex < 50);
    if(isDoublePointsPhase) {
        document.body.classList.add('red-alert-mode');
        document.getElementById('phase-badge').classList.add('active');
        document.getElementById('phase-badge').innerText = "2X POINTS";
    } else {
        document.body.classList.remove('red-alert-mode');
        document.getElementById('phase-badge').classList.remove('active');
    }
    
    const q = quizData[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.q;
    // ... Buttons rendern wie zuvor ...
    startTimer();
}

function startTimer() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft -= 0.05;
        if(timeLeft <= 0) { clearInterval(timerInterval); selectAnswer(-1); }
        let currentSecond = Math.ceil(timeLeft);
        if (currentSecond < Math.ceil(timeLeft + 0.05) && !isAnswered) playMechanicalTick();
        document.getElementById('time-display').innerText = currentSecond;
    }, 50);
}

// ... Rest der Logik (selectAnswer, showChapterTransition, showResults) beibehalten
