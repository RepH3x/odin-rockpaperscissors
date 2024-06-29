//setup global variables
const maxRounds = 5;
let currentRound = 1;
let humanScore = 0;
let computerScore = 0;

const output = document.querySelector("#outputWrapper");

const TRACKED_ELEMENTS = new Map();
TRACKED_ELEMENTS.set("humanChoice", document.querySelector("#humanChoice"));
TRACKED_ELEMENTS.set("computerChoice", document.querySelector("#computerChoice"));
TRACKED_ELEMENTS.set("winner", document.querySelector("#winner"));
TRACKED_ELEMENTS.set("countdown", document.querySelector("#countdown"));
TRACKED_ELEMENTS.set("score", document.querySelector("#score"));

const WIN_MESSAGES = new Map();
WIN_MESSAGES.set("rock", "You won! Rock smashes scissors!");
WIN_MESSAGES.set("paper", "You won! Paper covers rock!");
WIN_MESSAGES.set("scissors", "You won! Scissors cuts paper!");
WIN_MESSAGES.set("final", "You beat the Computer! Congratulations!");

const LOSE_MESSAGES = new Map();
LOSE_MESSAGES.set("rock", "You lose! Paper covers rock!");
LOSE_MESSAGES.set("paper", "You lose! Scissors cuts paper!");
LOSE_MESSAGES.set("scissors", "You lose! Rock smashes scissors!");
LOSE_MESSAGES.set("final", "You lost to the Computer. Better luck next time!");

const TIE_MESSAGES = new Map();
TIE_MESSAGES.set("tie", "You tied!");
TIE_MESSAGES.set("final", "You tied with the Computer. So close!");

const DEFAULT_TEXT = new Map();
DEFAULT_TEXT.set("humanChoice", TRACKED_ELEMENTS.get("humanChoice").innerText);
DEFAULT_TEXT.set("computerChoice", TRACKED_ELEMENTS.get("computerChoice").innerText);
DEFAULT_TEXT.set("winner", TRACKED_ELEMENTS.get("winner").innerText);
DEFAULT_TEXT.set("countdown", TRACKED_ELEMENTS.get("countdown").innerText);
DEFAULT_TEXT.set("score", TRACKED_ELEMENTS.get("score").innerText);


//create elements to be inserted later
let finalWinner = document.createElement("p");
finalWinner.setAttribute("id", "finalWinner");
finalWinner.style.fontSize = "48px";

const resetButton = document.createElement("button");
resetButton.setAttribute("id", "reset");
resetButton.innerText = "Reset";
resetButton.style.fontSize = "32px";
resetButton.style.padding = "16px 32px";
resetButton.addEventListener("click", () => resetGame());


//setup button eventlisteners
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.getAttribute("id")));
});


function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3);
  switch (choice) {
    case 0:
      return "Rock";
    case 1:
      return "Paper";
    case 2:
      return "Scissors";
  }
}

function playRound(humanChoice) {
  if (currentRound <= 5) {
    let computerChoice = getComputerChoice();
    TRACKED_ELEMENTS.get("humanChoice").innerText = "You chose: " + humanChoice;
    TRACKED_ELEMENTS.get("computerChoice").innerText = "The Computer chose: " + computerChoice;
    TRACKED_ELEMENTS.get("countdown").innerText = "Round " + currentRound;

    currentRound++;

    switch (humanChoice) {
      case "Rock":
        switch (computerChoice) {
          case "Rock":
            setTieText("tie");
            break;
          case "Paper":
            setLoseText("rock");
            computerScore++;
            break;
          case "Scissors":
            setWinText("rock");
            humanScore++;
            break;
        }
        break;
      case "Paper":
        switch (computerChoice) {
          case "Rock":
            setWinText("paper");
            humanScore++;
            break;
          case "Paper":
            setTieText("tie");
            break;
          case "Scissors":
            setLoseText("paper");
            computerScore++;
            break;
        }
        break;
      case "Scissors":
        switch (computerChoice) {
          case "Rock":
            setLoseText("scissors");
            computerScore++;
            break;
          case "Paper":
            setWinText("scissors");
            humanScore++;
            break;
          case "Scissors":
            setTieText("tie");
            break;
        }
        break;
    }
    TRACKED_ELEMENTS.get("score").innerText = "You: " + humanScore + ", Computer: " + computerScore;
    if(currentRound === 6) {
      if(humanScore > computerScore) {
        finalWinner.innerText = WIN_MESSAGES.get("final");
        finalWinner.style.color = "green";
      } else if (humanScore < computerScore) {
        finalWinner.innerText = LOSE_MESSAGES.get("final");
        finalWinner.style.color = "red";
      } else {
        finalWinner.innerText = TIE_MESSAGES.get("final");
        finalWinner.style.color = "yellow";
      }
      output.appendChild(finalWinner);
      output.appendChild(resetButton);
    }
  }
}

function resetGame() {
  currentRound = 1;
  humanScore = 0;
  computerScore = 0;
  for(key of TRACKED_ELEMENTS.keys()) {
    const elem = TRACKED_ELEMENTS.get(key);
    elem.innerText = DEFAULT_TEXT.get(key);
    elem.style.color = "black";
  }
  output.removeChild(finalWinner);
  output.removeChild(resetButton);
}

function setWinText(choice) {
  const elem = TRACKED_ELEMENTS.get("winner");
  elem.innerText = WIN_MESSAGES.get(choice);
  elem.style.color = "green";
}
function setLoseText(choice) {
  const elem = TRACKED_ELEMENTS.get("winner");
  elem.innerText = LOSE_MESSAGES.get(choice);
  elem.style.color = "red";
}
function setTieText(choice) {
  const elem = TRACKED_ELEMENTS.get("winner");
  elem.innerText = TIE_MESSAGES.get(choice);
  elem.style.color = "yellow";
}