let createAndAppend = function({className, parentElement, value}, tag='div') {
	let element = document.createElement(tag);
	element.className = className;
	if (value) {
		element.innerHTML = value;
	}

	if (parentElement) {
		parentElement.appendChild(element);
	}

	return element;
}

let getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Touch helper
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
	xDown = evt.touches[0].clientX;
	yDown = evt.touches[0].clientY;
};

let senstivity = 25;
function handleTouchMove(evt) {
	if (! xDown || ! yDown) {
		return;
	}

	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;

	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;

	if (Math.abs(xDiff) < senstivity &&  Math.abs(yDiff) < senstivity) {
		return;
	}

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			callSwipeActions('left');
		} else {
			callSwipeActions('right');
		}
	} else {
		if (yDiff > 0) {
			callSwipeActions('up');
		} else { 
			callSwipeActions('down');
		}
	}

	xDown = null;
	yDown = null;
};

let swipeActions = {
	'left': [],
	'right': [],
	'up': [],
	'down': []
}

let callSwipeActions = function(direction) {
	for (let func of swipeActions[direction]) {
		func();
	}
}

let onSwipe = function(direction, callback) {
	swipeActions[direction].push(callback);
}
// end of touch helper


let fieldSize = parseInt(window.prompt('Field size?', 4), 10);

var game = new Game(document.body, fieldSize || 4);