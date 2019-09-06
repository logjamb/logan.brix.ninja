const state = {
	youScore: 0,
	computerScore: 0,
	youPick: null,
	computerPick: null,
	win: null,
};

const $youScore = document.querySelector("#youScore");
const $computerScore = document.querySelector("#computerScore");
const $pickSelection = document.querySelector("#pickSelection");
const $rock = document.querySelector("#rock");
const $paper = document.querySelector("#paper");
const $scissors = document.querySelector("#scissors");
const $dialog = document.querySelector("#dialog");
const $computerPick = document.querySelector("#computerPick");
const $winLose = document.querySelector("#winLose");

$rock.addEventListener("click", () => {
	pickHand("rock");
}, {passive: true});

$paper.addEventListener("click", () => {
	pickHand("paper");
}, {passive: true});

$scissors.addEventListener("click", () => {
	pickHand("scissors");
}, {passive: true});

$dialog.addEventListener("click", () => {
	$dialog.classList.add("hide");
}, {passive: true});

function pickHand(hand) {
	state.youPick = hand;
	state.computerPick = randomPick();

	computeScores();
	showDialog();
	updateScores();
}

function randomPick() {
	const choices = [
		"rock",
		"paper",
		"scissors",
	];

	return choices[Math.floor(Math.random() * choices.length)];
}

function computeScores() {
	if (state.youPick === state.computerPick) {
		youTie();
	} else if (state.youPick === "rock" && state.computerPick === "paper") {
		youLose();
	} else if (state.youPick === "rock" && state.computerPick === "scissors") {
		youWin();
	} else if (state.youPick === "paper" && state.computerPick === "rock") {
		youWin();
	} else if (state.youPick === "paper" && state.computerPick === "scissors") {
		youLose();
	} else if (state.youPick === "scissors" && state.computerPick === "rock") {
		youLose();
	} else if (state.youPick === "scissors" && state.computerPick === "paper") {
		youWin();
	}
}

function youTie() {
	state.win = null;
}

function youWin() {
	state.youScore++;
	state.win = true;
}

function youLose() {
	state.computerScore++;
	state.win = false;
}

function showDialog() {
	$computerPick.src = "./images/" + state.computerPick + ".png";
	if (state.win === null) {
		$winLose.textContent = "You Tie";
	} else if (state.win) {
		$winLose.textContent = "You Win";
	} else {
		$winLose.textContent = "You Lose";
	}
	$dialog.classList.remove("hide");
}

function updateScores() {
	$youScore.textContent = state.youScore;
	$computerScore.textContent = state.computerScore;

	if (state.youScore === state.computerScore) {
		$pickSelection.textContent = "You are tied at " + state.youScore;
	} else if (state.youScore > state.computerScore) {
		$pickSelection.textContent = "You are winning by " + (state.youScore - state.computerScore);
	} else {
		$pickSelection.textContent = "You are losing by " + (state.computerScore - state.youScore);
	}
}
