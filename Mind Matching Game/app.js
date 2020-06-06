/*
 * Create a list that holds all of your cards
 */
const icons = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', "fa fa-bolt", "fa fa-bolt", "fa fa-bicycle", "fa fa-bicycle", "fa fa-leaf", "fa fa-leaf", "fa fa-cube", "fa fa-cube", "fa fa-bomb", "fa fa-bomb"];
/*
 * To shuffle the cards 
 */
shuffle(icons);
var deck = document.querySelector('.deck');
var openedcards = [];
var matchedcards = [];
var reset = document.querySelector('.restart');
var moves = document.querySelector('.moves');
var count = 0;
var star = document.querySelector('.stars');
/*
 * To initialize the game 
 */
function initgame() {
	for (i = 0; i < icons.length; i++) {
		var card = document.createElement('li');
		card.classList.add('card');
		card.innerHTML = "<i class=\"" + icons[i] + "\"></i>";
		deck.appendChild(card);
		click(card);
	}
}
/*
 * adding EventListener and to show the clicked cards
 */
function click(card) {
	card.addEventListener('click', function() {
		count++;
		rating();
		moves.textContent = count;
		const currentcard = this;
		const previouscard = openedcards[0];
		if (openedcards.length === 1) {
			this.classList.add('open', 'show', 'disable');
			openedcards.push(this);
			compare(currentcard, previouscard);
		} else {
			this.classList.add('open', 'show', 'disable');
			openedcards.push(this);
		}
	});
}
/*
 * To compare the cards 
 */
function compare(currentcard, previouscard) {
	if (currentcard.innerHTML === previouscard.innerHTML) {
		currentcard.classList.add('match', 'shake-horizontal', 'shake-hard');
		previouscard.classList.add('match', 'shake-horizontal', 'shake-hard');
		openedcards = [];
		matchedcards.push(currentcard);
		matchedcards.push(previouscard);
		setTimeout(function() {
			currentcard.classList.remove('shake-horizontal', 'shake-hard');
			previouscard.classList.remove('shake-horizontal', 'shake-hard');
		}, 500);
		gameover();
	} else {
		currentcard.classList.add('wrong', 'shake-vertical', 'shake-hard');
		previouscard.classList.add('wrong', 'shake-vertical', 'shake-hard');
		setTimeout(function() {
			currentcard.classList.remove('show', 'open', 'wrong', 'disable', 'shake-vertical', 'shake-hard');
			previouscard.classList.remove('show', 'open', 'wrong', 'disable', 'shake-vertical', 'shake-hard');
		}, 500);
		openedcards = [];
	}
}
/*
 * To display the result when the game is finished 
 */
var minutes;
var seconds;

function gameover() {
	setTimeout(function() {
		if (icons.length === matchedcards.length) {
			numberofstars();
			display();
			clearInterval(timer);
		}
	}, 400);
}
/*
 * To display the popup message
 */
var popup = document.querySelector('.popup');

function display() {
	minutes = document.querySelector("#minutes").textContent;
	seconds = document.querySelector("#seconds").textContent;
	popup.innerHTML = "<h1 id=\"result\">Congradulations! You Won!</h1><h2>With " + count + " Moves and " + stars + " Stars in " + minutes + " minutes and " + seconds + " seconds .</h2><h3>Woooooo!</h3><a><input class=\'button\' onclick=\"location.href=\'index.html\';\" type=\"submit\" value=\"Play again!\"></input></a>";
	popup.style.display = "block";
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
/*
 * To reset the game 
 */
reset.addEventListener('click', function() {
	deck.innerHTML = "";
	setTimeout(function() {
		initgame();
	}, 200);
	matchedcards = [];
	openedcards = [];
	count = 0;
	moves.textContent = count;
	star.innerHTML = "<li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li>"
	shuffle(icons);
	totalSeconds = 0;
});
/*
 * To rate the game 
 */
var stars = 0;

function rating() {
	if (count >= 20 && count <= 25) {
		star.innerHTML = "<li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li><li><i class=\"far fa-star\"></i></li>";
	} else if (count > 25 && count <= 30) {
		star.innerHTML = "<li><i class=\"fa fa-star\"></i></li><li><i class=\"far fa-star\"></i></li><li><i class=\"far fa-star\"></i></li>";
	} else if (count > 30) {
		star.innerHTML = "<li><i class=\"far fa-star\"></i></li><li><i class=\"far fa-star\"></i></li><li><i class=\"far fa-star\"></i></li>";
	}
}
/*
 * To find number of stars scored
 */
function numberofstars() {
	if (count >= 0 && count < 20) {
		stars = 3;
	} else if (count >= 20 && count <= 25) {
		stars = 2;
	} else if (count > 25 && count <= 30) {
		stars = 1;
	} else if (count > 30) {
		stars = 0;
	}
}
/*
 * Timer function 
 */
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer = setInterval(setTime, 1000);

function setTime() {
	++totalSeconds;
	secondsLabel.innerHTML = pad(totalSeconds % 60);
	minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
	var valString = val + "";
	if (valString.length < 2) {
		return "0" + valString;
	} else {
		return valString;
	}
}
initgame();