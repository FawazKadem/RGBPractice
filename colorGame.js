//Global vars
var numSquares = 6;
var colors = [];
var pickedColor;

//Selectors
var squares = document.querySelectorAll(".square");
var pickedColorDisplay = document.querySelector("#pickedColorDisplay");
var message = document.querySelector("#message");
var header = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();


function init(){
	//mode buttons event listeners
	initModeButtons();

	//square event listners
	initSquares();

	//reset button listener
	resetButton.addEventListener("click", reset);
	reset();
}



function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	pickedColorDisplay.textContent = pickedColor;
	header.style.backgroundColor = "steelblue";
	message.textContent = "";
	resetButton.textContent = "New Colors";

	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}

	}
}	

function initModeButtons() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
		//unmark all other modes, mark clicked one as selected
		for(var i = 0; i < modeButtons.length; i++) {
			modeButtons[i].classList.remove("selected");
		}
		this.classList.add("selected");
		numSquares = (this.textContent === "EASY") ? 3 : 6;
		reset();
		});
	}
}

function initSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			var selectedColor = this.style.backgroundColor;
			if (selectedColor === pickedColor) {
				message.textContent = "You won!";
				resetButton.textContent = "Play again";
				changeAllSquaresToColor(pickedColor);
				header.style.backgroundColor = pickedColor;
			}
			else {
				this.style.backgroundColor = "#232323";
				message.textContent = "Try again";
			}
		});
	}
}

function changeAllSquaresToColor(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var randColorIdx = Math.floor(Math.random() * colors.length);
	return colors[randColorIdx];
}

function generateRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}


function randomColor() {
	var redAmount = Math.floor(Math.random() * 256);
	var greenAmount = Math.floor(Math.random() * 256);
	var blueAmount = Math.floor(Math.random() * 256);

	return "rgb(" + redAmount + ", " + greenAmount + ", " + blueAmount + ")";
}