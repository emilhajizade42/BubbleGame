const gameBoard = document.querySelector(".gameBoard");
const gameScore = document.querySelector(".gameScore");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const easyBtn = document.querySelector("#easyBtn");
const mediumBtn = document.querySelector("#mediumBtn");
const hardBtn = document.querySelector("#hardBtn");


let isGameStart = false;
let lastScore = 0
let yourScore = 0;
let yourGameMode = "easy";


function createInterval(time = 1000) {
    var worker = setInterval(() => {
        gameBoard.appendChild(createBubble())
    }, time);
    if (isGameStart) {
        worker()
        return;
    }
    clearInterval(worker)
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
    div.addEventListener("click",function (e) {
        yourScore = yourScore + calcScore(yourGameMode);
        gameScore.innerHTML = `Score:${yourScore}`;
        e.target.remove()
    })
    return div
}
function getRandomNum(num) {
    return (Math.floor(Math.random() * num) - 5);
}

easyBtn.addEventListener("click",function (e) {
    yourGameMode = "easy"
})

mediumBtn.addEventListener("click",function (e) {
    yourGameMode = "medium"
})

hardBtn.addEventListener("click",function (e) {
    yourGameMode = "hard"
})


startBtn.addEventListener("click",function (e) {
    
    if (!isGameStart) {
        isGameStart = true
        createInterval(calcTime(yourGameMode))
    } else {
        
    }
    
})

stopBtn.addEventListener("click",function (e) {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);

    }
    isGameStart = false;
    var killId = setTimeout(function() {
        for (var i = killId; i > 0; i--) clearInterval(i)
      }, 10);
      LastScore = yourScore;
      yourScore = 0;
      gameScore.innerHTML ="Score:0" 
})

function calcScore(yourGameMode) {
    if (yourGameMode == "easy") {
        return 1;
    }
    else if (yourGameMode == "medium"){
        return 2;
    }
    else if(yourGameMode == "hard"){
        return 3;
    }
}
function calcTime(yourGameMode) {
    if (yourGameMode == "easy") {
        return 1000;
    }
    else if (yourGameMode == "medium"){
        return 500;
    }
    else if(yourGameMode == "hard"){
        return 300;
    }
}