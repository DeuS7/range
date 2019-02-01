var elements = document.getElementsByClassName("sliderItem");
var totalElements = elements.length;
var elementWidth = elements[0].clientWidth;
var numberOfElements = 4;
var currentPosition = 0;
var dots = document.getElementsByClassName("dot");
var isSlided = false;

(function() {
	var dotsBlock = document.getElementsByClassName("picturesDots")[0];
	for (var i = 0;i<totalElements;i++) {
		if (i > totalElements - numberOfElements) break;
		dotsBlock.innerHTML += '<span class="dot"><div class="circleDot"></div></span>';
	}
	for (var i = 0;i<totalElements;i++) {
		if (i > totalElements - numberOfElements) break;
		(function(i) {
			return dots[i].addEventListener("click",function() {
				currentPosition = i;
				refreshSlides(-elementWidth*(currentPosition));
			});
		})(i);
	}
})();

(function() {
	document.getElementsByClassName("slider")[0].style.width = numberOfElements*elementWidth + "px";
	document.getElementsByClassName("sliderLine")[0].style.width = totalElements*elementWidth + "px";
})();

function nextSlide() {
	refreshSlides(currentPosition -= elementWidth);
}
function prevSlide() {
	refreshSlides(currentPosition += elementWidth);
}
function refreshSlides(num) {
	for (var i = 0;i<totalElements;i++) {
		if (i > totalElements - numberOfElements) break;
		dots[i].className = "dot";
	}
	if (isSlided) {
		try {
			dots[-(Math.round(num/elementWidth))].className += " activ";
		} catch(e) {
			
		}
 	} else {
		if (num < -(totalElements - numberOfElements)*elementWidth) {
			num = 0;
		}
		if (num > 0) {
			num = -(totalElements - numberOfElements)*elementWidth;
		}
		
		try {
			dots[-num/elementWidth].className += " activ";
		} catch(e) {

		}
	}
	currentPosition = num;

	document.getElementsByClassName("sliderLine")[0].style.left = num + "px";
}

refreshSlides(0); //Инициализатор

var slider = document.getElementsByClassName("slider")[0];

var sliderLine = document.getElementsByClassName("sliderLine")[0];

slider.ondragstart = function() {
  return false;
};

slider.onmousedown = function(evt) {
	isSlided = true;
	sliderLine.style.transition = "none";
	var curPos = evt.offsetX;
	slider.onmousemove = function(evt) {
		var changePos = -(curPos - evt.offsetX);
		curPos += changePos;
		refreshSlides(currentPosition+changePos);
	}
}
slider.onmouseup = function(evt) {
	isSlided = false;
	sliderLine.style.transition = "0.5s";
	slider.onmousemove = function() {

	}
	setTimeout(function() {
		normalizeSlides(currentPosition);
	},300);
}
slider.onmouseout = function(evt) {
	isSlided = false;
	sliderLine.style.transition = "0.5s";
	slider.onmousemove = function() {

	}
	setTimeout(function() {
		normalizeSlides(currentPosition);
	},300);
}




function normalizeSlides(pos) {
	var bias = pos % elementWidth;
	bias = Math.abs(bias);

	if (bias < elementWidth/2) {
		currentPosition += bias;
	} else {
		currentPosition -= elementWidth - bias;
	}

	refreshSlides(currentPosition);
}