const gameBoard = document.querySelector(".gameBoard");
const gameScore = document.querySelector(".gameScore");
const gameScoreTable = document.querySelector(".gameScoreTable");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const easyBtn = document.querySelector("#easyBtn");
const mediumBtn = document.querySelector("#mediumBtn");
const hardBtn = document.querySelector("#hardBtn");
const userName = document.querySelector(".userName");


let isGameStart = false;
let lastScore = 0;
let yourScore = 0;
let yourGameMode = "easy";
let yourName = "";
let UserScoreArr = [];

class User {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

//Game moods handle
easyBtn.addEventListener("click", function (e) {
  yourGameMode = "easy";
});
//Game moods handle
mediumBtn.addEventListener("click", function (e) {
  yourGameMode = "medium";
});
//Game moods handle
hardBtn.addEventListener("click", function (e) {
  yourGameMode = "hard";
});



startBtn.addEventListener("click", function (e) {
  setUserName();
  if (!isGameStart) {
    isGameStart = true;
    createInterval(calcTime(yourGameMode));
  } else {
  }
});

stopBtn.addEventListener("click", function (e) {
  userName.innerHTML = "Username";
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
  isGameStart = false;
  //Delet all Intervals
  var killId = setTimeout(function () {
    for (var i = killId; i > 0; i--) clearInterval(i);
  }, 10);
  //Reset Score
  lastScore = yourScore;
  yourScore = 0;
  gameScore.innerHTML = "Score:0";
  //Add result LocalStorage
  UserScoreArr.push(new User(yourName, lastScore));
  setUserLocalStorage(UserScoreArr);
  updateScoreTable();
});

function calcScore(yourGameMode) {
  if (yourGameMode == "easy") {
    return 1;
  } else if (yourGameMode == "medium") {
    return 2;
  } else if (yourGameMode == "hard") {
    return 3;
  }
}
function calcTime(yourGameMode) {
  if (yourGameMode == "easy") {
    return 1000;
  } else if (yourGameMode == "medium") {
    return 500;
  } else if (yourGameMode == "hard") {
    return 300;
  }
}
function createInterval(time = 1000) {
  var worker = setInterval(() => {
    gameBoard.appendChild(createBubble());
    if (getChildElementsCount(gameBoard) > 20) {
      alert("You Lose");
      stopBtn.click();
      return;
    }
  }, time);
}

function createBubble() {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.height = "10px";
  div.style.width = "10px";
  div.style.background = "yellow";
  div.style.cursor = "pointer";
  div.style.borderRadius = "50%";
  div.style.left = `${getRandomNum(330)}px`;
  div.style.top = `${getRandomNum(260)}px`;
  div.addEventListener("click", function (e) {
    yourScore = yourScore + calcScore(yourGameMode);
    gameScore.innerHTML = `Score:${yourScore}`;
    e.target.remove();
  });
  return div;
}
function getRandomNum(num) {
  return Math.floor(Math.random() * num) - 5;
}
function getChildElementsCount(element) {
  return element.children.length;
}
function setUserName() {
  yourName = prompt("Enter your name");
  userName.innerHTML = `Username:${yourName}`;
}

function setUserLocalStorage(arr) {
  localStorage.setItem("UserDb", JSON.stringify(arr));
}
function getUserLocalStorage() {
  return JSON.parse(localStorage.getItem("UserDb"));
}
function updateScoreTable() {
  gameScoreTable.innerHTML = "";
  let arr = getUserLocalStorage();
  arr.sort((a, b) => (a.score < b.score ? 1 : -1));
  arr.forEach((element) => {
    gameScoreTable.appendChild(
      createScoreTableRow(element.name, element.score)
    );
  });
}
function createScoreTableRow(name, score) {
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  h2.innerHTML = name;
  let h4 = document.createElement("h4");
  h4.innerHTML = score;
  div.appendChild(h2);
  div.appendChild(h4);
  return div;
}

//get old data 
window.onload = function () {
  updateScoreTable();
};
