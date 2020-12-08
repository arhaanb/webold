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

// // Default Values
// var songVal = "Not Playing"
// var albumVal = "Spotify"
// var defAlbum = './assets/img/default-min.png'

var spotifyContainer = document.getElementById('spotify-con')
var songTitle = document.getElementById('songname')
var album = document.getElementById('album')
// var songlink = document.getElementById('songlink')
var albumArt = document.getElementById('albumart')
var equalizer = document.getElementById('equalizer')

function getSong() {
	var client = new HttpClient();
	client.get('/api/spotify', function (response) {
		var song = JSON.parse(response);
		if (song.isPlaying === true) {
			songTitle.innerText = song.title
			songTitle.setAttribute("href", song.songUrl)
			songTitle.setAttribute("target", "_blank")

			album.innerText = song.artist
			albumArt.setAttribute("src", song.albumImageUrl)
			equalizer.style.display = "block";
			spotifyContainer.style.alignItems = "center"
		} else {
			songTitle.innerText = 'Not Playing'
			songTitle.setAttribute("href", "#")
			songTitle.setAttribute("target", "_self")

			album.innerText = 'Spotify'
			albumArt.setAttribute("src", './assets/img/default-min.png')
			equalizer.style.display = "none";
			spotifyContainer.style.alignItems = "flex-start"
		}
	});
}

setInterval(function () {
	getSong()
}, 20000)

getSong()