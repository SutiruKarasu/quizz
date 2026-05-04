let score = 0
function answer(choice)  {
  let result = document.getElementById("result");

  if (choice === 1)  {
    result.innertext = "correct";
    score++;
  } else {
    result.innerText = "Wrong";

  }

  console.log("Score:", score);

}
