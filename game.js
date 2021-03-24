//Variable List
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var playing = false;
var lives;
var playerScore;
var body;
var everytime;
var timeout;

//Runs at when start buttton is clicked, hides the button and sets presets
function startGame() {

	everytime = setInterval(bomb, 500); 
	playing = true;

	if (playing == true) {
		var start = document.getElementById('start');
		start.style.display = 'none';
		lives = 3;
		playerScore = 0;
		collisionLinePosition();
	}
}

//Player Movement Code
function keyup(event) {
	var player = document.getElementById('player');

	if (playing == true) {
		if (event.keyCode == 37) {
			leftPressed = false;
			lastPressed = 'left';
		}
		if (event.keyCode == 39) {
			rightPressed = false;
			lastPressed = 'right';
		}
		if (event.keyCode == 38) {
			upPressed = false;
			lastPressed = 'up';
		}
		if (event.keyCode == 40) {
			downPressed = false;
			lastPressed = 'down';
		}
	}
	player.className = 'character stand ' + lastPressed;
}

function move() {
	if (playing == true) {
		var player = document.getElementById('player');
		var positionLeft = player.offsetLeft;
		var positionTop = player.offsetTop;
		if (downPressed) {
			var newTop = positionTop + 1;

			var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
			if (element.classList.contains('sky') == false) {
				player.style.top = newTop + 'px';
			}

			if (leftPressed == false) {
				if (rightPressed == false) {
					player.className = 'character walk down';
				}
			}
		}
		if (upPressed) {
			var newTop = positionTop - 1;

			var element = document.elementFromPoint(player.offsetLeft, newTop);
			if (element.classList.contains('sky') == false) {
				player.style.top = newTop + 'px';
			}

			if (leftPressed == false) {
				if (rightPressed == false) {
					player.className = 'character walk up';
				}
			}
		}
		if (leftPressed) {
			var newLeft = positionLeft - 1;

			var element = document.elementFromPoint(newLeft, player.offsetTop);
			if (element.classList.contains('sky') == false) {
				player.style.left = newLeft + 'px';
			}
			player.className = 'character walk left';
		}
		if (rightPressed) {
			var newLeft = positionLeft + 1;

			var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
			if (element.classList.contains('sky') == false) {
				player.style.left = newLeft + 'px';
			}
			player.className = 'character walk right';
		}

	}
}

function keydown(event) {
	if (playing == true) {
		if (event.keyCode == 37) {
			leftPressed = true;
		}
		if (event.keyCode == 39) {
			rightPressed = true;
		}
		if (event.keyCode == 38) {
			upPressed = true;
		}
		if (event.keyCode == 40) {
			downPressed = true;
		}
	}
}

