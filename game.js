/*Quick Navigation 
Line 17 - Global Variables
Line 31 - Bomb Frequency Array
Line 46 - Start Game Function
Line 65 - Player Movement Code, Sky and Explosion Radius Collision
Line 225 - Creating Bomb Code (and arrays)
Line 273 - Collision Code
Line 354 - Hit Code
Line 378 - Game Over Code
Line 419 - Score Board Code
Line 459 - Collision Line Array
Line 485 - Local Storage Code
Line 539 - Page Load Function
*/


//Global Variable List
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

//controls the frequency the bombs spawn at the top of the screen
function bombFrequence() {
	var bombFrequencyArray = [];
		bombFrequencyArray[0] = '200';
		bombFrequencyArray[1] = '600';
		bombFrequencyArray[2] = '1000';
		bombFrequencyArray[3] = '1400';
		bombFrequencyArray[4] = '2000';
		bombFrequencyArray[5] = '2200';
		bombFrequencyArray[6] = '2400';
	
		var frequency = Math.ceil(Math.random() * 500);

		setTimeout(bomb, bombFrequencyArray[frequency]);
}

//Runs when start buttton is clicked
function startGame() {
	
	everytime = setInterval(bombFrequence, 500); //used to adjust bomb frequency drops 

	 //set the timers to true to start game, intially false so game does not start before player is ready
	playing = true;

	if (playing == true) {
		//hides the start button, resets score and resets player lives to 3 
		var start = document.getElementById('start');
		start.style.display = 'none';
		lives = 3; 
		playerScore = 0;

		//console.log("lives " + lives); 	// <-- Used for testing game load
		//playerScore = 10; //<--Used for testing score box
		//playerScore = 100; //<--Used for testing score box
		//console.log("score " + playerScore); // <-- Used for testing game load

		//<--used for testing end screen, allows quick death to get gameover screen
		//lives = 1 ;
		
		//starts the bottom collision line movement
		collisionLinePosition();
		store();
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
//Explosion Radius Collision and Invulnerable code added by student
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

			//if player overlaps with the explosion on the grass then the player takes damage and loses a life
			if (element.classList.contains('explosion') == true) {
				hit();
				//after being hit the player is set to invulnerable, this stops them being hit repeatedly by the same explosion
				//after a time delay this is removed so that the player can be hit again
				//when invulnerable is true the players position is pushed back away from the explosion by a pixel which stops them from overlapping
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
			//if player overlaps with the explosion on the grass then the player takes damage and loses a life
			if (element.classList.contains('explosion') == true) {
				hit();
				//after being hit the player is set to invulnerable, this stops them being hit repeatedly by the same explosion
				//after a time delay this is removed so that the player can be hit again
				//when invulnerable is true the players position is pushed back away from the explosion by a pixel which stops them from overlapping
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

			//if player overlaps with the explosion on the grass then the player takes damage and loses a life
			if (element.classList.contains('explosion') == true) {
				hit();
				//after being hit the player is set to invulnerable, this stops them being hit repeatedly by the same explosion
				//after a time delay this is removed so that the player can be hit again
				//when invulnerable is true the players position is pushed back away from the explosion by a pixel which stops them from overlapping
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

			//if player overlaps with explosion on the grass then the player takes damage and loses a life
			if (element.classList.contains('explosion') == true) {
				hit();
				//after being hit the player is set to invulnerable, this stops them being hit repeatedly by the same explosion
				//after a time delay this is removed so that the player can be hit again
				//when invulnerable is true the players position is pushed back away from the explosion by a pixel which stops them from overlapping
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
	//calls to create a new bomb
	var bomb = moreBomb();

	//used to set the random X position at the top of the screen of the bombs when they spawn
	bomb.style.left = Math.ceil(Math.random() * window.innerWidth) + "px"

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

		
		//Bomb colliding with the player
		if (element.classList.contains('solid') == true) {
			bomb.style.top = newTop + 'px';
			collision = true;
			clearInterval(bombTimer);
		}

		//Bombs collide with the moving collision line then they explode (allows for multiple explosion points on the grass)
		if (element.classList.contains('grassCollisionLine') == true) {
			bomb.style.top = newTop + 'px';
			grassCollision = true;
			clearInterval(bombTimer);
		}

		//Bombs collide with bottom line then explode  (fail safe for elements being off screen)
		if (element.classList.contains('bottomCollisionLine') == true) {
			grassCollision = true;
			clearInterval(bombTimer);
		}

		//when hitting the grass the bombs explode, explosion replaces bomb and then the bomb element is removed entirely
		if (grassCollision == true ) {
			//animation change
			bomb.classList.add('explosion');
			bomb.classList.remove('bomb');

			setTimeout(function () {
				bomb.classList.remove('explosion');
				body.removeChild(bomb);
			}, 1200); //amount of time the explosion remains on screen. Can make slower to test collision with explosion

			//score counter 
			//when a bomb explodes the player score goes up by 1
			playerScore++;

			//console.log(playerScore); // <-- Used for testing score 
			var score = document.getElementById('scoreValue');

			//used to add the updated score value to the html
			score.innerHTML = playerScore;

			//console.log(playerScore); <-- Used for testing that the code increments before adding to display
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
	//removes a players life icon when lives are decreased
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
	//after hit the life counter decrements, this effects the if and else ifs above
	lives--;
	console.log(lives); //<--Used for testing
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
// Source -- Nikhil Agrawal (n.d)
function resetClicked() {
	window.location.reload();
}

//shows view scoreboard button after a time delay (syncs with score board button/form) 
function scoreboardButton() {
	setInterval(function() {
		var scoreBoardButton = document.getElementById('scoreBoardButton');
		scoreBoardButton.style.display = 'block';
	}, 1500);
}

//when the highscore button is clicked the scoreboard is displayed over the top of the other buttons. 
//a go back button is displayed underneath the scoreboard. This takes the player back to the gameover screen
function scoreClicked() {
	var scoreboard = document.getElementById('scoreBoard');
	scoreboard.style.display = 'block';

	var goBackButton = document.getElementById('goBackButton');
	goBackButton.style.display = 'block';
}

//when the scoreboard go back button is clicked the scoreboard and go back button is hidden so the other buttons can be used by the player
function goBackClicked() {
	var scoreboard = document.getElementById('scoreBoard');
	scoreboard.style.display = 'none';

	var goBackButton = document.getElementById('goBackButton');
	goBackButton.style.display = 'none';
}	


//after the game over message has been displayed it is removed after a time delay and the submit score form is displayed instead
//this is to allow messages to be displayed and seen clearly
function submitScore() {
	setInterval(function () {
		var gameoverText = document.getElementById('gameover');
		gameoverText.style.display = 'none';

		var scoreForm = document.getElementById('submitScore');
		scoreForm.style.opacity = '1';
	}, 1500);
}

//array for the random bomb collision on the grass
//sets the view height positions for the collision bar
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
	//time delay can be adjusted to make the bar slower or faster. 
	//(please note making slower or faster can result in more bombs passing the bottom of the screen and can effect browser performance)
}

//local storage used to score highscores
//store is called by the html form. Used as the forms action
//Resources -- Ethan (2020), Go Make Things (2018), James Q Quick (2019), Michael Karén (2021), Tania Rascia (2017) 

function store() {
  var highScores = [];
	//gets previous score from the game or starts the game with an empty array in local storage
  if (localStorage.getItem('highscore')) {
    highScores= localStorage.getItem('highscore');
  } else {
    highScores = [];
  }    
  console.log(highScores);

  //creates a record in the array that stores the player name retrieved from the form and the player score from the game session
  var PlayerScore = {
      Name: playerName.value,
      Score: playerScore 
      };
	
	//pushes the record to the local storage
    highScores.push(PlayerScore);
	
	//sorts multiple scores highest to lowest
    highScores.sort(function(a,b){
        return a.score - b.score;
    });
  var scores= JSON.stringify(highScores);
  localStorage.setItem("highscores", scores);
  console.log(highScores);
}

//function to display the code on the games highscores table
function get() {

	var highScores = [];

		if (localStorage.getItem('highScores')) {
 			 highScores = JSON.parse(localStorage.getItem('highScores'));
		} else {
  			highScores = [];
		}
	
	//Unfinished code for displaying, does not work, ran out of time to implement
	for(var i=0; i < highScores.length; i++){
			
			var name = highScores[i].Name;
			var score = highScores[i].Score;
			console.log(name, score);
			
	}
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