//Hi! Welcome to my first project. I hope you like it!

//elements in the interface
let player1button = document.getElementById("player1");
let player2button = document.getElementById("player2");
let roundTimeTitle = document.getElementById("roundTimeTitle");
let playerScoresTitle = document.getElementById("playerScoresTitle");
let resetButton = document.getElementById("reset");
let score = document.getElementById("score");
let nextButton = document.getElementById("next");
let startButton = document.getElementById("start");

function hideAllButStart() {
    player1button.style.display = "none";
    player2button.style.display = "none";
    roundTimeTitle.style.display = "none";
    playerScoresTitle.style.display = "none";
    resetButton.style.display = "none";
    score.style.display = "none";
    nextButton.style.display = "none";
    document.getElementById("container").style.gridTemplateColumns = "100%";
    document.getElementById("dataContainer").style.display = "none";
}

function showAll() {
    player1button.style.display = "block";
    player2button.style.display = "block";
    roundTimeTitle.style.display = "block";
    playerScoresTitle.style.display = "block";
    resetButton.style.display = "block";
    score.style.display = "block";
    nextButton.style.display = "block";
    document.getElementById("container").style.gridTemplateColumns = "70% 30%";
    document.getElementById("dataContainer").style.display = "flex";
}

hideAllButStart();

const stopWatch = document.getElementById("time");
function resetTime() {
    stopWatch.innerText = "00:00:00"
}

//for the timer
let totalSecs = 0;
let hr;
let min;
let sec;

function seconds() {
    ++totalSecs;
    hr = Math.floor(totalSecs / 3600);
    min = Math.floor(totalSecs / 60);
    sec = totalSecs - hr * 3600 - min * 60;
    stopWatch.innerText = hr.toString().padStart(2, "0") + ":" + min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");

}

//for selecting max number of rounds
let promptRoundVal;

function promptRound() {
    promptRoundVal = parseInt(prompt("Please tell me the maximum number of rounds", "1"));
    if (!isNaN(promptRoundVal)) {
        window.alert("Best of luck!");

    }
    else {
        window.alert("Please type a number!");
        promptRound();
    }
}

//for selecting max score per round
let promptMaxScoreVal;

function promptMaxScore() {
    promptMaxScoreVal = parseInt(prompt("Please enter the points needed to win the round.", "10"));

    if (!isNaN(promptMaxScoreVal)) {
        window.alert(`Whoever gets ${promptMaxScoreVal} points first, wins the round!`);

    }
    else {
        window.alert("Please type a number!");
        promptMaxScore();
    }
}

//startButton button for the timer

let timeCount;

function startFx() {
    showAll();
    window.alert("Welcome to my ScoreKeeper!");
    promptMaxScore();
    promptRound();
    seconds();
    startButton.style.display = "none";
    timeCount = setInterval(seconds, 1000);
    document.getElementById("titleMessageDiv").style.display = "none";
    nextButton.disabled = true;
}

startButton.addEventListener("click", startFx);


// startButton of player score commands

function resetfx() {
    location.reload();
}

resetButton.addEventListener("click", resetfx);

//for score counter 
let p1score = 0;
let p2score = 0;



function plus1p1() {
    p1score = p1score + 1;
    score.innerText = `${p1score.toString().padStart(2, "0")} - ${p2score.toString().padStart(2, "0")}`;
    //what will happen if winning point is reached in the round
    toCheckWhoWinsTheRound();

}

player1button.addEventListener("click", plus1p1);


function plus1p2() {
    p2score++;
    score.innerText = `${p1score.toString().padStart(2, "0")} - ${p2score.toString().padStart(2, "0")}`;
    //what will happen if winning point is reached in the round
    toCheckWhoWinsTheRound();
}

player2button.addEventListener("click", plus1p2);


//code for pressing nextButton
function clear() {
    clearInterval(timeCount);
    stopWatch.innerText = "00:00:00";
};

//score and time record
let roundnumVal = 0;
let newRow;
let newCell;
let newCellContent

