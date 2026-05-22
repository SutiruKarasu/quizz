const FORMSPREE_URL = "https://formspree.io/f/xzdojayg";

// --- 1. ACCESS CONTROL (One-time per device) ---
window.onload = function() {
    if (localStorage.getItem('quiz_completedv7') === 'true') {
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
    // --- BLOCK 1: GENERAL KNOWLEDGE ---
    { topic: "General Knowledge", q: "How many hearts does an octopus have?", a: ["1", "2", "3", "4"], c: 2 },
    { topic: "General Knowledge", q: "Which large land mammal is physically unable to jump?", a: ["Rhino", "Elephant", "Hippo", "Sloth"], c: 1 },
    { topic: "General Knowledge", q: "What color is a fully grown giraffe's tongue?", a: ["Pink", "Blue-Black", "Bright Red", "White"], c: 1 },
    { topic: "General Knowledge", q: "Which fruit carries its seeds on the outside?", a: ["Strawberry", "Banana", "Kiwi", "Apple"], c: 0 },
    { topic: "General Knowledge", q: "Which country has significantly more sheep than human residents?", a: ["Ireland", "New Zealand", "Scotland", "Australia"], c: 1 },
    { topic: "General Knowledge", q: "Which letter does not appear in the name of any of the 50 US states?", a: ["X", "Z", "Q", "J"], c: 2 },
    { topic: "General Knowledge", q: "How many teeth does a normal adult human have (including wisdom teeth)?", a: ["28", "30", "32", "34"], c: 2 },
    { topic: "General Knowledge", q: "Which creature is the official national animal of Scotland?", a: ["Lion", "Unicorn", "Eagle", "Loch Ness Monster"], c: 1 },
    { topic: "General Knowledge", q: "How many seconds are in one hour?", a: ["60", "1200", "3600", "6000"], c: 2 },
    { topic: "General Knowledge", q: "According to airport statistics, which item is most frequently left behind in hand luggage?", a: ["Charging Cable", "Neck Pillow", "Umbrella", "Sunglasses"], c: 0 },

    // --- BLOCK 2: BAR & DRINKS ---
    { topic: "Bar & Drinks", q: "What are the two main ingredients of a classic 'Cuba Libre'?", a: ["Vodka & Lemon", "Gin & Tonic", "Rum & Cola", "Whiskey & Ginger Ale"], c: 2 },
    { topic: "Bar & Drinks", q: "What item is traditionally placed on top of a freshly made Espresso Martini?", a: ["Coffee Beans", "Lemon Slice", "Mint Leaf", "Cinnamon Stick"], c: 0 },
    { topic: "Bar & Drinks", q: "Which spirit forms the base of a classic 'Caipirinha'?", a: ["Rum", "Cachaça", "Vodka", "Tequila"], c: 1 },
    { topic: "Bar & Drinks", q: "What is the metal cup used by bartenders to mix drinks called?", a: ["Strainer", "Jigger", "Shaker", "Muddler"], c: 2 },
    { topic: "Bar & Drinks", q: "From which country does the famous beer brand 'Corona' originate?", a: ["Spain", "Brazil", "Mexico", "Cuba"], c: 2 },
    { topic: "Bar & Drinks", q: "What does a bartender measure using a 'Jigger'?", a: ["Temperature", "Liquid Volume (cl)", "Carbonation", "Alcohol Percentage"], c: 1 },
    { topic: "Bar & Drinks", q: "Which cocktail is traditionally served in a copper mug with ginger beer and lime?", a: ["Moscow Mule", "Mojito", "Gin Fizz", "Mai Tai"], c: 0 },
    { topic: "Bar & Drinks", q: "What grain must make up at least 51% of a classic Bourbon whiskey's mash?", a: ["Barley", "Wheat", "Rye", "Corn"], c: 3 },
    { topic: "Bar & Drinks", q: "Which fruit provides the juice for a classic 'Mimosa' cocktail?", a: ["Ananas", "Orange", "Cranberry", "Grapefruit"], c: 1 },
    { topic: "Bar & Drinks", q: "Which herb is muddled to give a classic 'Mojito' its fresh flavor?", a: ["Basilikum", "Rosmarinus", "Mint", "Coriander"], c: 2 },

    // --- BLOCK 3: ENTERTAINMENT ---
    { topic: "Entertainment", q: "How many keys does a standard grand piano have?", a: ["76", "84", "88", "92"], c: 2 },
    { topic: "Entertainment", q: "Which streaming service is known worldwide for original series like 'Stranger Things'?", a: ["Amazon Prime", "Netflix", "Disney+", "Apple TV"], c: 1 },
    { topic: "Entertainment", q: "Which Swedish pop group won the Eurovision Song Contest in 1974 with the hit 'Waterloo'?", a: ["Roxette", "Ace of Base", "ABBA", "A*Teens"], c: 2 },
    { topic: "Entertainment", q: "What is the name of the fictional archaeologist who uses a whip in famous adventure movies?", a: ["Lara Croft", "Nathan Drake", "Indiana Jones", "James Bond"], c: 2 },
    { topic: "Entertainment", q: "Which pop artist released 'Thriller', the best-selling album of all time?", a: ["Eminem", "Michael Jackson", "Prince", "Elvis Presley"], c: 1 },
    { topic: "Entertainment", q: "Which superhero has been portrayed on cinema screens by Robert Downey Jr.?", a: ["Batman", "Superman", "Iron Man", "Thor"], c: 2 },
    { topic: "Entertainment", q: "In which year did the famous passenger ship Titanic sink in the Atlantic Ocean?", a: ["1905", "1912", "1920", "1933"], c: 1 },
    { topic: "Entertainment", q: "Which rapper played the lead role in the semi-autobiographical movie '8 Mile'?", a: ["50 Cent", "Snoop Dogg", "Eminem", "Dr. Dre"], c: 2 },
    { topic: "Entertainment", q: "What famous board game is all about buying streets and building hotels?", a: ["Risk", "Monopoly", "Scrabble", "Catan"], c: 1 },
    { topic: "Entertainment", q: "Which fictional detective lives at 221B Baker Street according to Arthur Conan Doyle's books?", a: ["Hercule Poirot", "Sherlock Holmes", "Miss Marple", "Columbo"], c: 1 },

    // --- BLOCK 4: TRAVEL & GEOGRAPHY ---
    { topic: "Travel & Geography", q: "In which European capital city can you find the famous Eiffel Tower?", a: ["Berlin", "London", "Paris", "Madrid"], c: 2 },
    { topic: "Travel & Geography", q: "What is the official currency used in the Czech Republic?", a: ["Euro", "Czech Koruna", "Zloty", "Forint"], c: 1 },
    { topic: "Travel & Geography", q: "What is the official capital city of Spain?", a: ["Barcelona", "Madrid", "Valencia", "Sevilla"], c: 1 },
    { topic: "Travel & Geography", q: "Which is the longest river on Earth?", a: ["Amazon", "Nile", "Mississippi", "Yangtze"], c: 1 },
    { topic: "Travel & Geography", q: "Which mountain range geographically separates Europe from Asia?", a: ["Alps", "Andes", "Ural", "Himalayas"], c: 2 },
    { topic: "Travel & Geography", q: "What is the capital city of the United States of America (USA)?", a: ["New York", "Los Angeles", "Washington, D.C.", "Chicago"], c: 2 },
    { topic: "Travel & Geography", q: "Which sovereign state is the smallest country in the world by land area?", a: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], c: 2 },
    { topic: "Travel & Geography", q: "Which country shares a border directly to the south of Germany?", a: ["Denmark", "Poland", "Austria", "Netherlands"], c: 2 },
    { topic: "Travel & Geography", q: "Which sea is the Italian city of Venice located on?", a: ["Mediterranean / Adriatic", "North Sea", "Baltic Sea", "Red Sea"], c: 0 },
    { topic: "Travel & Geography", q: "What is the name of the famous, historic opera house in Sydney, Australia?", a: ["Sydney Opera House", "Royal Albert Hall", "La Scala", "Metropolitan Opera"], c: 0 },

    // --- BLOCK 5: DIGITAL & INTERNET ---
    { topic: "Digital & Internet", q: "Which symbol is used on social media platforms to tag a keyword or hashtag?", a: ["@", "&", "#", "$"], c: 2 },
    { topic: "Digital & Internet", q: "What are the small digital icons and faces sent in chats called?", a: ["Logos", "Emojis", "Avatars", "Widgets"], c: 1 },
    { topic: "Digital & Internet", q: "Which internet browser featuring a red fox logo is developed by Mozilla?", a: ["Safari", "Chrome", "Firefox", "Edge"], c: 2 },
    { topic: "Digital & Internet", q: "What does 'WWW' stand for at the beginning of a classic website address?", a: ["World Wide Web", "Word Wide Wave", "Web Window World", "World Wide Wireless"], c: 0 },
    { topic: "Digital & Internet", q: "Which platform is the largest internet search engine in the world?", a: ["Yahoo", "Bing", "Google", "DuckDuckGo"], c: 2 },
    { topic: "Digital & Internet", q: "What do you call unwanted promotional emails that land in mass quantities in your inbox?", a: ["Trash", "Spam", "Phishing", "Bait"], c: 1 },
    { topic: "Digital & Internet", q: "Which video platform is the largest globally for streaming and watching user videos?", a: ["Vimeo", "Twitch", "YouTube", "TikTok"], c: 2 },
    { topic: "Digital & Internet", q: "What protects a home network from unauthorized access coming from the internet?", a: ["Firewall", "Bluetooth", "Mouse", "Graphics Card"], c: 0 },
    { topic: "Digital & Internet", q: "Which company operates the networks Instagram, Facebook, and WhatsApp?", a: ["Apple", "Google", "Meta", "Microsoft"], c: 2 },
    { topic: "Digital & Internet", q: "What is the portable storage device that plugs directly into a USB port called?", a: ["SD Card", "USB Flash Drive", "Hard Drive", "Router"], c: 1 },

    // --- BLOCK 6: LIFESTYLE & SPORTS ---
    { topic: "Lifestyle & Sports", q: "How many squares are on a classic chessboard in total?", a: ["32", "48", "64", "81"], c: 2 },
    { topic: "Lifestyle & Sports", q: "In which sport do you hit a ball over a net using rackets on a court?", a: ["Soccer", "Handball", "Tennis", "Basketball"], c: 2 },
    { topic: "Lifestyle & Sports", q: "How many minutes long is a standard halftime in a professional men's soccer match?", a: ["30", "40", "45", "60"], c: 2 },
    { topic: "Lifestyle & Sports", q: "What color is the pool ball that must be pocketed last to win a standard game of 8-ball?", a: ["White", "Yellow", "Red", "Black"], c: 3 },
    { topic: "Lifestyle & Sports", q: "How many darts does a player throw per turn in an official match?", a: ["2 Darts", "3 Darts", "4 Darts", "5 Darts"], c: 1 },
    { topic: "Lifestyle & Sports", q: "Which sport is played on ice using a puck and sticks?", a: ["Curling", "Ice Hockey", "Figure Skating", "Bobsleigh"], c: 1 },
    { topic: "Lifestyle & Sports", q: "What is the approximate running distance of a half marathon?", a: ["10 km", "21.1 km", "30 km", "42.2 km"], c: 1 },
    { topic: "Lifestyle & Sports", q: "Which famous motorsport is hosted in locations like Monaco, Singapore, and Monza?", a: ["Rallye", "Formula 1", "MotoGP", "Nascar"], c: 1 },
    { topic: "Lifestyle & Sports", q: "From which country does the martial art 'Judo' originally come from?", a: ["China", "Japan", "Korea", "Thailand"], c: 1 },
    { topic: "Lifestyle & Sports", q: "Which item of clothing is traditionally worn in summer at the beach or pool?", a: ["Swimsuit / Bikini", "Winter Jacket", "Turtleneck Sweater", "Leather Pants"], c: 0 }
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

if (startBtn) {
    startBtn.onclick = () => {
        const nameValue = document.getElementById('player-name').value.trim();
        if(!nameValue) return alert("Please enter your name!");
        document.getElementById('start-screen').classList.remove('active');
        document.getElementById('quiz-screen').classList.add('active');
        loadQuestion();
    };
}

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
        if(btn) btn.classList.add('correct');
        // MULTIPLIER UPGRADE: timeLeft * 100
        score += Math.round(timeLeft * 100); 
        document.getElementById('score-display').innerText = score;
    } else if(idx !== -1 && btn) {
        btn.classList.add('wrong');
    }
    
    if(btns[correctIdx]) btns[correctIdx].classList.add('correct');

    setTimeout(() => {
        currentQuestionIndex++;
        
        // --- CHAPTER TRANSITION LOGIC ---
        // Every 10 questions, trigger the shift break
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
    
    if(eventScreen) eventScreen.style.display = 'flex';
    
    setTimeout(() => {
        if(eventScreen) eventScreen.style.display = 'none';
        loadQuestion();
    }, 2500); // 2.5 second pause for the visual transition
}

function showResults() {
    localStorage.setItem('quiz_completedv7', 'true');

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

const restartBtn = document.getElementById('restart-btn');
if(restartBtn) {
    restartBtn.onclick = () => location.reload();
}
