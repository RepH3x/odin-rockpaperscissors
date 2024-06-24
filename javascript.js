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

const WIN_MESSAGES = {};
WIN_MESSAGES["rock"] = "You won! Rock smashes scissors!";
WIN_MESSAGES["paper"] = "You won! Paper covers rock!";
WIN_MESSAGES["scissors"] = "You won! Scissors cuts paper!";
WIN_MESSAGES["final"] = "You beat the Computer! Congratulations!"

const LOSE_MESSAGES = {};
LOSE_MESSAGES["rock"] = "You lose! Paper covers rock!";
LOSE_MESSAGES["paper"] = "You lose! Scissors cuts paper!";
LOSE_MESSAGES["scissors"] = "You lose! Rock smashes scissors!";
LOSE_MESSAGES["final"] = "You lost to the Computer! Better luck next time!";

const TIE_MESSAGE = "You tied!";
const TIE_MESSAGE_FINAL = "You tied with the Computer! So close!"

const DEFAULT_TEXT = new Map();
DEFAULT_TEXT.set("humanChoice", TRACKED_ELEMENTS.get("humanChoice").innerText);
DEFAULT_TEXT.set("computerChoice", TRACKED_ELEMENTS.get("computerChoice").innerText);
DEFAULT_TEXT.set("winner", TRACKED_ELEMENTS.get("winner").innerText);
DEFAULT_TEXT.set("countdown", TRACKED_ELEMENTS.get("countdown").innerText);
DEFAULT_TEXT.set("score", TRACKED_ELEMENTS.get("score").innerText);


//create elements to be inserted later
let finalWinner = document.createElement("p");
finalWinner.setAttribute("id", "finalWinner");

const resetButton = document.createElement("button");
resetButton.setAttribute("id", "reset");
resetButton.innerText = "Reset";
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
            TRACKED_ELEMENTS.get("winner").innerText = TIE_MESSAGE;
            break;
          case "Paper":
            TRACKED_ELEMENTS.get("winner").innerText = LOSE_MESSAGES["rock"];
            computerScore++;
            break;
          case "Scissors":
            TRACKED_ELEMENTS.get("winner").innerText = WIN_MESSAGES["rock"];
            humanScore++;
            break;
        }
        break;
      case "Paper":
        switch (computerChoice) {
          case "Rock":
            TRACKED_ELEMENTS.get("winner").innerText = WIN_MESSAGES["paper"];
            humanScore++;
            break;
          case "Paper":
            TRACKED_ELEMENTS.get("winner").innerText = TIE_MESSAGE;
            break;
          case "Scissors":
            TRACKED_ELEMENTS.get("winner").innerText = LOSE_MESSAGES["paper"];
            computerScore++;
            break;
        }
        break;
      case "Scissors":
        switch (computerChoice) {
          case "Rock":
            TRACKED_ELEMENTS.get("winner").innerText = LOSE_MESSAGES["scissors"];
            computerScore++;
            break;
          case "Paper":
            TRACKED_ELEMENTS.get("winner").innerText = WIN_MESSAGES["scissors"];
            humanScore++;
            break;
          case "Scissors":
            TRACKED_ELEMENTS.get("winner").innerText = TIE_MESSAGE;
            break;
        }
        break;
    }
    TRACKED_ELEMENTS.get("score").innerText = "You: " + humanScore + ", Computer: " + computerScore;
    if(currentRound === 6) {
      if(humanScore > computerScore) {
        finalWinner.innerText = WIN_MESSAGES["final"];
      } else if (humanScore < computerScore) {
        finalWinner.innerText = LOSE_MESSAGES["final"];
      } else {
        finalWinner.innerText = TIE_MESSAGE_FINAL;
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
    TRACKED_ELEMENTS.get(key).innerText = DEFAULT_TEXT.get(key);
  }
  output.removeChild(finalWinner);
  output.removeChild(resetButton);
}
