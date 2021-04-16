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
var invulnerable = false;

//Runs when start buttton is clicked, hides the button and sets presets
function startGame() {

	//array to set bomb frequency
		var bombFrequencyArray = [];
		bombFrequencyArray[0] = '600';
		bombFrequencyArray[1] = '800';
		bombFrequencyArray[2] = '1000';
		bombFrequencyArray[3] = '1200';
		bombFrequencyArray[4] = '1400';
		bombFrequencyArray[5] = '1600';
		bombFrequencyArray[6] = '2000';
	
		var frequency = Math.ceil(Math.random() * 6);

	everytime = setInterval(bomb, bombFrequencyArray[frequency]); //adjusts bomb frequency drops 
	playing = true; //used to set the timers to true so game does not start before player is ready

	if (playing == true) {
		var start = document.getElementById('start');
		start.style.display = 'none';
		lives = 3; 
		//lives = 1 ; //<--used for testing end screen
		playerScore = 0;
		collisionLinePosition();
	}
}


//Player Movement Code (key releases)-- Thomas Butler (2021)
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
//Player Movement Code and Sky Collision-- Thomas Butler (2021)
function move() {
	if (playing == true) {
		var player = document.getElementById('player');
		var positionLeft = player.offsetLeft;
		var positionTop = player.offsetTop;

		if (downPressed) {
			if (downPressed && !invulnerable) {
			var newTop = positionTop + 1;

			var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
			if (element.classList.contains('sky') == false) {
				player.style.top = newTop + 'px';
			}
			if (element.classList.contains('explosion') == true) {
				hit();
				invulnerable = true;
				setTimeout(function() { invulnerable = false;}, 1500);
			}

			if (leftPressed == false) {
				if (rightPressed == false) {
					player.className = 'character walk down';
				}
			}
		}
	}
		if (upPressed) {
			if (upPressed && !invulnerable) {
			var newTop = positionTop - 1;

			var element = document.elementFromPoint(player.offsetLeft, newTop);
			if (element.classList.contains('sky') == false) {
				player.style.top = newTop + 'px';
			}

			if (element.classList.contains('explosion') == true) {
				hit();
				invulnerable = true;
				setTimeout(function() { invulnerable = false;}, 1500);
			}

			if (leftPressed == false) {
				if (rightPressed == false) {
					player.className = 'character walk up';
				}
			}
		}
	}
		if (leftPressed) {
			if (leftPressed && !invulnerable) {
				var newLeft = positionLeft - 1;

			var element = document.elementFromPoint(newLeft, player.offsetTop);
			if (element.classList.contains('sky') == false) {
				player.style.left = newLeft + 'px';
			}

			if (element.classList.contains('explosion') == true) {
				hit();
				invulnerable = true;
				setTimeout(function() { invulnerable = false;}, 1500);
			}

			player.className = 'character walk left';
		}
	}

		if (rightPressed) {
			if (rightPressed && !invulnerable) {
			var newLeft = positionLeft + 1;

			var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
			if (element.classList.contains('sky') == false) {
				player.style.left = newLeft + 'px';
			}

			if (element.classList.contains('explosion') == true) {
				hit();
				invulnerable = true;
				setTimeout(function() { invulnerable = false;}, 1500);
			}
			player.className = 'character walk right';
		}
	}
}
}

//Player Movement Code (key presses)-- Thomas Butler (2021)
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

