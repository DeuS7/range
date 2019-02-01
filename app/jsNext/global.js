//Global Vars

var can = document.getElementById("can");
var ctx = can.getContext("2d");
var shotButton = document.getElementById("shot");
var scope = document.getElementsByClassName("scope")[0];
var canvasWrapper = document.getElementById("canvasWrapper");
var misfireChanceBoard = document.getElementsByClassName("misfireChance")[0];
var dashExclMarkElem = document.getElementsByClassName("dashExclMark")[0];
var dashStartGameButton = document.getElementsByClassName("dashStartGame")[0];
var dashTurnOnButton = document.getElementsByClassName("dashTurnOn")[0];
var dashRefreshButton = document.getElementsByClassName("dashRefresh")[0];
var scoreBoard = document.getElementsByClassName("scoreBoard")[0];
var shotsBoard = document.getElementsByClassName("shotsBoard")[0];
var commentBoard = document.getElementsByClassName("commentBoard")[0];
var preloader = document.getElementById("preloader");


var dimension = 500;
var basicRad = 50;
var amountOfCircles = 4;
var maxScore = amountOfCircles * 10;
var transitionTime = 0.5;
var totalRad = amountOfCircles * basicRad;
var success = "yellow";
var failure = "red";
var topShotColor = "green";

var scopeDimension = 50;
var bulletRadius = 5;
var shotHoleDimension = 45;
var correction = scopeDimension/2 - bulletRadius/2;
var shootingRestriction = 0.35;
var basicMisfireChance = 0.05;
var missPenalty = -20;

var minMisfireChance = basicMisfireChance;
var misfireChance = minMisfireChance;
var mainGameTimerId;
var misfireTimerId;
var canShoot = true;
var shotsInARow = 0;
var lastShotTime = 0;
//Depend on dif. level.
var maxSaveShots = 3;
var currentScore = 0;
var currentShots = 0;

//var cubicBezierX = " cubic-bezier(0.5,0.5,0.5,0.8)";
//var cubicBezierY = " cubic-bezier(0.5,0.5,0.5,0.2)";
var cubicBezierX = "";
var cubicBezierY = "";
//Name of file, Delay in seconds.
var sounds = {
	shot: ["sniperRifle.mp3"],
	shell: ["empty-bullet-shell-fall-01.mp3", 1],
	applause: ["shortPoliteApplause.wav"],
	misfire: ["cocking.wav"]
}

var comments = {
	welcome: [["Hi, my dear God!"]],
	pause: [["Game is paused"]],
	farewell: [["Get by!", "A'm not angry. I swear.", "Go away!"], 1],
	hint: [["press space to shoot"]],
	misfire: [["Misfire!"], 2],
	refr: [["The game is refreshed"]],
	restr: [["The game is on!"]],
	quick: [["you shoot too fast"]]
}