var windWidth = document.documentElement.clientWidth;
var windHeight = document.documentElement.clientHeight;

//Very basic adaptation. Just for the time being.
if (windWidth < dimension + 100) {
	dimension = windWidth - 100;
	while (totalRad > dimension / 2) {
		amountOfCircles--;
		totalRad = amountOfCircles * basicRad;
	}
}