//moreBomb creates a new HTML element which is then turned into a bomb
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

	//array to set bomb sprite angle (commented out due to not being able to get angle movement)

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
	bombSpeed[1] = '80';
	bombSpeed[2] = '100';
	bombSpeed[3] = '150';
	bombSpeed[4] = '200';
	bombSpeed[5] = '250';
	bombSpeed[6] = '300';

	var speed = Math.ceil(Math.random() * 6);


	//Collision Detection Code 

	var bombTimer = setInterval(function () {

		//Sets to false to reset collision at the beginning of the objects creation/ game start
		var collision = false;
		var grassCollision = false;


		//bomb movement down the page
		if (playing == true) {
			var positionTop = bomb.offsetTop;
			bomb.style.top = positionTop + 10 + 'px';
		}
		// Bomb position finder
		var positionTop = bomb.offsetTop;
		var newTop = positionTop + 0;
		var element = document.elementFromPoint(bomb.offsetLeft, newTop + 32);

		//solid marks collision with player
		//collision onto the player
		if (element.classList.contains('solid') == true) {
			bomb.style.top = newTop + 'px';
			collision = true;
			clearInterval(bombTimer);
		}

		//Bombs collide with the collision line then they explode (used to set random explosion line)
		//colliion onto bomb
		if (element.classList.contains('grassCollisionLine') == true) {
			bomb.style.top = newTop + 'px';
			grassCollision = true;
			clearInterval(bombTimer);
		}

		//Bombs collide with bottom line then explode  (fail safe for elements being off screen and reducing latency issues)
		//collsion onto bomb
		if (element.classList.contains('bottomCollisionLine') == true) {
			grassCollision = true;
			clearInterval(bombTimer);
		}

		//when hitting the grass the bombs explode. bomb is removed, explosion replaces and then the bomb is removed entirely
		if (grassCollision == true ) {
			//animation change
			bomb.classList.add('explosion');
			bomb.classList.remove('bomb');

			setTimeout(function () {
				bomb.classList.remove('explosion');
				body.removeChild(bomb);
			}, 1000); //amount of time the explosion remains on screen <-- make slower

			//score counter 
			//when a bomb explodes the player score goes up by 1
			playerScore++;
			var score = document.getElementById('scoreValue');
			score.innerHTML = playerScore;

			//console.log(playerScore); <-- Used for testing
		}

		//when a bomb hits the player explosion 2 is added and bomb is removed 
		if (collision == true) {
			//animation change
			bomb.classList.add('explosion2');
			bomb.classList.remove('bomb');
			setTimeout(function () {
				bomb.classList.remove('explosion2');
				body.removeChild(bomb);
			}, 800); //animation timer for the explosion that hits the player

			//calls hit to effect player character
			hit();
		}
	}, bombSpeed[speed]); //Call to Array that randomises the speed the bombs fall at

}

//Runs when the player is hit, called in the bomb code
function hit() {
	//hit animation
	player.classList.add('hit');

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
	//1 life removed when hit is called
	lives--;
}


//called from the hit code, runs when lives = 0
function gameover() {
	//dead animation
	player.classList.add('dead');

	//cancels timers to stop the game 
	stop();

	//text, buttons and score form for end game screen
	gameoverText();
	submitScore();
	scoreboardButton();
	resetGame();

}

//stop game function
function stop() {
	clearInterval(timeout);
	clearInterval(everytime);
}

//shows gameover text after game ends
function gameoverText() {
	var gameoverText = document.getElementById('gameover');
	gameoverText.style.display = 'block';
}

//shows reset button after a delay (syncs with score board button/form)
function resetGame() {
	setInterval(function() {
		var reset = document.getElementById('reset');
		reset.style.display = 'block';
	}, 1500);
}

//reloads window when the button is clicked
function resetClicked() {
	window.location.reload();
}

//shows view scoreboard button after a time delay (syncs with score board button/form) 
//Can merge with above function to neaten up 
function scoreboardButton() {
	setInterval(function() {
		var scoreBoardButton = document.getElementById('scoreBoardButton');
		scoreBoardButton.style.display = 'block';
	}, 1500);
}

function scoreClicked() {
	var scoreboard = document.getElementById('scoreBoard');
	scoreboard.style.display = 'block';

	var goBackButton = document.getElementById('goBackButton');
	goBackButton.style.display = 'block';
}

function goBackClicked() {
	var scoreboard = document.getElementById('scoreBoard');
	scoreboard.style.display = 'none';

	var goBackButton = document.getElementById('goBackButton');
	goBackButton.style.display = 'none';
}	


//after the game over message has been displayed it is removed and the submit score form is displayed instead
function submitScore() {
	setInterval(function () {
		var gameoverText = document.getElementById('gameover');
		gameoverText.style.display = 'none';

		var scoreForm = document.getElementById('submitScore');
		scoreForm.style.opacity = '1';
	}, 1500);
}

//array for the rando bomb collision on the grass
function collisionLinePosition() {
	setInterval(function () {

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
function store() {

	var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
	var PlayerScore = {
		Score: playerScore ,
		name: playerName.value
		};
		highScores.push(PlayerScore);
		console.log(highScores);

var userString = JSON.stringify(PlayerScore);

localStorage.setItem('PlayerScore', userString);

var userStringFromLocalStorage = localStorage.getItem('PlayerScore');

var userFromLocalStorage = JSON.parse(userStringFromLocalStorage);

console.log(userStringFromLocalStorage);

}

//adds events and timers when the page is loaded
function myLoadFunction() {

	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	start.addEventListener('click', startGame);
	reset.addEventListener('click', resetClicked);
	scoreBoardButton.addEventListener('click',scoreClicked);
	goBackButton.addEventListener('click',goBackClicked);
	timeout = setInterval(move, 1);

	body = document.getElementsByTagName('body')[0];
}

//calls load when the page opens
document.addEventListener('DOMContentLoaded', myLoadFunction);