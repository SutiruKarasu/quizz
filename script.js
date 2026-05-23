const FORMSPREE_URL = "https://formspree.io/f/xzdojayg";

// --- 1. ACCESS CONTROL (One-time per device) ---
window.onload = function() {
    if (localStorage.getItem('quiz_completedzf') === 'true') {
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


// --- 3. CORE LOGIC ---
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10.0;
let timerInterval;
let isAnswered = false;

// STREAK TRACKING VARIABLES
let streak = 0;
let maxStreak = 0;

const startBtn = document.getElementById('start-btn');
const answersContainer = document.getElementById('answers-container');
const eventScreen = document.getElementById('event-screen');
const quizScreen = document.getElementById('quiz-screen'); 

if (startBtn) {
    startBtn.onclick = () => {
        const nameValue = document.getElementById('player-name').value.trim();
        if(!nameValue) return alert("Please enter your name!");
        document.getElementById('start-screen').classList.remove('active');
        quizScreen.classList.add('active');
        loadQuestion();
    };
}

function loadQuestion() {
    isAnswered = false;
    timeLeft = 10.0;
    const q = quizData[currentQuestionIndex];
    
    // UI Updates
    document.getElementById('topic-display').innerText = q.topic;
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
    document.getElementById('question-text').innerText = q.q;
    
    // Update live streak badge
    updateStreakUI();
    
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
            selectAnswer(-1); // Handles timeout as a wrong answer
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
    
    if (streakBadgeEl) {
        if (streak >= 3) {
            streakBadgeEl.classList.add('active-streak');
            streakBadgeEl.innerText = streak >= 5 ? `🔥 STREAK: ${streak} 🔥` : `✨ STREAK: ${streak}`;
        } else {
            streakBadgeEl.classList.remove('active-streak');
            streakBadgeEl.innerText = "";
        }
    }
}

function selectAnswer(idx, btn) {
    if(isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);
    
    const correctIdx = quizData[currentQuestionIndex].c;
    const btns = answersContainer.querySelectorAll('.answer-btn');

    if(idx === correctIdx) {
        if(btn) btn.classList.add('correct');
        
        // Advance Streak Tracker
        streak++;
        if (streak > maxStreak) maxStreak = streak;
        
        // MULTIPLIER FEATURE
        let streakMultiplier = 1.0;
        if (streak >= 5) streakMultiplier = 1.5; 
        else if (streak >= 3) streakMultiplier = 1.2; 
        
        score += Math.round(timeLeft * 100 * streakMultiplier); 
        document.getElementById('score-display').innerText = score;
    } else {
        // Wrong Answer -> Reset Streak & Trigger Screen Shake
        streak = 0;
        if(btn) btn.classList.add('wrong');
        
        if (quizScreen) {
            quizScreen.classList.add('shake-active');
            setTimeout(() => {
                quizScreen.classList.remove('shake-active');
            }, 500); 
        }
    }
    
    if(btns[correctIdx]) btns[correctIdx].classList.add('correct');
    updateStreakUI();

    setTimeout(() => {
        currentQuestionIndex++;
        
        // --- CHAPTER TRANSITION LOGIC ---
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
    if(descEl) descEl.innerText = `Next Phase: ${nextTopic}`;
    
    if(eventScreen) {
        eventScreen.classList.add('fade-in-overlay');
        eventScreen.style.display = 'flex';
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
    localStorage.setItem('quiz_completedzf', 'true');

    const finalName = document.getElementById('player-name').value;
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('result-name').innerText = finalName;
    document.getElementById('final-score').innerText = score;

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
    .then(() => {
        document.getElementById('mail-status').innerText = "Report transmitted to host successfully.";
    })
    .catch(() => {
        document.getElementById('mail-status').innerText = "Sync error. Please screenshot your score!";
    });
}

const restartBtn = document.getElementById('restart-btn');
if(restartBtn) {
    restartBtn.onclick = () => localStorage.clear(); location.reload();
}
