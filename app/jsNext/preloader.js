function hidePreloader(delay) {
	preloader.classList.add("removePreloader");
	preloader.style.animationDelay = (delay - 0.5) + "s";
	setTimeout(function() {
		preloader.remove();
	}, delay*1000);
}