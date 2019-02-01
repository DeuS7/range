var links = document.getElementsByClassName("scrollToAnchor");

for (var i = 0;i<links.length;i++) {
	(function(i) {
		links[i].onclick = function(event) {
			event.preventDefault();
			var id = links[i].href.split('#')[1];
			var top = document.getElementById(id).offsetTop;
			window.smoothScroll(top,1000);
		}
	})(i);
}

function smoothScroll(pos,time) {
	setTimeout(function() {
var current = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	var frames = time * 60 / 1000;
	var dist = pos - current;
	var singleFrame = Math.ceil(dist / frames);
	var counter = 0;
	
	var int = setInterval(function() {
		var percentage = Math.abs(counter / dist);
		if (percentage < 0.3) {
			current += singleFrame*0.7;
			counter += singleFrame*0.7;
		} else if (percentage < 0.7){
			current += singleFrame;
			counter += singleFrame;
		} else if (percentage < 0.9) {
			current += singleFrame*0.6;
			counter += singleFrame*0.6;
		} else {
			current += singleFrame*0.2;
			counter += singleFrame*0.2;
		}
		
		window.scroll(0,current);
		if (Math.abs(counter) >= Math.abs(dist)) {
			window.scroll(0,pos);
			clearInterval(int);
		}
	}, 13)
	}, 100);
}