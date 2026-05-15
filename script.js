const FORMSPREE_URL = "https://formspree.io/f/xzdojayg";

// --- 1. TEILNAHME-SPERRE (One-time per device) ---
window.onload = function() {
    if (localStorage.getItem('quiz_completed') === 'true') {
        // Ersetzt den Start-Inhalt, falls schon gespielt wurde
        document.getElementById('start-screen').innerHTML = `
            <div class="clock-icon">🚫</div>
            <h1>Access Denied</h1>
            <p>You have already clocked in for this quiz. Only one attempt per device is allowed.</p>
        `;
    }
};

// --- 2. FRAGEN-DATENBANK ---
const quizData = [
    // Geography
    { topic: "Geography", q: "What is the capital of France?", a: ["Paris", "London", "Berlin", "Madrid"], c: 0 },
    { topic: "Geography", q: "Which is the longest river in the world?", a: ["Amazon", "Nile", "Rhine", "Mississippi"], c: 1 },
    { topic: "Geography", q: "Which ocean is the largest?", a: ["Atlantic", "Indian", "Pacific", "Arctic"], c: 2 },
    { topic: "Geography", q: "How many continents are there?", a: ["5", "6", "7", "8"], c: 2 },
    { topic: "Geography", q: "Which country is known as the Land of the Rising Sun?", a: ["China", "Japan", "Thailand", "South Korea"], c: 1 },
    { topic: "Geography", q: "What is the capital of Australia?", a: ["Sydney", "Melbourne", "Canberra", "Perth"], c: 2 },
    { topic: "Geography", q: "Which mountain range separates Europe and Asia?", a: ["Alps", "Himalayas", "Urals", "Andes"], c: 2 },
    { topic: "Geography", q: "What is the tallest mountain in the world?", a: ["K2", "Mount Everest", "Kilimanjaro", "Mont Blanc"], c: 1 },
    { topic: "Geography", q: "Which is the largest hot desert in the world?", a: ["Gobi", "Atacama", "Sahara", "Kalahari"], c: 2 },
    { topic: "Geography", q: "What is the smallest country in the world?", a: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], c: 1 },

    // History
    { topic: "History", q: "In which year did Columbus reach America?", a: ["1492", "1512", "1488", "1501"], c: 0 },
    { topic: "History", q: "When did World War II end?", a: ["1942", "1945", "1948", "1950"], c: 1 },
    { topic: "History", q: "In which year did the Berlin Wall fall?", a: ["1987", "1988", "1989", "1990"], c: 2 },
    { topic: "History", q: "When did the French Revolution begin?", a: ["1776", "1789", "1799", "1804"], c: 1 },
    { topic: "History", q: "Who was the first human on the moon?", a: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Michael Collins"], c: 1 },
    { topic: "History", q: "In which country are the Pyramids of Giza located?", a: ["Mexico", "Peru", "Egypt", "Iraq"], c: 2 },
    { topic: "History", q: "When did the Western Roman Empire fall?", a: ["476 AD", "395 AD", "800 AD", "1453 AD"], c: 0 },
    { topic: "History", q: "Who was known as the 'Iron Chancellor'?", a: ["Willy Brandt", "Otto von Bismarck", "Konrad Adenauer", "Helmut Kohl"], c: 1 },
    { topic: "History", q: "When was the US Declaration of Independence signed?", a: ["1770", "1776", "1783", "1789"], c: 1 },
    { topic: "History", q: "Which historical figure is known as the 'Maid of Orleans'?", a: ["Mary Stuart", "Joan of Arc", "Catherine the Great", "Elizabeth I"], c: 1 },

    // Science
    { topic: "Science", q: "What does the chemical formula H2O stand for?", a: ["Oxygen", "Hydrogen", "Water", "Carbon Dioxide"], c: 2 },
    { topic: "Science", q: "Which planet is closest to the Sun?", a: ["Venus", "Mars", "Earth", "Mercury"], c: 3 },
    { topic: "Science", q: "Who formulated the theory of relativity?", a: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], c: 1 },
    { topic: "Science", q: "What is the force that keeps us on the ground?", a: ["Centrifugal", "Magnetism", "Gravity", "Friction"], c: 2 },
    { topic: "Science", q: "Which planet is known as the 'Red Planet'?", a: ["Jupiter", "Venus", "Mars", "Saturn"], c: 2 },
    { topic: "Science", q: "What is the unit of electrical current?", a: ["Volt", "Watt", "Ohm", "Ampere"], c: 3 },
    { topic: "Science", q: "What shape is human DNA?", a: ["Single helix", "Double helix", "Triple helix", "Circle"], c: 1 },
    { topic: "Science", q: "What is the hardest natural material?", a: ["Gold", "Iron", "Diamond", "Platinum"], c: 2 },
    { topic: "Science", q: "What is the solid state of water?", a: ["Steam", "Ice", "Mist", "Plasma"], c: 1 },
    { topic: "Science", q: "What pigment makes leaves green?", a: ["Melanin", "Carotene", "Chlorophyll", "Hemoglobin"], c: 2 },

    // Pop Culture
    { topic: "Pop Culture", q: "Who is the famous boy wizard created by J.K. Rowling?", a: ["Percy Jackson", "Harry Potter", "Frodo Baggins", "Luke Skywalker"], c: 1 },
    { topic: "Pop Culture", q: "Who created Mickey Mouse?", a: ["Stan Lee", "Walt Disney", "Hanna Barbera", "Charles Schulz"], c: 1 },
    { topic: "Pop Culture", q: "Which movie features the line: 'I'll be back'?", a: ["Die Hard", "Rocky", "The Terminator", "Rambo"], c: 2 },
    { topic: "Pop Culture", q: "Who was known as the 'King of Pop'?", a: ["Elvis Presley", "Prince", "Freddie Mercury", "Michael Jackson"], c: 3 },
    { topic: "Pop Culture", q: "What weapon do Jedi use in Star Wars?", a: ["Blasters", "Lightsabers", "Phasers", "Bows"], c: 1 },
    { topic: "Pop Culture", q: "Which city did The Beatles come from?", a: ["London", "Manchester", "Liverpool", "Birmingham"], c: 2 },
    { topic: "Pop Culture", q: "What is the name of the main character in 'The Matrix'?", a: ["Morpheus", "Trinity", "Agent Smith", "Neo"], c: 3 },
    { topic: "Pop Culture", q: "Who wrote 'The Lord of the Rings'?", a: ["George R.R. Martin", "C.S. Lewis", "J.R.R. Tolkien", "Stephen King"], c: 2 },
    { topic: "Pop Culture", q: "What is the father's name in 'The Simpsons'?", a: ["Bart", "Homer", "Ned", "Moe"], c: 1 },
    { topic: "Pop Culture", q: "Which movie won 11 Oscars in 1998?", a: ["Forrest Gump", "Titanic", "Gladiator", "Braveheart"], c: 1 }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10.0;
