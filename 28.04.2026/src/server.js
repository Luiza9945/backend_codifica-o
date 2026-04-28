import express from 'express'
import 'dotenv/config'
import fruitsRouter from './routes/fruits.routes.js'


const app = express()
const port = process.env.API_PORT

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/frutas", fruitsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