function moreBomb() {
	var newBomb = document.createElement('div');
	body.appendChild(newBomb);
	newBomb.classList.add('bomb');
	return newBomb;
}
// command for the bombs
function bomb() {
	var bomb = moreBomb();

	//array to set X Position at the top of the screen
	var xPositionArray = [];
	xPositionArray[0] = '0';
	xPositionArray[1] = '100';
	xPositionArray[2] = '150';
	xPositionArray[3] = '200';
	xPositionArray[4] = '250';
	xPositionArray[5] = '300';
	xPositionArray[6] = '400';
	xPositionArray[7] = '450';
	xPositionArray[8] = '500';
	xPositionArray[9] = '550';
	xPositionArray[10] = '600';
	xPositionArray[11] = '650';
	xPositionArray[12] = '700';
	xPositionArray[13] = '720';
	xPositionArray[14] = '800';
	xPositionArray[15] = '850';
	xPositionArray[16] = '900';
	xPositionArray[17] = '950';
	xPositionArray[18] = '1000';
	xPositionArray[19] = '1050';
	xPositionArray[20] = '1100';
	xPositionArray[21] = '1150';
	xPositionArray[22] = '1200';
	xPositionArray[23] = '1250';
	xPositionArray[24] = '1300';
	xPositionArray[25] = '1350';
	

	var xPosition = Math.ceil(Math.random() * 26);
	bomb.style.left = xPositionArray[xPosition] + 'px';

	//array to set bomb sprite angle
	/*var angleArray = [];
	angleArray[0] = '10';
	angleArray[1] = '20';
	angleArray[2] = '40';
	angleArray[3] = '60';
	angleArray[4] = '80';
	angleArray[5] = '90';
	angleArray[6] = '100';
	angleArray[7] = '110';
	angleArray[8] = '130';
	angleArray[9] = '150';
	angleArray[10] = '170';

	var angle = Math.ceil(Math.random() * 10);
	bomb.style.transform = 'rotate( ' + angleArray[angle] + 'deg)';*/


	//array to set bomb speed
	var bombSpeed = [];
	bombSpeed[0] = '40';
	bombSpeed[1] = '60';
	bombSpeed[2] = '80';
	bombSpeed[3] = '100';
	bombSpeed[4] = '120';
	bombSpeed[5] = '140';

	var speed = Math.ceil(Math.random() * 5);

	var bombTimer = setInterval(function () {
		var collision = false;
		var grassCollision = false;
		//bomb movement down the page
		if (playing == true) {
			var positionTop = bomb.offsetTop;
			bomb.style.top = positionTop + 10 + 'px';
		}
		//position finder and collision detection
		var positionTop = bomb.offsetTop;
		var newTop = positionTop + 0;
		var element = document.elementFromPoint(bomb.offsetLeft, newTop + 32);


		if (element.classList.contains('solid') == true) {
			bomb.style.top = newTop + 'px';
			collision = true;
			clearInterval(bombTimer);
		}

		if (element.classList.contains('grassCollisionLine') == true) {
			bomb.style.top = newTop + 'px';
			grassCollision = true;
			clearInterval(bombTimer);
		}

		if (grassCollision == true) {
			//animation change
			bomb.classList.add('explosion');
			bomb.classList.remove('bomb');
		
			setTimeout(function () {
				bomb.classList.remove('explosion');
				body.removeChild(bomb);
			}, 800); //animation delay

			//score counter 
			playerScore++;
			console.log(playerScore);
			var score = document.getElementById('scoreValue');
			score.innerHTML = playerScore;
			
			//console.log(playerScore); <-- Used for testing
		}
		if (collision == true) {
			//animation change
			bomb.classList.add('explosion2');
			bomb.classList.remove('bomb');
			setTimeout(function () {
				bomb.classList.remove('explosion2');
				body.removeChild(bomb);
			}, 800); //animation delay
			//calls hit to effect player character
			hit();
		}
	}, bombSpeed[speed]);

}
//Runs when the player is hit, called in the bomb code
function hit() {
	//hit animation
	player.classList.add('hit');
	player.classList.remove('stand');

	//life counter

	if (lives == 3) {
		var life1 = document.getElementById('life1');
		life1.style.display = "none";
	} else if (lives == 2) {
		var life2 = document.getElementById('life2');
		life2.style.display = "none";
	} else if (lives == 1) {
		var life3 = document.getElementById('life3');
		life3.style.display = "none";
		gameover();
	}
	lives--;
}


//called from the hit code, runs when lives = 0
function gameover() {
	//dead animation
	player.classList.remove('stand');
	player.classList.add('dead');
	//game over screen
	stop();
	gameoverText();
	submitScore();
	scoreboard();
	resetGame();

}

//stop game function
function stop() {
	clearInterval(timeout);
	clearInterval(everytime);
}

function gameoverText() {
	var gameoverText = document.getElementById('gameover');
	gameoverText.style.display = 'block';
}

function resetGame() {
	setInterval(function(){
	var reset = document.getElementById('reset');
	reset.style.display = 'block';
	}, 1500);
}

function scoreboard() {
	setInterval(function(){
	var scoreboardButton = document.getElementById('scoreBoardButton');
	scoreboardButton.style.display = 'block';
	}, 1500);
}

function resetClicked() {
	window.location.reload();
}

function submitScore() {
	setInterval(function(){
		var gameoverText = document.getElementById('gameover');
		gameoverText.style.display = 'none';

		var scoreForm = document.getElementById('submitScore');
	scoreForm.style.opacity = '1';
	}, 1500);
}

function collisionLinePosition() {
	setInterval(function(){

	var collisionGrassArray = [];
	collisionGrassArray[0] = '80';
	collisionGrassArray[1] = '82';
	collisionGrassArray[2] = '84';
	collisionGrassArray[3] = '86';
	collisionGrassArray[4] = '88';
	collisionGrassArray[5] = '90';
	collisionGrassArray[6] = '92';
	collisionGrassArray[7] = '94';
	collisionGrassArray[8] = '96';
	collisionGrassArray[9] = '98';

	var collisionGrass = Math.ceil(Math.random() * 10);
	var grassLine = document.getElementsByClassName('grassCollisionLine')[0];
	grassLine.style.top = collisionGrassArray[collisionGrass] + 'vh';

	}, 75);
}

//adds events and timers when the page is loaded
function myLoadFunction() {

	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	start.addEventListener('click', startGame);
	reset.addEventListener('click', resetClicked);
	timeout = setInterval(move, 1);

	body = document.getElementsByTagName('body')[0];
}

//calls load when the page opens
document.addEventListener('DOMContentLoaded', myLoadFunction);