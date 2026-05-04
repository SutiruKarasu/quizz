
let score = 0;
let timeLeft = 10;
let answered = false;
let timerInterval;

let playerName = localStorage.getItem("playerName") || "Guest";
document.getElementById("welcome").innerText = "Player: " + playerName;

// Timer starten
startTimer();

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;

    document.getElementById("timer").innerText = "Time: " + timeLeft;

    console.log("tick"); // später Sound möglich

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      lockAnswers();
    }
  }, 1000);
}

// Antwort Funktion
function answer(choice) {
  if (answered) return; // schon beantwortet → nix mehr möglich

  answered = true;
  clearInterval(timerInterval);

  let result = document.getElementById("result");

  if (choice === 1) {
    result.innerText = "Correct!";

    // Punkte nach Zeit
    let points = timeLeft * 10;
    score += points;

    console.log("Points:", points);
  } else {
    result.innerText = "Wrong!";
  }

  lockAnswers();
}

// Buttons deaktivieren
function lockAnswers() {
  let buttons = document.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
  });
}
