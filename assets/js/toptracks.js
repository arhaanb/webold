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
	client.get('/api/top-tracks', function (response) {
		var tracks = JSON.parse(response);
		console.log(tracks.tracks)
		var text = "";
		var i;

		for (i = 0; i < tracks.tracks.length; i++) {
			// text += tracks.tracks[i].title + "<br>";

			text += `
			<div class="spotify" id="spotify-con">
				<img id="albumart" src=${tracks.tracks[i].albumArt} alt="">
				<div class="songinfo">
					<h5 class="med title"><a href=${tracks.tracks[i].songUrl} target="_blank" id="songname">${tracks.tracks[i].title}</a></h5>
					<h5 id="album">${tracks.tracks[i].artist}</h5>
				</div>
			</div>
		`
		}

		document.getElementById('top-tracks').innerHTML = text
		// if (song.isPlaying === true) {
		// 	songTitle.innerText = song.title
		// 	songTitle.setAttribute("href", song.songUrl)
		// 	songTitle.setAttribute("target", "_blank")

		// 	album.innerText = song.artist
		// 	albumArt.setAttribute("src", song.albumImageUrl)
		// 	equalizer.style.display = "block";
		// 	spotifyContainer.style.alignItems = "center"
		// } else {
		// 	songTitle.innerText = 'Not Playing'
		// 	songTitle.setAttribute("href", "#")
		// 	songTitle.setAttribute("target", "_self")

		// 	album.innerText = 'Spotify'
		// 	albumArt.setAttribute("src", './assets/img/default-min.png')
		// 	equalizer.style.display = "none";
		// 	spotifyContainer.style.alignItems = "flex-start"
		// }
	});
}

// setInterval(function () {
// 	getSong()
// }, 20000)

getSong()