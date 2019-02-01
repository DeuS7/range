var index = 1;

var slides = document.getElementsByClassName("slidesItem");
var dots = document.getElementsByClassName("dot");

(function() {
	/*var slides = document.getElementsByClassName("slidesItem");*/
	var dotsBlock = document.getElementsByClassName("picturesDots")[0];
	for (var i = 0;i<slides.length;i++) {
		dotsBlock.innerHTML += '<span class="dot"><div class="circleDot"></div></span>';
	}
	/*var dots = document.getElementsByClassName("dot");*/
	for (var i = 0;i<dots.length;i++) {
		(function(i) {
			return dots[i].addEventListener("click",function() {
				index = i;
				showSlides(++index);
			});
		})(i);
	}
})();


showSlides(index);

function plusSlide(num) {
	showSlides(++index);
}
function minusSlide(num) {
	showSlides(--index);
}
function showSlides(num) {
	/*var slides = document.getElementsByClassName("slidesItem");*/
	/*var dots = document.getElementsByClassName("dot");*/

	if (num > slides.length) index=1;

	if (num < 1) index=slides.length;

	for (var i=0;i<slides.length;i++) {
		slides[i].style.display = "none";
	}

	for (var i = 0;i<dots.length;i++) {
		dots[i].className = "dot";
	}
	
	slides[index-1].style.display = "block";
	dots[index-1].className += " activ";
}
