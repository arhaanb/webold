var light = true
function darkMode() {
	var element = document.body;
	var sun = document.getElementById('sun')
	var moon = document.getElementById('moon')
	element.classList.toggle("dark-mode");
	sun.classList.toggle("no");
	moon.classList.toggle("no");
	var img = document.getElementById('albumart')
}

var HttpClient = function () {
	this.get = function (aUrl, aCallback) {
		var anHttpRequest = new XMLHttpRequest();
		anHttpRequest.onreadystatechange = function () {
			if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
				aCallback(anHttpRequest.responseText);
		}

		anHttpRequest.open("GET", aUrl, true);
		anHttpRequest.send(null);
	}
}