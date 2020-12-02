import { NowRequest, NowResponse } from '@vercel/node'
import Airtable from 'airtable'
import request from 'request'

const CACHE_DURATION_MS = 10000

const apiKey = process.env.AIRTABLE_API_KEY
const baseId = process.env.AIRTABLE_BASE_ID
const tableName = 'Links'
const viewName = 'Grid view'

let query: Airtable.Query<Link>
let links: Airtable.Records<Link>
let lastUpdated: number

export default async (req: NowRequest, res: NowResponse) => {
  const currentTime = new Date().valueOf()
  const timestamp = new Date().toISOString()

  const ip = req.headers['x-forwarded-for']
  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers['host']
  const encodedUid = encodeURIComponent(`${req.query.uid}`)
  const source = `${protocol}://${host}/${encodedUid}`

  const isForceReload = req.query.nocache !== undefined
  const isLinksEmpty = !links
  const isCacheExpired = currentTime - lastUpdated > CACHE_DURATION_MS

  if (isForceReload || isLinksEmpty || isCacheExpired) {
    if (!query) {
      query = new Airtable({ apiKey })
        .base(baseId)(tableName)
        .select({ view: viewName }) as Airtable.Query<Link>
    }

    links = await query.all()
    lastUpdated = currentTime
  }

  for (const { fields } of links) {
    const { enabled = false, resolvedUid, url } = fields

    if (enabled && resolvedUid === req.query.uid) {
      console.log(`[${timestamp}] ${ip} -> ${source} -> ${url}`)
      return res.writeHead(308, { ['Location']: url }).end()
    }
  }

  console.error(`[${timestamp}] ${ip} -> ${source} -> n/a`)
  // res.status(404).send({ error: 'link not found', source, timestamp })
  res.status(404).redirect('/404')
  // res.sendFile('views/test.html', {root: __dirname })
}

interface Link {
  name: string
  uid: string
  resolvedUid: string
  url: string
  redirectUrl: string
  useGeneratedUid: boolean
  enabled: boolean
}
