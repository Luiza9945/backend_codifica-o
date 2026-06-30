import express from 'express'
import 'dotenv/config'
import rotasFilmes from './routes/routes.js.js' 


const app = express()
const port = process.env.API_PORT

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Servidor ON em http://localhost:${port}`)
})
