var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var playing = false;
var lives = 0;
var bombCount = 0;
var collision = false;

function startGame() {
	playing = true;
	
	if (playing == true) {
		var start = document.getElementById('start');
		start.style.display = 'none';
		lives = 3;
	}

}

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

function hit() {
	player.classList.add('hit');
	player.classList.remove('stand');	
	lives = lives--;

	if(lives = 2) {
	var life1 = document.getElementById('life1');
	life1.style.display = "none";		
	}

	if(lives = 1) {
	var life2 = document.getElementById('life2');	
	life2.style.display = "none";	
	}

	if(lives = 0); {
	var life3 = document.getElementById('life3');
	life3.style.display = "none";
	gameover();	
	}
	
}

function gameover(){
	player.classList.add('dead');
	player.classList.remove('stand');
}

function bomb() {
	var bomb = document.getElementById('bomb');
    
	if (playing == true) {
		var positionTop = bomb.offsetTop;
		bomb.style.top = positionTop + 10 + 'px';
	}
	var positionTop = bomb.offsetTop;	
	var newTop = positionTop + 1;
    var element = document.elementFromPoint(bomb.offsetLeft, newTop+32);
        
		
	if (element.classList.contains('solid') == true) {
			bomb.style.top = newTop + 'px';
			collision = true;
		}

	if (collision == true){
	bomb.classList.add('explosion');
    bomb.classList.remove('bomb');
	hit();

	}


		//var xPositionArray = [];
		//xPositionArray[1] = '0';
		//xPositionArray[2] = '200';
		//xPositionArray[3] = '400';
		//xPositionArray[4] = '600';
		//xPositionArray[5] = '800';
		//xPositionArray[6] = '1000';
		//xPositionArray[7] = '1200';
		//xPositionArray[8] = '1400';
		//xPositionArray[9] = '1600';
		//xPositionArray[10] = '2000';


		//var xPosition = Math.ceil(Math.random() * 10);
		//bomb.style.left = xPositionArray[xPosition] + 'px';
		//bombCount ++;
	}


function move() {
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


function keydown(event) {
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


function myLoadFunction() {
	
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	start.addEventListener('click', startGame);
	timeout = setInterval(move, 10);
	bombTimer = setInterval(bomb,50);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);