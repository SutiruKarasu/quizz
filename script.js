const FORMSPREE_URL = "https://formspree.io/f/xzdojayg";

// --- 1. ACCESS CONTROL (One-time per device) ---
window.onload = function() {
    if (localStorage.getItem('quiz_completed') === 'true') {
        document.getElementById('start-screen').innerHTML = `
            <div class="clock-icon">🚫</div>
            <h1 style="color: #ff4757;">Shift Denied</h1>
            <p>You have already clocked in for this event.<br>Only one attempt per session is authorized.</p>
            <button onclick="localStorage.clear(); location.reload();" style="width: auto; font-size: 14px; background: #333; color: #fff;">Debug: Reset (Host Only)</button>
        `;
    }
};

// --- 2. THE 60-QUESTION DATABASE ---
const quizData = [
    // --- BLOCK 1: MOVIES & SERIES ---
    { topic: "Cinema", q: "Which film won the Oscar for Best Picture in 2024?", a: ["Barbie", "Oppenheimer", "Poor Things", "Killers of the Flower Moon"], c: 1 },
    { topic: "Series", q: "In which city is 'Money Heist' (La Casa de Papel) primarily set?", a: ["Barcelona", "Madrid", "Seville", "Valencia"], c: 1 },
    { topic: "Movies", q: "What is the name of the fictional planet in 'Avatar'?", a: ["Tatooine", "Pandora", "Arrakis", "Krypton"], c: 1 },
    { topic: "Series", q: "Which show follows a chemistry teacher who starts cooking Crystal Meth?", a: ["Narcos", "Ozark", "Breaking Bad", "Better Call Saul"], c: 2 },
    { topic: "Movies", q: "Who plays the lead role in the 'John Wick' franchise?", a: ["Keanu Reeves", "Tom Cruise", "Brad Pitt", "Jason Statham"], c: 0 },
    { topic: "Series", q: "What is the name of the small creature called 'Baby Yoda'?", a: ["Grogu", "Jar Jar", "Ewok", "Porg"], c: 0 },
    { topic: "Movies", q: "Which movie holds the record for the highest global box office gross?", a: ["Titanic", "Avengers: Endgame", "Avatar", "Star Wars 7"], c: 2 },
    { topic: "Series", q: "How many seasons does the original 'Game of Thrones' series have?", a: ["6", "7", "8", "9"], c: 2 },
    { topic: "Movies", q: "What car is used as the time machine in 'Back to the Future'?", a: ["Mustang", "DeLorean", "Ferrari", "Porsche"], c: 1 },
    { topic: "Series", q: "Who is the main protagonist in 'The Witcher' series?", a: ["Geralt of Rivia", "Jaskier", "Vesemir", "Ciri"], c: 0 },

    // --- BLOCK 2: FOOD & DRINKS ---
    { topic: "Food", q: "From which country does Halloumi cheese originate?", a: ["Greece", "Turkey", "Cyprus", "Italy"], c: 2 },
    { topic: "Drinks", q: "Which botanical gives Gin its primary flavor?", a: ["Juniper", "Ginger", "Coriander", "Cinnamon"], c: 0 },
    { topic: "Food", q: "What is the main ingredient of Hummus?", a: ["Lentils", "Chickpeas", "Beans", "Peas"], c: 1 },
    { topic: "Drinks", q: "Which country has the highest coffee consumption per capita?", a: ["Italy", "Brazil", "Finland", "USA"], c: 2 },
    { topic: "Food", q: "What does 'Al Dente' mean when referring to pasta?", a: ["Soft", "Firm to the bite", "Well seasoned", "In sauce"], c: 1 },
    { topic: "Drinks", q: "From which plant is Tequila distilled?", a: ["Sugar cane", "Cactus", "Agave", "Corn"], c: 2 },
    { topic: "Food", q: "How many calories are approximately in one gram of Fat?", a: ["4", "7", "9", "12"], c: 2 },
    { topic: "Drinks", q: "Which beverage is sometimes called 'Liquid Bread'?", a: ["Wine", "Beer", "Milk", "Wodka"], c: 1 },
    { topic: "Food", q: "What is 'Scoville' a measurement for?", a: ["Cheese fat", "Chili heat", "Knife sharpness", "Sugar"], c: 1 },
    { topic: "Food", q: "Which of these fruits is botanically a berry?", a: ["Strawberry", "Raspberry", "Banana", "Cherry"], c: 2 },

    // --- BLOCK 3: TECHNOLOGY ---
    { topic: "Tech", q: "What was the most downloaded app globally in 2025?", a: ["Instagram", "TikTok", "ChatGPT", "WhatsApp"], c: 2 },
    { topic: "Tech", q: "Who is the primary founder of Microsoft?", a: ["Steve Jobs", "Elon Musk", "Bill Gates", "Mark Zuckerberg"], c: 2 },
    { topic: "Tech", q: "In which year was the first iPhone released?", a: ["2005", "2007", "2008", "2010"], c: 1 },
    { topic: "Tech", q: "Which mobile OS is based on the Linux kernel?", a: ["Windows", "iOS", "Android", "Blackberry"], c: 2 },
    { topic: "Tech", q: "What does 'CPU' stand for?", a: ["Central Process Unit", "Core Program", "Central Processing Unit", "Power Unit"], c: 2 },
    { topic: "Tech", q: "Which company developed the AI model 'ChatGPT'?", a: ["Google", "Microsoft", "OpenAI", "Meta"], c: 2 },
    { topic: "Tech", q: "How many bits are in a single Byte?", a: ["4", "8", "16", "32"], c: 1 },
    { topic: "Tech", q: "Standard programming language for web interactivity?", a: ["Swift", "JavaScript", "C++", "Java"], c: 1 },
    { topic: "Tech", q: "Which company acquired WhatsApp in 2014?", a: ["Google", "Apple", "Facebook (Meta)", "Microsoft"], c: 2 },
    { topic: "Tech", q: "What does 'SSD' stand for in computer storage?", a: ["Speed Drive", "Solid State Drive", "System Disk", "Secure Device"], c: 1 },

    // --- BLOCK 4: RANDOM FACTS ---
    { topic: "Random", q: "How many hearts does an Octopus have?", a: ["1", "2", "3", "4"], c: 2 },
    { topic: "Random", q: "Which large land animal is unable to jump?", a: ["Rhino", "Elephant", "Hippo", "Sloth"], c: 1 },
    { topic: "Random", q: "Which country has the most islands in the world?", a: ["Philippines", "Indonesia", "Sweden", "Canada"], c: 2 },
    { topic: "Random", q: "How long is a day on Venus (compared to its year)?", a: ["24h", "116 days", "243 days", "400 days"], c: 2 },
    { topic: "Random", q: "Which fruit carries its seeds on the outside?", a: ["Strawberry", "Banana", "Kiwi", "Apple"], c: 0 },
    { topic: "Random", q: "What color is a Giraffe's tongue?", a: ["Pink", "Blue/Black", "Red", "White"], c: 1 },
    { topic: "Random", q: "How many federal states (Bundesländer) does Germany have?", a: ["12", "14", "16", "18"], c: 2 },
    { topic: "Random", q: "Which letter does not appear in any of the 50 US State names?", a: ["X", "Z", "Q", "J"], c: 2 },
    { topic: "Random", q: "In which country are there more sheep than people?", a: ["Ireland", "New Zealand", "Scotland", "Australia"], c: 1 },
    { topic: "Random", q: "How many teeth does a normal adult human have?", a: ["28", "30", "32", "34"], c: 2 },

    // --- BLOCK 5: MUSIC ---
    { topic: "Music", q: "Who won the 2026 Grammy for Album of the Year?", a: ["Bad Bunny", "Rosalía", "Rauw Alejandro", "Peso Pluma"], c: 0 },
    { topic: "Music", q: "Which band performed the hit 'Bohemian Rhapsody'?", a: ["The Beatles", "Led Zeppelin", "Queen", "ABBA"], c: 2 },
    { topic: "Music", q: "How many strings does a standard classical guitar have?", a: ["4", "5", "6", "7"], c: 2 },
    { topic: "Music", q: "Which country won Eurovision 2024 (Nemo)?", a: ["Switzerland", "Croatia", "Ukraine", "France"], c: 0 },
    { topic: "Music", q: "From which UK city did The Beatles originate?", a: ["London", "Manchester", "Liverpool", "Birmingham"], c: 2 },
    { topic: "Music", q: "Which female artist released the 'Eras Tour'?", a: ["Adele", "Billie Eilish", "Taylor Swift", "Beyoncé"], c: 2 },
    { topic: "Music", q: "Which musical instrument is Lang Lang famous for?", a: ["Violin", "Piano", "Cello", "Flute"], c: 1 },
    { topic: "Music", q: "In which decade did MTV first launch?", a: ["1970s", "1980s", "1990s", "2000s"], c: 1 },
    { topic: "Music", q: "Which genre is most associated with Bob Marley?", a: ["Jazz", "Reggae", "Blues", "Ska"], c: 1 },
    { topic: "Music", q: "Who composed the 9th Symphony (Ode to Joy)?", a: ["Mozart", "Bach", "Beethoven", "Wagner"], c: 2 },

    // --- BLOCK 6: SPORTS ---
    { topic: "Sports", q: "How many players per team in a standard Soccer match?", a: ["10", "11", "12", "13"], c: 1 },
    { topic: "Sports", q: "In which sport can you score a 'Hole-in-one'?", a: ["Tennis", "Golf", "Darts", "Bowling"], c: 1 },
    { topic: "Sports", q: "Who holds the world record for the 100m sprint?", a: ["Tyson Gay", "Yohan Blake", "Usain Bolt", "Carl Lewis"], c: 2 },
    { topic: "Sports", q: "How many rings are on the Olympic flag?", a: ["4", "5", "6", "7"], c: 1 },
    { topic: "Sports", q: "Which country won the FIFA World Cup in 2022?", a: ["France", "Argentina", "Croatia", "Morocco"], c: 1 },
    { topic: "Sports", q: "Which city hosted the 2024 Summer Olympics?", a: ["London", "Tokyo", "Paris", "Los Angeles"], c: 2 },
    { topic: "Sports", q: "What do you call a score of zero in Tennis?", a: ["Zero", "Nil", "Love", "None"], c: 2 },
    { topic: "Sports", q: "Which basketball player is called the 'G.O.A.T'?", a: ["LeBron James", "Michael Jordan", "Kobe Bryant", "Shaq"], c: 1 },
    { topic: "Sports", q: "How long is a standard Marathon race?", a: ["21.1 km", "40 km", "42.195 km", "50 km"], c: 2 },
    { topic: "Sports", q: "Most Men's Grand Slam titles as of 2026?", a: ["Federer", "Nadal", "Djokovic", "Alcaraz"], c: 2 }
];

