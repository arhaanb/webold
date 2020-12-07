function darkMode() {
	var element = document.body;
	var sun = document.getElementById('sun')
	var moon = document.getElementById('moon')
	element.classList.toggle("dark-mode");
	sun.classList.toggle("no");
	moon.classList.toggle("no");
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

var songTitle = document.getElementById('songname')
var album = document.getElementById('album')
var songlink = document.getElementById('songlink')
var albumArt = document.getElementById('albumart')
var equalizer = document.getElementById('equalizer')

function getSong() {
	var client = new HttpClient();
	//for development (TODO: Set up `vercel dev`)
	// client.get('https://cors-anywhere.herokuapp.com/https://arhaanb.co/api/spotify', function (response) {
	client.get('/api/spotify', function (response) {
		var song = JSON.parse(response);
		//console.log(song)
		if (song.isPlaying === true) {
			songTitle.innerText = song.title
			album.innerText = song.artist
			songlink.setAttribute("href", song.songUrl)
			songlink.setAttribute("target", "_blank")
			albumArt.setAttribute("src", song.albumImageUrl)
			equalizer.style.display = "block";
		} else {
			songTitle.innerText = 'Not Playing'
			album.innerText = ''
			songlink.setAttribute("href", "#")
			songlink.setAttribute("target", "_self")
			albumArt.setAttribute("src", './assets/img/default.jpg')
			equalizer.style.display = "none";
		}
	});
}

setInterval(function () {
	getSong()
}, 30000)

getSong()