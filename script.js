function startQuiz() {
  let name = document.getElementById("nameInput").value;

  if (name === "") {
    alert("Please enter your name!");
    return;
  }

  // Name speichern
  localStorage.setItem("playerName", name);

  // Weiter zur Quiz Seite
  window.location.href = "quiz.html";
}
