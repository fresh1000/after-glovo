import * as dotenv from 'dotenv'
import app from './src/index'

if (process.env.DOTENV) {
  process.env.DOTENV
    .split(',')
    .filter((val) => val)
    .forEach((envPath) => dotenv.config({ path: envPath }))
}

const port = process.env.PORT || 4000

app.listen(port)
console.log(`Server running at ${port}`)
