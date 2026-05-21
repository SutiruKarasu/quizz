const FORMSPREE_URL = "https://formspree.io/f/xzdojayg";

// --- 1. SEED-BASED PSEUDO-RANDOM GENERATOR ---
// Sorgt dafür, dass der Zufall jeden Tag anders, aber für den aktuellen Tag fix ist.
function getDailyRandom(seedString) {
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    return function() {
        const x = Math.sin(hash++) * 10000;
        return x - Math.floor(x);
    };
}

// Generiert den heutigen Datums-String (Format: YYYY-MM-DD)
const todayStr = new Date().toISOString().split('T')[0];
const dailyRandom = getDailyRandom(todayStr);

// Hilfsfunktion zum Mischen eines Arrays basierend auf dem Tages-Zufall
function shuffleArrayDaily(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(dailyRandom() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// --- 2. DYNAMIC ACCESS CONTROL (DAILY REFRESH) ---
window.onload = function() {
    // Die Sperre zieht sich das aktuelle Datum – somit schaltet sie sich jeden Tag automatisch frei
    if (localStorage.getItem(`quiz_completed_${todayStr}`) === 'true') {
        document.getElementById('start-screen').innerHTML = `
            <div class="clock-icon">🚫</div>
            <h1 style="color: #ff4757;">Shift Denied</h1>
            <p>You have already clocked in for today's shift.<br>Return tomorrow for the next deployment.</p>
        `;
    }
};

// --- 3. DYNAMIC DATA SELECTION & ANSWER SHUFFLING ---
let quizData = [];

function buildDailyQuiz() {
    if (typeof rawQuizData === 'undefined' || rawQuizData.length === 0) {
        console.error("Questions database (rawQuizData) not found or empty!");
        return;
    }

    // 1. Gruppiere die flache Liste aus questions.js dynamisch nach Themen
    const groupedByTopic = {};
    rawQuizData.forEach(item => {
        if (!groupedByTopic[item.topic]) {
            groupedByTopic[item.topic] = [];
        }
        groupedByTopic[item.topic].push(item);
    });

    // 2. Alle verfügbaren Themen-Kategorien extrahieren
    const allTopics = Object.keys(groupedByTopic);
    
    // 3. Die Kategorien für den heutigen Tag mischen
    const shuffledTopics = shuffleArrayDaily(allTopics);
    
    // 4. Die ersten 5 Kategorien für heute auswählen
    const selectedTopics = shuffledTopics.slice(0, 5);
    
    let compiledQuestions = [];

    // 5. Aus jeder der 5 ausgewählten Kategorien genau 10 Fragen ziehen
    selectedTopics.forEach(topic => {
        let categoryQuestions = [...groupedByTopic[topic]];
        
        // Die Fragen innerhalb dieser Kategorie für den Tag mischen
        categoryQuestions = shuffleArrayDaily(categoryQuestions);
        
        // Die ersten 10 Fragen nehmen
        const dailyTen = categoryQuestions.slice(0, 10);
        
        // --- ANTWORTEN SHUFFELN & CORRECT-INDEX ANPASSEN ---
        dailyTen.forEach(q => {
            // Wir mischen eine Kopie der Antworten, um die Quelldaten nicht permanent zu verändern
            const shuffledAnswers = shuffleArrayDaily([...q.answers]);
            // Findet heraus, wo die korrekte Antwort (ursprünglich bei q.correct) im neuen Array liegt
            const newCorrectIndex = shuffledAnswers.indexOf(q.answers[q.correct]);

            // Erstellt ein neues, sicheres Fragen-Objekt für das heutige Quiz
            compiledQuestions.push({
                topic: q.topic,
                question: q.question,
                answers: shuffledAnswers,
                correct: newCorrectIndex
            });
        });
    });

    // 6. Das finale Set aus 50 Fragen zuweisen
    quizData = compiledQuestions;
}

// --- 4. CORE GAME LOGIC ---
let currentQuestionIndex = 0;
let score = 0;
let displayedScore = 0;
let timeLeft = 10.0;
let timerInterval;
let isAnswered = false;
let streak = 0;

const mainContainer = document.getElementById('main-container');
const startBtn = document.getElementById('start-btn');
const answersContainer = document.getElementById('answers-container');
const eventScreen = document.getElementById('event-screen');
const progressBar = document.getElementById('progress-bar');
const streakBadge = document.getElementById('streak-badge');

startBtn.onclick = () => {
    const nameValue = document.getElementById('player-name').value.trim();
    if(!nameValue) return alert("Please enter your name!");
    
    // Generiere das Quiz exakt beim Klick auf den Start-Button
    buildDailyQuiz();
    
    if (quizData.length === 0) return alert("Error loading quiz data!");

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    loadQuestion();
};

function loadQuestion() {
    isAnswered = false;
    timeLeft = 10.0;
    const q = quizData[currentQuestionIndex];
    
    // Update Progress Bar (basiert dynamisch auf den 50 Fragen)
    const progress = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Update UI Labels
    document.getElementById('topic-display').innerText = q.topic;
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
    document.getElementById('question-text').innerText = q.question; 
    
    answersContainer.innerHTML = "";
    
    // Erstellt die Antwort-Buttons dynamisch aus dem geshuffelten Array
    q.answers.forEach((alt, i) => { 
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerText = alt;
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
            selectAnswer(-1); // Timeout auslösen
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

function selectAnswer(idx, btn) {
    if(isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);
    
    const correctIdx = quizData[currentQuestionIndex].correct; 
    const btns = answersContainer.querySelectorAll('.answer-btn');

    if(idx === correctIdx) {
        // --- STREAK & POINTS ---
        streak++;
        btn.classList.add('correct');
        
        // Multiplier Logic
        let multiplier = 1;
        if(streak >= 10) multiplier = 2.0;
        else if(streak >= 5) multiplier = 1.5;
        else if(streak
