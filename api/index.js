const app = require('express')()
// const { v4 } = require('uuid')
const axios = require('axios');

var yuhhh = `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="/assets/skeleton.css">
<link rel="stylesheet" href="/assets/style.css">
<title>Arhaan Bahadur</title>
<meta name="author" content="Arhaan Bahadur" />
<meta name="description" content="Arhaan Bahadur is a 17 year old designer and developer." />
<meta name="keywords" content="Arhaan Bahadur MINET MIS" />
<meta name="theme-color" content="#f14141" />
<link rel="icon" href="/assets/img/arhaanb-min.jpg" type="image/png" sizes="16x16">

<!-- SEO Stuff -->
<meta name="description" content="Arhaan Bahadur is a 17 year old designer and developer." />
<meta name="twitter:card" content="Arhaan Bahadur" />
<meta name="twitter:site" content="@arhaan_bahadur" />
<meta name="twitter:title" content="Arhaan Bahadur" />
<meta name="twitter:description" content="Arhaan Bahadur is a 17 year old designer and developer." />
<meta property="og:title" content="Arhaan Bahadur" />
<meta property="og:url" content="https://arhaanb.co" />
<meta property="og:description" content="Arhaan Bahadur is a 17 year old designer and developer." />
<meta property="og:site_name" content="Arhaan Bahadur" />
<meta property="og:image" content="https://arhaanb.co/img/arhaanb-min.jpg" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="512" />
<meta property="og:image:height" content="512" />
<meta name="twitter:image" content="https://arhaanb.co/img/arhaanb-min.jpg" />
<meta name="googlebot" content="noindex, nofollow">
<meta name="bingbot" content="noindex, nofollow">
<meta name="slurp" content="noindex, nofollow">
<meta name="duckduckbot" content="noindex, nofollow">
<meta name="baiduspider" content="noindex, nofollow">
<meta name="yandexbot" content="noindex, nofollow">
<meta name="naver" content="noindex, nofollow">
<meta name="facebookexternalhit" content="index, follow">
<meta name="twitterbot" content="index, follow">

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-154909361-1"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-154909361-1');
</script>

</head>

<body>

<div class="container">
<div class="flex-con">
<div class="seven columns">
	<h1 class="title mpoint">Page Not Found 🤯</h1>
	<div class="info">
		<h5 class="grey" style="font-size: 1.6em; margin-bottom: 1em;">
			You can go back <span class="med"><a href="/" class="link" rel="noreferrer">Home</a></span>.
		</h5>
		<p>
			Made with 💖 by <span class="med">Arhaan Bahadur</span>
		</p>
	</div>
</div>
</div>
</div>

</body>

</html>`
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

// app.use(express.staticProvider(__dirname + '/public'));

app.get('/gh/:repo', async (req, res) => {
	const { repo } = req.params

	axios.get(`https://api.github.com/repos/arhaanb/${repo}`)
		.then(function (response) {
			return res.redirect(`https://github.com/arhaanb/${repo}`)
		})
		.catch(function (err) {
			console.log(err)
			// return res.redirect('/404')
			return res.send(yuhhh)
		})

})

app.get('/poopy/:hoo', async (req, res) => {
	return res.send(yuhhh)
})

module.exports = app