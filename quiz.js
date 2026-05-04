let playerName = localStorage.getItem("playerName") || "Guest";
document.getElementById("welcome").innerText = "Player: " + playerName;

let questions = [
  {
    question: "What is 2+2?",
    answers: ["3", "4", "5"],
    correct: 1
  },
  {
    question: "What is 5+3?",
    answers: ["6", "8", "10"],
    correct: 1
  },
  {
    question: "What is 10-4?",
    answers: ["5", "6", "7"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

function loadQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;
  document.getElementById("result").innerText = "";

  let answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((answer, index) => {
    let btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").innerText = "Time: " + timeLeft;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(choice) {
  clearInterval(timerInterval);

  let correct = questions[currentQuestion].correct;

  if (choice === correct) {
    document.getElementById("result").innerText = "✅ Correct!";
    score += timeLeft * 10;
  } else {
    document.getElementById("result").innerText = "❌ Wrong!";
  }

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  document.body.innerHTML = `
    <div style="text-align:center; margin-top:100px; color:white;">
      <h1>Game Over</h1>
      <h2>Your Score: ${score}</h2>
      <button onclick="location.reload()">Restart</button>
    </div>
  `;
}

loadQuestion();
