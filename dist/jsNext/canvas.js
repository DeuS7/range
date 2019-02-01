function initField() {
	can.width = dimension;
	can.height = dimension;
	dashStartGameButton.onclick = startGame;
	flyScope();
	//And change settings if needed. 
	//Everything else should be in "Start Game" function;


	shotButton.onclick = function() {
		makeShot(scope.offsetLeft + scopeDimension/2, scope.offsetTop + scopeDimension/2);
	}
	dashTurnOnButton.onclick = turnGameOn;
	dashRefreshButton.onclick = resetGame;
	scope.style.transition = "margin-left " + transitionTime + "s" + cubicBezierX + " , margin-top " + transitionTime + "s" + cubicBezierY;

	document.addEventListener("keydown", function(e) {
		if (e.keyCode == 32 && shotButton.disabled == false) {
			e.preventDefault();
			e.stopPropagation();
			makeShot(scope.offsetLeft + scopeDimension/2, scope.offsetTop + scopeDimension/2);
			return false;
		}
	});
	//otherwise if you push spacebar immidiately after start => pause + short;
	//ugly.
	dashStartGameButton.onfocus = function() {
		dashStartGameButton.blur();
	}
	dashRefreshButton.onfocus = function() {
		dashRefreshButton.blur();
	}
}
function turnGameOn() {
	drawTarget();
	dashTurnOnButton.classList.toggle("activated");
	dashStartGameButton.disabled = false;
	activateInfoBoard();
	createComment("welcome");

	dashTurnOnButton.onclick = turnGameOff;
	//Should depend on difficulty level. Development.
}
function turnGameOff() {
	clearTarget();
	clearShots();
	pauseGame();
	dashTurnOnButton.classList.toggle("activated");
	dashStartGameButton.disabled = true;
	clearInfoBoard();
	createComment("farewell");

	dashTurnOnButton.onclick = turnGameOn;
}

function startGame() {
	mainGameTimerId = setInterval(flyScope, transitionTime*1000 + 50);
	shotButton.disabled = false;
	dashRefreshButton.disabled = false;
	showScope();
	createComment("restr");

	misfireTimerId = setInterval(function() {
		misfireChance = misfireChance - 0.01 < minMisfireChance ? minMisfireChance : misfireChance - 0.01;
		refreshMisfireChanceBoard(misfireChance);
	}, 500);

	dashStartGameButton.innerHTML = '<i class="fa fa-pause"></i>';
	dashStartGameButton.classList.add("skewed");
	dashStartGameButton.onclick = pauseGame;
}
function pauseGame() {
	clearTimeout(mainGameTimerId);
	clearTimeout(misfireTimerId);
	shotButton.disabled = true;
	dashRefreshButton.disabled = true;
	hideScope();
	createComment("pause");

	dashStartGameButton.innerHTML = '<i class="fa fa-play"></i>';
	dashStartGameButton.classList.remove("skewed");
	dashStartGameButton.onclick = startGame;
}
function resetGame() {
	minMisfireChance = basicMisfireChance;
	misfireChance = minMisfireChance;
	canShoot = true;
	shotsInARow = 0;
	lastShotTime = 0;
	currentScore = 0;
	currentShots = 0;

	clearShots();
	refreshShotsBoard(0);
	refreshScoreBoard(0);
	createComment("refr");
}

function makeShot(x,y) {
	if (!canShoot) {
		return;
	}
	if (Math.random() < misfireChance) {
		makeSound("misfire");
		createComment("misfire");
		return;
	}

	var currentTime = performance.now();
	if (currentTime - lastShotTime < 600) {
		shotsInARow++;
	} else {
		shotsInARow = 0;
	}
	if (shotsInARow > maxSaveShots) {
		misfireChance += shotsInARow / 100;
	}
	lastShotTime = currentTime;

	//Randomize hole in small bounds.
	shotHoleDimension = getRandomNum(40, 55);
	var numberOfTheRing = putHole(x, y);
	makeSound("shot");
	makeSound("shell");
	scope.style.animation = "scopeRecoil 0.2s 0.04s";
	canShoot = false;

	setTimeout(function() {
	scope.style.animation = "";
	canShoot = true;
	}, shootingRestriction * 1000);

	//Refresh info condition
	refreshShotsBoard(++currentShots);
	if (currentShots % 5 == 0) {
		minMisfireChance += 0.01;
	}
	currentScore += getScore(numberOfTheRing);
	refreshScoreBoard(currentScore);
	refreshMisfireChanceBoard(misfireChance);
}

function getDistance(x,y) {
	return Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
}

function getShotColor(dist) {
	switch(true) {
		case (dist < basicRad):
			return topShotColor;
		case (dist < totalRad):
			return success;
		default:
			return failure;
	}
}

