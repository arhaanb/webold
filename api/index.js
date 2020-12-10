const app = require('express')()
fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const dirPath = path.join(__dirname, '/../404.html')

fs.readFile(dirPath, 'utf8', function (err, data) {
	if (err) {
		console.log(err);
		return res.send('an error occured.');
	}

	var errorPage = data


	app.get('/gh/:repo', async (req, res) => {
		var { repo } = req.params
		try {
			const { ok: repoExists } = await fetch(
				`https://api.github.com/repos/arhaanb/${repo}`
			)

			if (repoExists) {
				return res.redirect(302, `https://github.com/arhaanb/${repo}`)
			}

			return res.status(404).send(errorPage)
		} catch (e) {
			console.error(e)
		}
	})

	//404
	app.use((res, req, next) => {
		next(err);
	});

	//Error Handler
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.send(errorPage);
	});



});

module.exports = app