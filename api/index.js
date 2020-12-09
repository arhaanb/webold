const app = require('express')()
// const { v4 } = require('uuid')
const axios = require('axios');

// app.get('/api', (req, res) => {
// 	const path = `/api/item/${v4()}`
// 	res.setHeader('Content-Type', 'text/html')
// 	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
// 	res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
// })

// app.get('/api/item/:slug', (req, res) => {
// 	const { slug } = req.params
// 	res.end(`Item: ${slug}`)
// })

app.get('/gh/:repo', async (req, res) => {
	const { repo } = req.params

	axios.get(`https://api.github.com/repos/arhaanb/${repo}`)
		.then(function (response) {
			return res.redirect(`https://github.com/arhaanb/${repo}`)
		})
		.catch(function (err) {
			console.log(err)
			return res.redirect('/404')
		})

})

module.exports = app