let timerInterval;
let isAnswered = false;

const startBtn = document.getElementById('start-btn');
const answersContainer = document.getElementById('answers-container');

startBtn.onclick = () => {
    const nameValue = document.getElementById('player-name').value.trim();
    if(!nameValue) return alert("Please enter your name!");
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    loadQuestion();
};

function loadQuestion() {
    isAnswered = false;
    timeLeft = 10.0;
    const q = quizData[currentQuestionIndex];
    document.getElementById('topic-display').innerText = q.topic;
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1} / 40`;
    document.getElementById('question-text').innerText = q.q;
    
    answersContainer.innerHTML = "";
    q.a.forEach((alt, i) => {
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
            selectAnswer(-1); 
        }
        updateUI();
    }, 50);
}

function updateUI() {
    document.getElementById('time-display').innerText = Math.ceil(timeLeft);
    const perc = (timeLeft / 10) * 100;
    document.getElementById('clock-timer').style.setProperty('--progress', `${perc}%`);
}

function selectAnswer(idx, btn) {
    if(isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);
    
    const correctIdx = quizData[currentQuestionIndex].c;
    const btns = answersContainer.querySelectorAll('.answer-btn');

    if(idx === correctIdx) {
        btn.classList.add('correct');
        score += Math.round(timeLeft * 10);
        document.getElementById('score-display').innerText = score;
    } else if(idx !== -1) {
        btn.classList.add('wrong');
    }
    
    btns[correctIdx].classList.add('correct');

    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizData.length) loadQuestion();
        else showResults();
    }, 1500);
}

function showResults() {
    // 1. Sperre setzen
    localStorage.setItem('quiz_completed', 'true');

    const finalName = document.getElementById('player-name').value;
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('result-name').innerText = finalName;
    document.getElementById('final-score').innerText = score;

    // 2. Daten an Formspree senden
    fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
            PlayerName: finalName, 
            FinalScore: score,
            Message: "Clock-In Quiz completed" 
        })
    })
    .then(res => console.log("Success: Results mailed to host."))
    .catch(err => console.error("Error: Could not send results."));
}

// Restart button (nur sichtbar falls nicht blockiert)
document.getElementById('restart-btn').onclick = () => location.reload();
