//reloads window when the button is clicked
function resetClicked() {
	window.location.reload();
}

function scoreboardButton() {
	setInterval(function () {
		var scoreBoardButton = document.getElementById('scoreBoardButton');
		scoreBoardButton.style.display = 'block';
	}, 1500);
}
//shows view scoreboard button after a time delay (syncs with score board button/form) 
function scoreClicked() {
	scoreBoardButton.style.display = 'none';
}

//adds events and timers when the page is loaded
function myLoadFunction() {
	reset.addEventListener('click',resetClicked);
	scoreBoardButton.addEventListener('click',scoreClicked);
	body = document.getElementsByTagName('body')[0];
}

//calls load when the page opens
document.addEventListener('DOMContentLoaded', myLoadFunction);