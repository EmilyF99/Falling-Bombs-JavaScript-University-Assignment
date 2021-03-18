//Variable List
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var playing = false;
var lives;
var playerScore;
var collision = false;


//Runs at when start buttton is clicked, hides the button and sets presets
function startGame() {
	playing = true;
	
	if (playing == true) {
		var start = document.getElementById('start');
		start.style.display = 'none';
		lives = 3;
		score = 0;
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
		var newTop = positionTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
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
		var newTop = positionTop-1;

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
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}
		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
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
// command for the bombs
function bomb() {
	var bomb = document.getElementsByClassName('bomb')[0];
	
	//array to set X Position at the top of the screen
	var xPositionArray = [];
		xPositionArray[0] = '0';
		xPositionArray[1] = '200';
		xPositionArray[2] = '400';
		xPositionArray[3] = '600';
		xPositionArray[4] = '800';
		xPositionArray[5] = '1000';
		xPositionArray[6] = '1200';
		xPositionArray[7] = '1400';
		xPositionArray[8] = '1600';
		xPositionArray[9] = '2000';
		xPositionArray[10] = '2000';

		
		var xPosition = Math.ceil(Math.random() * 10);
		bomb.style.left = xPositionArray[xPosition] + 'px'; 

		bombTimer = setInterval(function() {
		
			//bomb movement down the page
			if (playing == true) {
			var positionTop = bomb.offsetTop;
			bomb.style.top = positionTop + 10 + 'px';
			}
			//position finder and collision detection
		var positionTop = bomb.offsetTop;	
		var newTop = positionTop + 0;
    	var element = document.elementFromPoint(bomb.offsetLeft, newTop+32);
        
		
	if (element.classList.contains('solid') == true) {
			bomb.style.top = newTop + 'px';
			collision = true;
			clearInterval(bombTimer);
		}

	if (collision == true){
	//animation change
	bomb.classList.add('explosion');
    bomb.classList.remove('bomb');
	setTimeout(function(){
	bomb.classList.remove('explosion');
	},800);
	//calls hit to effect player character
	hit();
	}
		}, 50);
}
//Runs when the player is hit, called in the bomb code
function hit() {
	//hit animation
	player.classList.add('hit');
	player.classList.remove('stand');	

	//life counter
	
	if(lives == 3) {
	var life1 = document.getElementById('life1');
	life1.style.display = "none";	
	}

	else if(lives == 2) {
	var life2 = document.getElementById('life2');	
	life2.style.display = "none";	
	}

	else if(lives == 1) {
	var life3 = document.getElementById('life3');
	life3.style.display = "none";
	gameover();
	}
	lives--;
}


//called from the hit code, runs when lives = 0
function gameover(){
	//dead animation
	player.classList.remove('stand');
	player.classList.add('dead');
	//game over screen
	stop();
	gameoverText();
	resetGame();
	
}

//stop game function
function stop() {
	clearInterval(timeout);
	clearInterval(bombTimer);
}


function gameoverText() {
	var gameoverText = document.getElementById('gameover');
	gameoverText.style.display = 'block';
}

function resetGame() {
	var reset = document.getElementById('reset');
	reset.style.display = 'block';
}

function resetClicked() {
	window.location.reload();
}

//adds events and timers when the page is loaded
function myLoadFunction() {
	
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	start.addEventListener('click', startGame);
	reset.addEventListener('click', resetClicked);
	timeout = setInterval(move, 1);
	//bombTimer = setInterval(bomb,50);
	bomb();
}

//calls load when the page opens
document.addEventListener('DOMContentLoaded', myLoadFunction);