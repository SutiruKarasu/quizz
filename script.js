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
    // --- BLOCK 1: CELEBRITY SECRETS & TRIVIA ---
    { topic: "Celebrity Secrets", q: "Which Hollywood actor famously bought a haunted mansion and a dinosaur skull?", a: ["Johnny Depp", "Nicolas Cage", "Brad Pitt", "Keanu Reeves"], c: 1 },
    { topic: "Celebrity Secrets", q: "Which pop star's real name is Stefani Joanne Angelina Germanotta?", a: ["Lady Gaga", "Madonna", "Katy Perry", "Rihanna"], c: 0 },
    { topic: "Celebrity Secrets", q: "Before becoming a global movie star, which actor worked as a professional wrestler known as 'The Rock'?", a: ["John Cena", "Jason Statham", "Dwayne Johnson", "Vin Diesel"], c: 2 },
    { topic: "Celebrity Secrets", q: "Which singer famously has a phobia of indoor plants and refuses them in her dressing rooms?", a: ["Beyoncé", "Taylor Swift", "Christina Aguilera", "Britney Spears"], c: 3 },
    { topic: "Celebrity Secrets", q: "Which billionaire tech founder made a cameo appearance as a robot-fighting enthusiast in 'Iron Man 2'?", a: ["Bill Gates", "Mark Zuckerberg", "Elon Musk", "Jeff Bezos"], c: 2 },
    { topic: "Celebrity Secrets", q: "Which famous actor spent his early years performing as a stand-up comedian and a mime?", a: ["Jim Carrey", "Robin Williams", "Tom Hanks", "Adam Sandler"], c: 1 },
    { topic: "Celebrity Secrets", q: "Which pop star icon famously owned a pet chimpanzee named 'Bubbles' in the 1980s?", a: ["Prince", "Michael Jackson", "David Bowie", "Freddie Mercury"], c: 1 },
    { topic: "Celebrity Secrets", q: "Which actor cut his hand open while filming a dinner scene in 'Django Unchained' but kept acting through the scene?", a: ["Leonardo DiCaprio", "Jamie Foxx", "Brad Pitt", "Christoph Waltz"], c: 0 },
    { topic: "Celebrity Secrets", q: "Which country music legend and icon is the godmother of pop star Miley Cyrus?", a: ["Cher", "Dolly Parton", "Shania Twain", "Tina Turner"], c: 1 },
    { topic: "Celebrity Secrets", q: "Which superstar famously insured his iconic smile and teeth for several million dollars?", a: ["Tom Cruise", "Julia Roberts", "Jim Carrey", "Cristiano Ronaldo"], c: 1 },

    // --- BLOCK 2: NATURE & WILDLIFE ---
    { topic: "Nature", q: "Which bird is globally recognized as the fastest animal on Earth when diving for prey?", a: ["Golden Eagle", "Peregrine Falcon", "Ostrich", "Hummingbird"], c: 1 },
    { topic: "Nature", q: "What is the largest living structure on Earth, visible even from outer space?", a: ["The Amazon Rainforest", "The Great Barrier Reef", "The Grand Canyon", "Mount Everest"], c: 1 },
    { topic: "Nature", q: "Which mammal has the densest and thickest fur of any animal on the planet?", a: ["Polar Bear", "Sea Otter", "Grizzly Bear", "Arctic Fox"], c: 1 },
    { topic: "Nature", q: "How many bones does a shark have in its entire body naturally?", a: ["0", "50", "200", "400"], c: 0 },
    { topic: "Nature", q: "What is the only mammal naturally capable of true, sustained flight?", a: ["Flying Squirrel", "Bat", "Sugar Glider", "Eagle"], c: 1 },
    { topic: "Nature", q: "Which tree species is considered the tallest growing organism on Earth?", a: ["Oak", "Coast Redwood", "Baobab", "Pine"], c: 1 },
    { topic: "Nature", q: "What percentage of the Earth's surface is covered by oceans and water?", a: ["50%", "60%", "71%", "85%"], c: 2 },
    { topic: "Nature", q: "Which insect is known for migrating thousands of miles across America every single year?", a: ["Honeybee", "Monarch Butterfly", "Locust", "Dragonfly"], c: 1 },
    { topic: "Nature", q: "Which deep-sea creature has three separate hearts and blue blood flowing through its body?", a: ["Blue Whale", "Great White Shark", "Octopus", "Jellyfish"], c: 2 },
    { topic: "Nature", q: "What is the primary gas that makes up the majority of the Earth's atmosphere?", a: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], c: 1 },

    // --- BLOCK 3: DISNEY MAGIC ---
    { topic: "Disney", q: "What is the name of Mickey Mouse's loyal and iconic pet dog?", a: ["Goofy", "Donald", "Pluto", "Bolt"], c: 2 },
    { topic: "Disney", q: "In the movie 'The Lion King', what does the famous phrase 'Hakuna Matata' mean?", a: ["No worries", "Stay strong", "Family forever", "Good morning"], c: 0 },
    { topic: "Disney", q: "Which Disney princess famously loses a glass slipper at the royal ball at midnight?", a: ["Snow White", "Cinderella", "Belle", "Ariel"], c: 1 },
    { topic: "Disney", q: "What is the name of the live-action and animated hybrid universe where superhero 'Captain Jack Sparrow' sails?", a: ["Pirates of the Caribbean", "Peter Pan", "Treasure Planet", "Atlantis"], c: 0 },
    { topic: "Disney", q: "In 'Aladdin', what type of animal is Jasmine's loyal companion named Rajah?", a: ["Monkey", "Tiger", "Parrot", "Elephant"], c: 1 },
    { topic: "Disney", q: "Which Disney animated movie features the hit song 'Let It Go' sung by Queen Elsa?", a: ["Tangled", "Brave", "Frozen", "Moana"], c: 2 },
    { topic: "Disney", q: "What is the name of the fairy companion who accompanies Peter Pan on his adventures?", a: ["Maleficent", "Tinker Bell", "Flora", "Blue Fairy"], c: 1 },
    { topic: "Disney", q: "How many years did the Genie spend trapped inside the magic lamp before Aladdin found him?", a: ["100 years", "1,000 years", "10,000 years", "50,000 years"], c: 2 },
    { topic: "Disney", q: "In 'Finding Nemo', what specific type of fish is Nemo and his father Marlin?", a: ["Clownfish", "Blue Tang", "Goldfish", "Pufferfish"], c: 0 },
    { topic: "Disney", q: "Which classic Disney movie was the very first full-length animated feature film ever released?", a: ["Pinocchio", "Bambi", "Snow White and the Seven Dwarfs", "Dumbo"], c: 2 },

    // --- BLOCK 4: MEDIA, TV & MOVIES ---
    { topic: "Media", q: "Which epic fantasy TV show features the rival families Stark, Lannister, and Targaryen?", a: ["The Witcher", "Lord of the Rings", "Game of Thrones", "House of the Dragon"], c: 2 },
    { topic: "Media", q: "What is the highest-grossing movie of all time at the global box office?", a: ["Titanic", "Avengers: Endgame", "Avatar", "Star Wars: The Force Awakens"], c: 2 },
    { topic: "Media", q: "Which iconic sitcom revolves around a group of six friends living in New York City hanging out at 'Central Perk'?", a: ["How I Met Your Mother", "The Big Bang Theory", "Friends", "The Office"], c: 2 },
    { topic: "Media", q: "Who directed the legendary sci-fi and action movies 'Inception', 'The Dark Knight', and 'Oppenheimer'?", a: ["Steven Spielberg", "Quentin Tarantino", "Christopher Nolan", "James Cameron"], c: 2 },
    { topic: "Media", q: "Which fictional dystopian game show went viral as Netflix's most-watched series launch of all time?", a: ["Stranger Things", "Squid Game", "Money Heist", "The Crown"], c: 1 },
    { topic: "Media", q: "In the 'Harry Potter' universe, what is the name of the prison guarded by Dementors?", a: ["Azkaban", "Hogwarts", "Gringotts", "Nurmengard"], c: 0 },
    { topic: "Media", q: "Which major social media app revolutionized mobile video content with a continuous 'For You' feed?", a: ["Instagram", "Snapchat", "TikTok", "X / Twitter"], c: 2 },
    { topic: "Media", q: "Which famous secret agent card-number designation is held by James Bond?", a: ["005", "007", "009", "011"], c: 1 },
    { topic: "Media", q: "What is the name of the fiktive town where the mysterious events of 'Stranger Things' take place?", a: ["Springfield", "Riverdale", "Hawkins", "Mystic Falls"], c: 2 },
    { topic: "Media", q: "Which movie won the historic Oscar for Best Picture at the Academy Awards in 2020 as the first non-English film?", a: ["1917", "Parasite", "Joker", "Once Upon a Time in Hollywood"], c: 1 },

    // --- BLOCK 5: GLOBAL CULTURES & TRADITIONS ---
    { topic: "Cultures", q: "Which traditional festival, known as the 'Festival of Colors', is celebrated widely in India?", a: ["Diwali", "Holi", "Eid", "Ramadan"], c: 1 },
    { topic: "Cultures", q: "In Japanese culture, what is the traditional, floor-length robe worn for formal occasions called?", a: ["Sari", "Kimono", "Kilt", "Hanbok"], c: 1 },
    { topic: "Cultures", q: "Which European country is culturally famous for the traditional Oktoberfest and Bratwurst?", a: ["Austria", "Switzerland", "Germany", "Belgium"], c: 2 },
    { topic: "Cultures", q: "What iconic, historical stone structure was built over centuries to protect the northern borders of China?", a: ["The Great Wall of China", "The Terracotta Army", "The Forbidden City", "The Summer Palace"], c: 0 },
    { topic: "Cultures", q: "Which country is the birthplace of the traditional 'Day of the Dead' (Día de los Muertos) celebration?", a: ["Spain", "Brazil", "Mexico", "Colombia"], c: 2 },
    { topic: "Cultures", q: "What traditional martial art and national sport of Korea focuses primarily on dynamic kicking techniques?", a: ["Karate", "Kung Fu", "Taekwondo", "Judo"], c: 2 },
    { topic: "Cultures", q: "Which ancient civilization constructed the famous mountaintop citadel of Machu Picchu in Peru?", a: ["Aztecs", "Mayans", "Incas", "Romans"], c: 2 },
    { topic: "Cultures", q: "What is the traditional name of the pattern-woven, wool skirt worn by men in Scotland?", a: ["Toga", "Kilt", "Sarong", "Poncho"], c: 1 },
    { topic: "Cultures", q: "In Italy, which city is globally celebrated as the historic birthplace of the classic Pizza?", a: ["Rome", "Milan", "Naples", "Florence"], c: 2 },
    { topic: "Cultures", q: "Which country is famous for its traditional wooden 'Sauna' culture, outnumbering the cars in the nation?", a: ["Sweden", "Norway", "Finland", "Iceland"], c: 2 },

    // --- BLOCK 6: GAMING & RETRO HITS ---
    { topic: "Gaming & Retro Hits", q: "Which iconic video game character is a yellow circle that eats dots while running from ghosts?", a: ["Mario", "Sonic", "Pac-Man", "Donkey Kong"], c: 2 },
    { topic: "Gaming & Retro Hits", q: "What is the best-selling video game of all time, allowing players to build with blocks?", a: ["GTA V", "Tetris", "Minecraft", "Wii Sports"], c: 2 },
    { topic: "Gaming & Retro Hits", q: "Which Italian plumber is the official mascot of the gaming company Nintendo?", a: ["Luigi", "Wario", "Mario", "Yoshi"], c: 2 },
    { topic: "Gaming & Retro Hits", q: "What retro puzzle game requires players to fit falling geometric shapes perfectly into lines?", a: ["Pac-Man", "Tetris", "Space Invaders", "Pong"], c: 1 },
    { topic: "Gaming & Retro Hits", q: "Which handheld gaming console, released by Nintendo in 1989, popularized Tetris worldwide?", a: ["Game Boy", "NES", "Sega Genesis", "PlayStation"], c: 0 },
    { topic: "Gaming & Retro Hits", q: "What is the name of the main green-clad hero and adventurer in 'The Legend of Zelda' series?", a: ["Zelda", "Link", "Ganon", "Mario"], c: 1 },
    { topic: "Gaming & Retro Hits", q: "Which blue hedgehog is famous for running at supersonic speeds as Sega's mascot?", a: ["Crash Bandicoot", "Spyro", "Sonic", "Mega Man"], c: 2 },
    { topic: "Gaming & Retro Hits", q: "In the hit game 'Pokémon', which yellow electric mouse is creature number #025?", a: ["Charmander", "Bulbasaur", "Pikachu", "Squirtle"], c: 2 },
    { topic: "Gaming & Retro Hits", q: "Which ultra-popular battle royale game features massive building mechanics and cultural dance emotes?", a: ["PUBG", "Fortnite", "Apex Legends", "Call of Duty"], c: 1 },
    { topic: "Gaming & Retro Hits", q: "What iconic 1970s arcade game is considered the very first commercially successful video game, simulating table tennis?", a: ["Space Invaders", "Asteroids", "Pong", "Pac-Man"], c: 2 }
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
