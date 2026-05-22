const FORMSPREE_URL = "https://formspree.io/f/xzdojayg";

// --- 1. ACCESS CONTROL (One-time per device) ---
window.onload = function() {
    if (localStorage.getItem('quiz_completedv5') === 'true') {
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
    // --- BLOCK 1: FILME & SERIEN ---
    { topic: "Filme & Serien", q: "Welcher Film gewann im Jahr 2024 den Oscar für den 'Besten Film'?", a: ["Barbie", "Oppenheimer", "Poor Things", "Killers of the Flower Moon"], c: 1 },
    { topic: "Filme & Serien", q: "In welcher spanischen Stadt spielt die Serie 'Haus des Geldes' hauptsächlich?", a: ["Barcelona", "Madrid", "Sevilla", "Valencia"], c: 1 },
    { topic: "Filme & Serien", q: "Wie heißt der fiktive Planet, auf dem die Handlung von 'Avatar' spielt?", a: ["Tatooine", "Pandora", "Arrakis", "Krypton"], c: 1 },
    { topic: "Filme & Serien", q: "Welche Serie handelt von einem Chemielehrer, der beginnt, Crystal Meth herzustellen?", a: ["Narcos", "Ozark", "Breaking Bad", "Better Call Saul"], c: 2 },
    { topic: "Filme & Serien", q: "Welcher Schauspieler spielt die Hauptrolle in der 'John Wick'-Reihe?", a: ["Keanu Reeves", "Tom Cruise", "Brad Pitt", "Jason Statham"], c: 0 },
    { topic: "Filme & Serien", q: "Wie heißt die kleine, grüne Kreatur aus der Serie 'The Mandalorian', die oft 'Baby Yoda' genannt wird?", a: ["Grogu", "Jar Jar", "Ewok", "Porg"], c: 0 },
    { topic: "Filme & Serien", q: "Welcher Film hält den Rekord für das weltweit am höchsten eingespielte Kinogebnis?", a: ["Titanic", "Avengers: Endgame", "Avatar", "Star Wars: Das Erwachen der Macht"], c: 2 },
    { topic: "Filme & Serien", q: "Wie viele Staffeln hat die originale Fantasy-Serie 'Game of Thrones'?", a: ["6", "7", "8", "9"], c: 2 },
    { topic: "Filme & Serien", q: "Welches Auto dient im Film 'Zurück in die Zukunft' als Zeitmaschine?", a: ["Ford Mustang", "DeLorean DMC-12", "Ferrari Testarossa", "Porsche 911"], c: 1 },
    { topic: "Filme & Serien", q: "Welcher britische Geheimagent hat die Codenummer 007?", a: ["Jason Bourne", "Ethan Hunt", "James Bond", "Jack Reacher"], c: 2 },

    // --- BLOCK 2: ESSEN & TRINKEN ---
    { topic: "Essen & Trinken", q: "Aus welchem Land stammt der bekannte Halloumi-Käse ursprünglich?", a: ["Griechenland", "Türkei", "Zypern", "Italien"], c: 2 },
    { topic: "Essen & Trinken", q: "Welche Pflanze gibt dem Gin seinen charakteristischen Hauptgeschmack?", a: ["Wacholder", "Ingwer", "Koriander", "Zimt"], c: 0 },
    { topic: "Essen & Trinken", q: "Was ist die Hauptzutat für die orientalische Spezialität Hummus?", a: ["Linsen", "Kichererbsen", "Bohnen", "Erbsen"], c: 1 },
    { topic: "Essen & Trinken", q: "Welches europäische Land hat den höchsten Pro-Kopf-Verbrauch an Kaffee?", a: ["Italien", "Finnland", "Deutschland", "Frankreich"], c: 1 },
    { topic: "Essen & Trinken", q: "Was bedeutet der Begriff 'Al Dente' bei der Zubereitung von Pasta?", a: ["Weich gekocht", "Bissfest", "Gut gewürzt", "In Sauce geschwenkt"], c: 1 },
    { topic: "Essen & Trinken", q: "Aus welcher Pflanze wird der mexikanische Schnaps Tequila gewonnen?", a: ["Zuckerrohr", "Kaktus", "Agave", "Mais"], c: 2 },
    { topic: "Essen & Trinken", q: "Welches Getränk wird im Volksmund oft scherzhaft als 'Flüssiges Brot' bezeichnet?", a: ["Wein", "Bier", "Milch", "Wodka"], c: 1 },
    { topic: "Essen & Trinken", q: "Was wird auf der sogenannten 'Scoville-Skala' gemessen?", a: ["Fettgehalt von Käse", "Schärfe von Chili", "Härte von Messerklingen", "Süße von Früchten"], c: 1 },
    { topic: "Essen & Trinken", q: "Welche dieser Früchte ist botanisch gesehen eine echte Beere?", a: ["Erdbeere", "Himbeere", "Banane", "Kirsche"], c: 2 },
    { topic: "Essen & Trinken", q: "Welches Land ist weltweit bekannt für die Erfindung der Pizza Neapoletana?", a: ["Spanien", "Italien", "Griechenland", "Frankreich"], c: 1 },

    // --- BLOCK 3: POPKULTUR & MUSIK ---
    { topic: "Popkultur & Musik", q: "Welche britische Band sang den weltberühmten Hit 'Bohemian Rhapsody'?", a: ["The Beatles", "Led Zeppelin", "Queen", "ABBA"], c: 2 },
    { topic: "Popkultur & Musik", q: "Wie viele Saiten hat eine klassische Konzertgitarre im Normalfall?", a: ["4", "5", "6", "7"], c: 2 },
    { topic: "Popkultur & Musik", q: "Aus welcher englischen Stadt stammten die Mitglieder der Band 'The Beatles'?", a: ["London", "Manchester", "Liverpool", "Birmingham"], c: 2 },
    { topic: "Popkultur & Musik", q: "Welche US-amerikanische Sängerin brach Rekorde mit ihrer weltweiten 'Eras Tour'?", a: ["Adele", "Billie Eilish", "Taylor Swift", "Beyoncé"], c: 2 },
    { topic: "Popkultur & Musik", q: "In welchem Jahrzehnt ging der Musiksender MTV im Fernsehen das erste Mal auf Sendung?", a: ["1970er", "1980er", "1990er", "2000er"], c: 1 },
    { topic: "Popkultur & Musik", q: "Welche Musikrichtung wird weltweit am stärksten mit Bob Marley verbunden?", a: ["Jazz", "Reggae", "Blues", "Ska"], c: 1 },
    { topic: "Popkultur & Musik", q: "Welcher deutsche Komponist schuf die berühmte 9. Sinfonie mit der 'Ode an die Freude'?", a: ["Mozart", "Bach", "Beethoven", "Wagner"], c: 2 },
    { topic: "Popkultur & Musik", q: "Wie nennt man das berühmte Festival in Kalifornien, das jährlich Musik- und Modebegeisterte anlockt?", a: ["Tomorrowland", "Woodstock", "Coachella", "Glastonbury"], c: 2 },
    { topic: "Popkultur & Musik", q: "Wie viele Monate hat ein Kalenderjahr im gregorianischen Kalender?", a: ["10", "11", "12", "13"], c: 2 },
    { topic: "Popkultur & Musik", q: "Welcher fiktive Detektiv wohnt laut den Büchern von Arthur Conan Doyle in der Baker Street 221B?", a: ["Hercule Poirot", "Sherlock Holmes", "Miss Marple", "Columbo"], c: 1 },

    // --- BLOCK 4: GEOGRAFIE ---
    { topic: "Geografie", q: "Wie viele Bundesländer hat die Bundesrepublik Deutschland?", a: ["12", "14", "16", "18"], c: 2 },
    { topic: "Geografie", q: "In welcher europäischen Hauptstadt befindet sich die berühmte Karlsbrücke?", a: ["Wien", "Prag", "Budapest", "Krakau"], c: 1 },
    { topic: "Geografie", q: "Welches Land grenzt im Norden direkt an die Tschechische Republik?", a: ["Österreich", "Slowakei", "Polen", "Ungarn"], c: 2 },
    { topic: "Geografie", q: "Welcher Fluss fließt direkt durch das Zentrum der tschechischen Hauptstadt Prag?", a: ["Donau", "Elbe", "Moldau", "Oder"], c: 2 },
    { topic: "Geografie", q: "Welcher Kontinent ist flächenmäßig der größte auf der Erde?", a: ["Afrika", "Nordamerika", "Asien", "Europa"], c: 2 },
    { topic: "Geografie", q: "Welches europäische Land besitzt statistisch gesehen die meisten Inseln weltweit?", a: ["Indonesien", "Kanada", "Schweden", "Philippinen"], c: 2 },
    { topic: "Geografie", q: "In wie viele offizielle Zeitzonen ist die Erde standardmäßig aufgeteilt?", a: ["12", "24", "36", "48"], c: 1 },
    { topic: "Geografie", q: "Welche Stadt ist die offizielle Hauptstadt von Australien?", a: ["Sydney", "Melbourne", "Canberra", "Brisbane"], c: 2 },
    { topic: "Geografie", q: "Welcher Ozean liegt zwischen Europa und dem nordamerikanischen Kontinent?", a: ["Pazifischer Ozean", "Atlantischer Ozean", "Indischer Ozean", "Arktischer Ozean"], c: 1 },
    { topic: "Geografie", q: "Wie heißt die Hauptstadt von Frankreich?", a: ["Berlin", "London", "Rom", "Paris"], c: 3 },

    // --- BLOCK 5: TECHNIK & ALLTAG ---
    { topic: "Technik & Alltag", q: "Welches Unternehmen entwickelte das Betriebssystem Windows?", a: ["Apple", "Google", "Microsoft", "IBM"], c: 2 },
    { topic: "Technik & Alltag", q: "In welchem Jahr wurde das allererste iPhone von Apple offiziell vorgestellt?", a: ["2005", "2007", "2008", "2010"], c: 1 },
    { topic: "Technik & Alltag", q: "Wofür steht die Abkürzung 'CPU' bei einem Computer?", a: ["Central Process Unit", "Core Program", "Central Processing Unit", "Power Unit"], c: 2 },
    { topic: "Technik & Alltag", q: "Wie viele Bits ergeben zusammen exakt einen Byte?", a: ["4", "8", "16", "32"], c: 1 },
    { topic: "Technik & Alltag", q: "Welche Programmiersprache wird primär für die Interaktivität auf Websites im Browser genutzt?", a: ["Swift", "JavaScript", "C++", "Java"], c: 1 },
    { topic: "Technik & Alltag", q: "Wofür steht das 'SSD' bei modernen Computer-Festplatten?", a: ["Speed Drive", "Solid State Drive", "System Disk", "Secure Device"], c: 1 },
    { topic: "Technik & Alltag", q: "Welches Format nutzt man im Webdesign oft für einfache Styling-Anweisungen (Schriftfarbe, Abstände)?", a: ["HTML", "JSON", "CSS", "XML"], c: 2 },
    { topic: "Technik & Alltag", q: "Welche Plattform wird weltweit am häufigsten genutzt, um Code-Repositories hochzuladen und zu verwalten?", a: ["GitHub", "StackOverflow", "Docker", "Wikipedia"], c: 0 },
    { topic: "Technik & Alltag", q: "Wie nennt man ein Software-System, das über eine feste Adresse Daten bereitstellt oder abfragt?", a: ["API", "RAM", "CPU", "BIOS"], c: 0 },
    { topic: "Technik & Alltag", q: "Welches Protokoll sorgt für eine verschlüsselte Übertragung im Browser (erkennbar am 's' am Anfang)?", a: ["HTTP", "FTP", "HTTPS", "SSH"], c: 2 },

    // --- BLOCK 6: SPORT ---
    { topic: "Sport", q: "Wie viele Feldspieler stehen pro Team standardmäßig bei einem Fußballspiel gleichzeitig auf dem Platz?", a: ["10", "11", "12", "13"], c: 1 },
    { topic: "Sport", q: "In welcher Sportart versucht man, mit möglichst wenigen Schlägen einen 'Hole-in-one' zu erzielen?", a: ["Tennis", "Golf", "Darts", "Bowling"], c: 1 },
    { topic: "Sport", q: "Wer hält den aktuellen Weltrekord im 100-Meter-Sprint der Herren?", a: ["Tyson Gay", "Yohan Blake", "Usain Bolt", "Carl Lewis"], c: 2 },
    { topic: "Sport", q: "Wie viele Ringe sind auf der offiziellen Flagge der Olympischen Spiele abgebildet?", a: ["4", "5", "6", "7"], c: 1 },
    { topic: "Sport", q: "Welches Land gewann die FIFA Fußball-Weltmeisterschaft der Herren im Jahr 2022?", a: ["Frankreich", "Argentinien", "Kroatien", "Marokko"], c: 1 },
    { topic: "Sport", q: "Welche europäische Metropole richtete die Olympischen Sommerspiele 2024 aus?", a: ["London", "Tokio", "Paris", "Los Angeles"], c: 2 },
    { topic: "Sport", q: "Welches Wort benutzt man beim Tennis für einen Spielstand von null Punkten?", a: ["Zero", "Nil", "Love", "None"], c: 2 },
    { topic: "Sport", q: "Wie lang ist die offizielle Laufdistanz bei einem klassischen Marathonlauf?", a: ["21,1 km", "40,0 km", "42,195 km", "50,0 km"], c: 2 },
    { topic: "Sport", q: "In welcher Sportart sind die Begriffe 'Dunking', 'Dribbling' und 'Drei-Punkte-Linie' fest verankert?", a: ["Handball", "Basketball", "Eishockey", "Volleyball"], c: 1 },
    { topic: "Sport", q: "Welche Farbe hat die Karte, die beim Fußball den sofortigen Platzverweis für einen Spieler bedeutet?", a: ["Gelb", "Grün", "Blau", "Rot"], c: 3 }
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
        // Jede 10. Frage wird die Chapter-Transition ausgelöst
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
    }, 2500); // 2.5 Sekunden Pause für den Übergang
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

const restartBtn = document.getElementById('restart-btn');
if(restartBtn) {
    restartBtn.onclick = () => location.reload();
}