function drawTarget() {
	for (var i = 1;i<amountOfCircles+1;i++) {
		ctx.beginPath();
		ctx.arc(dimension/2, dimension/2, basicRad*i, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.font = "25px Georgia";
		//Straightforward (No fear)
		ctx.fillText(amountOfCircles*10 - (i-1)*10, 260, dimension / 2 - 10 - basicRad*(i-1));
	}
	ctx.beginPath();
	ctx.moveTo(dimension/2, 0);
	ctx.lineTo(dimension/2, dimension);

	ctx.moveTo(0, dimension/2);
	ctx.lineTo(dimension, dimension/2);
	ctx.stroke();
}
function clearTarget() {
	ctx.beginPath();
	ctx.clearRect(0,0,dimension,dimension);
	ctx.stroke();
}
function showScope() {
	scope.classList.add("elementDisplay");
} 
function hideScope() {
	scope.classList.remove("elementDisplay");
}

function getRandomNum(min, max) {
  	return Math.floor(Math.random() * (max - min) ) + min;
}

function flyScope() {
	var xCoord = getRandomNum(0 + scopeDimension/2, dimension - scopeDimension/2);
	var yCoord = getRandomNum(0 + scopeDimension/2, dimension - scopeDimension/2);

	scope.style.marginLeft = xCoord + "px";
	scope.style.marginTop = yCoord + "px";
}

function getDistToCenter(coord) {
	return coord - dimension/2;
}

//Returns the number of the ring.
function putHole(x,y) {
	var shotHole = document.createElement("div");
	shotHole.className = "shotHole";
	shotHole.style.width = shotHoleDimension + "px";
	shotHole.style.height = shotHoleDimension + "px";
	shotHole.style.top = y - shotHoleDimension/2 + "px";
	shotHole.style.left = x - shotHoleDimension/2 + "px";

	var smoke = document.createElement("div");
	smoke.className = "smoke";
	smoke.style.width = shotHoleDimension + "px";
	smoke.style.height = shotHoleDimension * 1.5 + "px";
	shotHole.append(smoke);

	setTimeout(function() {
		smoke.remove();
	}, 5000);

	canvasWrapper.append(shotHole);

	return getResultOfShot(x,y);
}

function makeSound(soundName, delay, volume) {
	var delay = sounds[soundName][1] || delay || 0;
	var sound = sounds[soundName][0];
	var volume = volume == undefined ? 1 : volume;
 	setTimeout(function() {
 		var audio = new Audio();
  		audio.src = 'audios/' + sound;
  		audio.volume = volume;
 		audio.autoplay = true; 
 	}, delay * 1000)
}

function getResultOfShot(x, y) {
	var dist = getDistance(getDistToCenter(x), getDistToCenter(y));
	var numOfCircle = Math.ceil(dist/basicRad);
	//Eliminate the possibility of num being zero.
	numOfCircle == 0 ? numOfCircle = 1 : numOfCircle;

	return numOfCircle;
}

function getScore(ring) {
	if (ring > amountOfCircles) {
		createComment(`Miss! Lost ${missPenalty} score!`)
		return missPenalty;
	}
	var curScore = (amountOfCircles-ring+1)*10;
	if (curScore == maxScore) {
		makeSound("applause");
		createComment(`Bull's eye! ${curScore} points`);
	} else {
		createComment(`You scored ${curScore}!`);
	}
	return curScore;
}

function refreshMisfireChanceBoard(misfireChance) {
	misfireChanceBoard.style.backgroundSize = misfireChance*100 + "% auto";
	misfireChanceBoard.innerHTML = Math.round(misfireChance*100) + "%";
	switch(true) {
		case (misfireChance > 0.5):
			dashExclMarkElem.style.animation = "redBlink 0.2s infinite alternate";
			break;
		case (misfireChance > 0.35):
			dashExclMarkElem.style.animation = "redBlink 0.5s infinite alternate";
			break;
		case (misfireChance > 0.15):
			dashExclMarkElem.style.animation = "redBlink 1s infinite alternate";
			break;
		default:
			dashExclMarkElem.style.animation = "";
			break;
	}
}
function refreshScoreBoard(score) {
	scoreBoard.innerHTML = score;
}
function refreshShotsBoard(shots) {
	shotsBoard.innerHTML = shots;
}

function clearShots() {
	var shots = canvasWrapper.getElementsByClassName("shotHole");

	while(shots.length != 0) {
		shots[0].remove();
	}
} 

function clearInfoBoard() {
	minMisfireChance = basicMisfireChance;
	misfireChance = minMisfireChance;
	canShoot = true;
	shotsInARow = 0;
	lastShotTime = 0;
	currentScore = 0;
	currentShots = 0;

	refreshMisfireChanceBoard(0);
	misfireChanceBoard.innerHTML = "";
	shotsBoard.innerHTML = "";
	scoreBoard.innerHTML = "";
}

function activateInfoBoard() {
	refreshMisfireChanceBoard(misfireChance);
	refreshShotsBoard(currentShots);
	refreshScoreBoard(currentScore);
}

function createComment(comment, delay) {
	var message;
	var basDelay = 0;
	if (comment in comments) {
		var ar = comments[comment];
		message = ar[0][getRandomNum(0, ar[0].length)];
		basDelay = ar[1] || 0;
	} else {
		message = comment;
	}
	commentBoard.innerHTML = message;

	delay == undefined ? delay = basDelay : delay;
	if (delay != 0) {
		setTimeout(clearCommentBoard, delay * 1000);
	}
}
function clearCommentBoard() {
	commentBoard.innerHTML = "";
}
