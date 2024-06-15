playGame();

function getComputerChoice () {
  let choice = Math.floor(Math.random() * 3 + 1);
  switch (choice) {
    case 1:
      return "rock";
    case 2:
      return "scissors";
    case 3:
      return "paper";
  }
}

function getHumanChoice () {
  let humanInput = prompt("Enter your choice between rock, paper, or scissors.").toLowerCase();
  switch (humanInput) {
    case "rock":
      return "rock";
    case "scissors":
      return "scissors";
    case "paper":
      return "paper";
    default:
      console.log("Invalid input. Try again.");
      return getHumanChoice();
  }
}

function playGame () {
  let humanScore = 0;
  let computerScore = 0;
  for (let i = 0; i < 5; i++) {
    switch (playRound()) {
      case 0:
        computerScore++;
        break;
      case 1:
        humanScore++;
        break;
    }
   }
    console.log("Human score: " + humanScore);
    console.log("Computer score: " + computerScore);
    if (computerScore > humanScore) {
      console.log("You lose!");
    } else if (computerScore < humanScore) {
      console.log("You won!");
    } else {
      console.log("You tied!");
    }

  function playRound () {
    let computerChoice = getComputerChoice();
    let humanChoice = getHumanChoice();
    switch (humanChoice) {
      case "rock":
        switch (computerChoice) {
          case "rock":
            console.log("You tied!");
            return -1;
          case "paper":
            console.log("You lost! Paper covers rock!");
            return 0;
          case "scissors":
            console.log("You won! Rock smashes scissors!");
            return 1;
        }
      case "paper":
        switch (computerChoice) {
          case "rock":
            console.log("You won! Paper covers rock!");
            return 1;
          case "paper":
            console.log("You tied!");
            return -1;
          case "scissors":
            console.log("You lost! Scissors cuts paper!");
            return 0
        }
      case "scissors":
        switch (computerChoice) {
          case "rock":
            console.log("You lost! Rock smashes scissors!");
            return 0;
          case "paper":
            console.log("You win! Scissors cuts paper!");
            return 1;
          case "scissors":
            console.log("You tied!");
            return -1;
        }
    }
  }
}