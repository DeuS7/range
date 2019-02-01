(function() {
	var modalWrapper = document.getElementById("modalWrapper");
	var modalClose = document.getElementById("modalClose");
	var modal = document.getElementById("modal");
	var delay = getComputedStyle(modalWrapper).animationDuration;

	document.getElementById("callModal").onclick = function() {
		showModal();
	}
	modalWrapper.onclick = function() {
		hideModal();
	}

	modalClose.onclick = function() {
		hideModal();
	}

	function showModal() {
		modalWrapper.style.display = "block";
		modal.style.top = 50 + "%";
		modal.style.marginTop = -modal.clientHeight/2 + "px";
	}
	function hideModal() {
		modalWrapper.style.animationName = "back";
		modal.style.top = -1000 + "px";
		setTimeout(function() {
			modal.style.marginTop = "";
			modalWrapper.style.display = "none";
			modalWrapper.style.animationName = "to";
		},delay.substring(0, delay.length - 1) * 1000);
	}
})();