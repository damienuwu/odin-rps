
const optionButtons = document.querySelectorAll('.btn');
const humanScoreElement = document.querySelector('.player-score');
const computerScoreElement = document.querySelector('.computer-score');
const message = document.querySelector('.message p');
const resetButton = document.getElementById('reset-btn');

const choices = ['rock', 'paper', 'scissors'];
let humanScore = 0, computerScore = 0, roundsPlayed = 0;
const maxRounds = 5;

function getComputerChoice() {
    let randomNum = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomNum];

    return computerChoice;
}

// function getHumanChoice() {
//     const humanChoice = window.prompt("Your option");
//     return humanChoice.toLowerCase();
// }

function playRound(humanChoice , computerChoice) {
    const outcomes = {
        rock: { rock: "It's a tie", paper: "You lose", scissors: "You win" },
        paper: { rock: "You win", paper: "It's a tie", scissors: "You lose" },
        scissors: { rock: "You lose", paper: "You win", scissors: "It's a tie" }
    };

    const result = outcomes[humanChoice][computerChoice];

    if (result === "You win") {
        humanScore++;
    } else if (result === "You lose") {
        computerScore++;
    }

    message.textContent = `Human: ${humanChoice}, Computer: ${computerChoice}. ${result}`;
    updateScore();
    roundsPlayed++;

    if (roundsPlayed >= maxRounds) {
        endGame();
    }
}

function updateScore() {
    humanScoreElement.textContent  = humanScore;
    computerScoreElement.textContent  = computerScore;
}

function endGame() {
    let winner; 
    if (humanScore > computerScore) {
        winner = "Human won thge game !";
    } else if (computerScore > humanScore) {
        winner = "Computer won the game !";
    } else {
        winner = "The game is a tie";
    }

    message.textContent = `${winner} Final Score - Human: ${humanScore}, Computer: ${computerScore}`;
    message.classList.add('winner-message');
    
    optionButtons.forEach(button => {
        button.disabled = true;
    });
}

optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const humanChoice = button.textContent.toLowerCase(); // Get the player's choice from the button text
        const computerChoice = getComputerChoice();
        playRound(humanChoice, computerChoice);
    });
});

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    roundsPlayed = 0;

    updateScore();
    message.textContent = "Game reset. Start a new game!";
    message.classList.remove('winner-message'); // Remove the winner message class

    // Enable all buttons
    optionButtons.forEach(button => {
        button.disabled = false;
    });
}

resetButton.addEventListener('click', resetGame);