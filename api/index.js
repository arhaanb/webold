const app = require('express')()
const axios = require('axios');
fs = require('fs')
const path = require('path')
const dirPath = path.join(__dirname, '/../404.html')

fs.readFile(dirPath, 'utf8', function (err, data) {
	if (err) {
		console.log(err);
		return res.send('an error occured.');
	}

	var errorPage = data


	app.get('/gh/:repo', async (req, res) => {
		const { repo } = req.params

		axios.get(`https://api.github.com/repos/arhaanb/${repo}`)
			.then(function (response) {
				return res.redirect(`https://github.com/arhaanb/${repo}`)
			})
			.catch(function (err) {
				return res.send(errorPage)
			})
	})


});

module.exports = app