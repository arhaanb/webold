function getSongs() {
	var client = new HttpClient();
	client.get('/api/top-tracks', function (response) {
		var tracks = JSON.parse(response);
		var text = "";
		var i;

		for (i = 0; i < tracks.tracks.length; i++) {
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
	});
}

getSongs()