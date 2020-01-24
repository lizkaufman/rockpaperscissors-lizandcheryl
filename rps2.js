let totalRounds = 0;
let gameHistory = [];
let username = '';

function getUsername() {
  username = document.getElementById('name-input').value;
  console.log(username);
  let format = /[!@#$%^&*()_+£\-=\[\]{};':"\\|,.<>\/?]+/;
  if (username && isNaN(username) && !format.test(username)) {
    displayString(username);
  } else {
    alert('Invalid username');
  }
}

document
  .getElementById('username-button')
  .addEventListener('click', getUsername);

function displayString(itemToDisplay) {
  document.getElementById('username-top').innerText = itemToDisplay;
  document.getElementById('username-scores').innerText = itemToDisplay;
}

/*Chris's way:

function handleUsername() {
  var input = document.getElementById("username-input");
  var display = document.getElementById. (etc to change the text)

  Basically, he used input.value with the above and then plugged it into display.
}
*/
function generateComputerMove() {
  //var computerMove = document.getElementById("computer-move");
  let randomNumber = Math.random();
  if (randomNumber <= 0.33) {
    //alert("Computer's move is rock.");
    console.log("Computer's move is rock.");
    //document.getElementById("computer-move").innerText = "The computer chose rock.";
    showCompMove('rock');
    return 'rock';
  } else if (randomNumber > 0.33 && randomNumber <= 0.66) {
    //alert("Computer's move is paper");
    console.log("Computer's move is paper");
    //document.getElementById("computer-move").innerText = "The computer chose paper.";
    showCompMove('paper');
    return 'paper';
  } else if (randomNumber > 0.66) {
    //alert("Computer's move is scissors")
    console.log("Computer's move is scissors");
    //document.getElementById("computer-move").innerText = "The computer chose scissors.";
    showCompMove('scissors');
    return 'scissors';
  }
}

function playGame(playerMove) {
  // Math.random() gives number 0-1
  //if random number <0.33, -> rock
  //if random number >0.33 but <0.66, -> paper
  //else scissors

  let computerMove = generateComputerMove();

  //playerMove rock computerMove rock
  //print draw
  //playerMove rock computerMove paper
  //print computer win
  //playerMove rock computerMove scissors
  //print player win

  /* Need to refactor for this:
    if(playerMove === computerMove) {
        console.log("draw");
    }
    */

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      showWinner('draw');
      console.log('draw');
      scoreKeeping(0);
    } else if (computerMove === 'paper') {
      showWinner('computer wins');
      console.log('computer wins');
      scoreKeeping(1);
    } else if (computerMove === 'scissors') {
      showWinner('player wins');
      console.log('player wins');
      scoreKeeping(2);
    }
  }

  //playerMove paper computerMove rock
  //print player win
  //playerMove paper computerMove paper
  //print draw
  //playerMove paper computerMove scissors
  //print computer win

  if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      showWinner('player wins');
      console.log('player wins');
      scoreKeeping(2);
    } else if (computerMove === 'paper') {
      showWinner('draw');
      console.log('draw');
      scoreKeeping(0);
    } else if (computerMove === 'scissors') {
      showWinner('computer wins');
      console.log('computer wins');
      scoreKeeping(1);
    }
  }

  //playerMove scissors computerMove rock
  //print comp win
  //playerMove scissors computerMove paper
  //print player win
  //playerMove scissors computerMove scissors
  //print draw

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      showWinner('computer wins');
      scoreKeeping(1);
      console.log('computer wins');
    } else if (computerMove === 'paper') {
      showWinner('player wins');
      scoreKeeping(2);
      console.log('player wins');
    } else if (computerMove === 'scissors') {
      showWinner('draw');
      scoreKeeping(0);
      console.log('draw');
    }
  }

  totalRounds = totalRounds + 1;
  console.log(totalRounds);
  document.getElementById('total-rounds').innerText = totalRounds;

  //-----Game history section:-----

  const gameChoices = {
    playerMove, //if the key is the name of an earlier var and the value is the var's value, you can just put the name of the variable as shorthand
    computerMove
  };

  gameHistory.push(gameChoices);
  drawHistory();
}

function drawHistory() {
  let historyElement = document.getElementById('history');
  let displayString = '';
  for (let i = 0; i < gameHistory.length; i++) {
    displayString +=
      '<li>' +
      gameHistory[i].playerMove +
      ' vs ' +
      gameHistory[i].computerMove +
      '</li>';
  }
  historyElement.innerHTML = displayString;
}

document.getElementById('rock-button').addEventListener('click', playRock);
document.getElementById('paper-button').addEventListener('click', playPaper);
document
  .getElementById('scissors-button')
  .addEventListener('click', playScissors);

function playRock() {
  playGame('rock');
}
function playPaper() {
  playGame('paper');
}
function playScissors() {
  playGame('scissors');
}

function showCompMove(message) {
  showMessageInElement(message, 'computer-move');
}

function showWinner(message) {
  showMessageInElement(message, 'winner');
}

function showMessageInElement(message, id) {
  let resultElement = document.getElementById(id);
  resultElement.innerText = message;
}

// ------- scoring -----------

// In the HTML, put a display that shows the score; table with results of each round (row by row)
// In JS, we need something to keep track of each round, both for the player winning and computer wins (variable for each?)
// We need a function that sees who wins each round and updates either variable, depending on winner
// If player wins, iterate player win count up by one, and change the table cell to show the new updated number; if else computer wins, do that but w/ computer count cell, else draw cell
// Iterating the cell - need something with a ++ - a variable?
// Those variables, number of wins for each, will then need to be displayed by changing the text of the scoreboard

let score = { 'player-wins': 0, 'comp-wins': 0, draws: 0 };

function scoreKeeping(result) {
  console.log(result);
  let updatedScore = 0;
  if (result === 2) {
    updatedScore = updatedScore + 1;
    updateScoreBoard(updatedScore, 'player-wins');
  } else if (result === 1) {
    updatedScore = updatedScore + 1;
    updateScoreBoard(updatedScore, 'comp-wins');
  } else if (result === 0) {
    updatedScore = updatedScore + 1;
    updateScoreBoard(updatedScore, 'draws');
  }
}

function updateScoreBoard(updatedScore, scoreId) {
  score[scoreId] += updatedScore;
  //console.log(score);
  document.getElementById(scoreId).innerText = score[scoreId];
}

/* Chris's way for scoreboard:

Less good way (messy in HTML):
In each if statement in playGame:
var wins = Number(document.getElementById("wins"));
wins.innerText = Number(wins.innerText) + 1;

Better way, all in JS:
Variables for each (wins, draws, losses), then ++ each in each if statement of the playGame; then have the document.getElementById.innerText update the relevant html bit in the playGame function (one each for wins, draws, and losses)
*/

//---- validation plan ----

// Decide where to put the validation
// Insert conditions that test for different forms of validation (not a number, not an empty string) - if statements
// Put in an alert of some kind to show on the site if an invalid username is entered