// --- 3. CORE LOGIC ---
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10.0;
let timerInterval;
let isAnswered = false;

const startBtn = document.getElementById('start-btn');
const answersContainer = document.getElementById('answers-container');
const eventScreen = document.getElementById('event-screen');

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
    
    // Update UI
    document.getElementById('topic-display').innerText = q.topic;
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
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
            selectAnswer(-1); // Timeout
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
    
    const correctIdx = quizData[currentQuestionIndex].c;
    const btns = answersContainer.querySelectorAll('.answer-btn');

    if(idx === correctIdx) {
        btn.classList.add('correct');
        // MULTIPLIER UPGRADE: timeLeft * 100
        score += Math.round(timeLeft * 100); 
        document.getElementById('score-display').innerText = score;
    } else if(idx !== -1) {
        btn.classList.add('wrong');
    }
    
    btns[correctIdx].classList.add('correct');

    setTimeout(() => {
        currentQuestionIndex++;
        
        // --- CHAPTER TRANSITION LOGIC ---
        // Every 10 questions, show the chapter break
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
    document.getElementById('event-title').innerText = `NEW SHIFT: ${nextTopic}`;
    document.getElementById('event-desc').innerText = "Recalibrating the clock...";
    
    eventScreen.style.display = 'flex';
    
    setTimeout(() => {
        eventScreen.style.display = 'none';
        loadQuestion();
    }, 2500); // 2.5 second pause for the "Vibe"
}

function showResults() {
    localStorage.setItem('quiz_completed', 'true');

    const finalName = document.getElementById('player-name').value;
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('result-name').innerText = finalName;
    document.getElementById('final-score').innerText = score;

    fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
            Player: finalName, 
            Score: score,
            Timestamp: new Date().toLocaleString()
        })
    })
    .then(() => {
        document.getElementById('mail-status').innerText = "Report transmitted to host successfully.";
    })
    .catch(() => {
        document.getElementById('mail-status').innerText = "Sync error. Please screenshot your score!";
    });
}

document.getElementById('restart-btn').onclick = () => location.reload();
