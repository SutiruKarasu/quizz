window.startQuiz  =  function ()  {
  let name = document.getElementById("nameInput").value;

if(!name)  {
  alert("Please Enter your Name!");
  return;
}

localStorage.setItem("playerName",  name);

push(ref(db,  "players"),  {
  name:  name,
  timestamp:  Date.now()
});

window.location.href  =  "quiz.html;
}

function loadPlayers()  {
  const list  =  document.getElementById("playerList");

onValue(ref(db,  "players"),  (snapshot) =>  {
  let li = document.createElement("li");
  li.innerText  =  child.val().name;
  list.appendChild(li");
    });
  });
}

loadPlayers();