function appendData() {
    newRow = document.createElement("tr");
    for (let j = 0; j < 4; j++) {
        newCell = document.createElement("td");

        //content changer if statement
        let content;
        if (j === 0) {
            content = ++roundnumVal;
        }
        else if (j === 1) {
            content = p1score;
        }
        else if (j === 2) {
            content = p2score;
        }
        else if (j === 3) {
            content = hr.toString().padStart(2, "0") + ":" + min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");
        }

        newCellContent = document.createTextNode(content);
        newCell.appendChild(newCellContent);
        newRow.appendChild(newCell);
    }

    document.getElementById("tableBody").appendChild(newRow);
}

//for showing the result of the round
let resultLabel;


//this shows who wins the round
function result() {
    playerScoresTitle.innerText = `ROUND #${roundnumVal} RESULT:`;
    if (parseInt(p1score) > parseInt(p2score)) {
        resultLabel = "P1 WINS!";
    }
    else if (parseInt(p1score) < parseInt(p2score)) {
        resultLabel = "P2 WINS!";
    }
    else if (parseInt(p1score) === parseInt(p2score)) {
        resultLabel = "IT'S A TIE!";
    }
}

//for alternating the functions of the nextButton button
let isClicked = false;

function clickChecker() {
    if (isClicked == false) {
        isClicked = true;
    }
    else if (isClicked == true) {
        isClicked = false;
    }
}

//for the nextButton button
let player1Arr = [0];
let player2Arr = [0];

function toCheckWhoWinsTheRound() {
    if (p1score == promptMaxScoreVal || p2score == promptMaxScoreVal) {
        gameEnd();
        isClicked = true;
    }

}

function gameEnd() {

    appendData();
    result();
    score.innerText = resultLabel;
    clear();
    player1Arr.push(p1score);
    player2Arr.push(p2score);
    player1button.disabled = true;
    player2button.disabled = true;
    nextButton.disabled = false;

}


function nextRound() {

    totalSecs = 0;
    resetTime();
    timeCount = setInterval(seconds, 1000);
    p2score = 0;
    p1score = 0;
    player1button.disabled = false;
    player2button.disabled = false;
    score.innerText = `${p1score.toString().padStart(2, "0")} - ${p2score.toString().padStart(2, "0")}`;
    playerScoresTitle.innerText = "PLAYER SCORES";

    //what will happen after the last round
    if (promptRoundVal === roundnumVal) {
        roundTimeTitle.innerText = "CONGRATULATIONS!";
        clear();
        nextButton.disabled = true;
        const finalScoreP1 = player1Arr.reduce((previousValue, currentValue) => previousValue + currentValue);
        const finalScoreP2 = player2Arr.reduce((previousValue, currentValue) => previousValue + currentValue);
        //this shows the overall results
        if (finalScoreP1 > finalScoreP2) {
            playerScoresTitle.style.display = "none";
            stopWatch.innerText = "PLAYER1"
            score.innerText = `${finalScoreP1.toString().padStart(2, "0")} - ${finalScoreP2.toString().padStart(2, "0")}`
        }
        else if (finalScoreP1 < finalScoreP2) {
            playerScoresTitle.style.display = "none";
            score.innerText = `${finalScoreP1.toString().padStart(2, "0")} - ${finalScoreP2.toString().padStart(2, "0")}`
            stopWatch.innerText = "PLAYER2"
        }
        else if (finalScoreP1 == finalScoreP2) {
            playerScoresTitle.style.display = "none";
            score.innerText = `${finalScoreP1.toString().padStart(2, "0")} - ${finalScoreP2.toString().padStart(2, "0")}`
            stopWatch.innerText = "IT'S A TIE!"
            stopWatch.style.margin = "0px";
            document.getElementById("roundTimeTitle").innerText = "PLEASE PLAY AGAIN!!";
        }


        player1button.disabled = true;
        player2button.disabled = true;

    }
    // nextButton.disabled = true; check this
}


function nextFunction() {

    nextRound();
    nextButton.disabled = true;

    if (promptRoundVal == roundnumVal) {
        nextButton.disabled = true;
    }
}

// trial code
function consoleLog() {
    console.log(`Current Round: ${roundnumVal}`);
    console.log(`Max Round: ${promptRoundVal}`);
    console.log(isClicked);
}

nextButton.addEventListener("click", nextFunction);
nextButton.addEventListener("click", clickChecker);
