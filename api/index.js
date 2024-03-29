const express = require('express')
const fetch = require('node-fetch')
var Airtable = require('airtable')
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID,
)

fs = require('fs')
const path = require('path')
const util = require('util')
const dirPath = path.join(__dirname, '/../404.html')

const readFile = util.promisify(fs.readFile)

function getErr() {
  return readFile(dirPath, 'utf8')
}

const app = express()

app.get('/gh/:repo', async (req, res, next) => {
  try {
    const repo = req.params.repo
    const { ok: yuh } = await fetch(
      `https://api.github.com/repos/arhaanb/${repo}`,
    )

    if (yuh) {
      return res.redirect(302, `https://github.com/arhaanb/${repo}`)
    }

    getErr().then((data) => {
      return res.status(404).send(data)
    })
  } catch (e) {
    console.error(e)
  }
})

app.get('/*', async (req, res) => {
  const url = req.url.slice(1).toLowerCase()
  // console.log(url)
  base('Links')
    .select({
      maxRecords: 1,
      filterByFormula: `resolvedUid = "${url}"`,
      // filterByFormula: `resolvedUid = "${req.params.shrtn}"`
    })
    .eachPage(
      function page(records) {
        // console.log(records)

        if (records.length > 0) {
          if (records[0].get('disabled') === true) {
            getErr().then((data) => {
              return res.status(404).send(data)
            })
          } else {
            var redirectUri = records[0].get('url')
            // return res.send(redirectUri)
            return res.status(302).redirect(redirectUri)
          }
        }
      },
      function done(err) {
        if (err) {
          console.error(err)
          getErr().then((data) => {
            return res.status(404).send(data)
          })
        }
      },
    )
})

// app.get('/*', async (req, res) => {
//   const url = req.url.slice(1).toLowerCase()
//   // console.log(url)
//   base('Links')
//     .select({
//       maxRecords: 1,
//       filterByFormula: `resolvedUid = "${url}"`,
//       // filterByFormula: `resolvedUid = "${req.params.shrtn}"`
//     })
//     .eachPage(
//       function page(records) {
//         // console.log(records)

//         if (records.length > 0) {
//           if (records[0].get('enabled') == 1) {
//             var redirectUri = records[0].get('url')
//             // return res.send(redirectUri)
//             return res.status(302).redirect(redirectUri)
//           }
//         }

//         getErr().then((data) => {
//           return res.status(404).send(data)
//         })
//       },
//       function done(err) {
//         if (err) {
//           console.error(err)
//           getErr().then((data) => {
//             return res.status(404).send(data)
//           })
//         }
//       },
//     )
// })

app.use(function (req, res, next) {
  getErr().then((data) => {
    return res.status(404).send(data)
  })
})

const port = process.env.PORT || 3000
app.listen(port, (err) => {
  if (err) throw err
})
