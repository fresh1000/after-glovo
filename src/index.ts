import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import priceActions from './routes/price'

const app: express.Application = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(priceActions)

export default app
