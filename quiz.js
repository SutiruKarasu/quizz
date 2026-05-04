let score = 0;
let.playername = localStorage.getItem("playerName");

document.getElementById("welcome").innerText = "Player: " + playerName;

function answer(choice) {
  let result = document.getElementById("result");

  if (choice === 1) {
    result.innerText = "Correct!";
    score++;
  } else {
    result.innerText = "Wrong!";
  }
}
