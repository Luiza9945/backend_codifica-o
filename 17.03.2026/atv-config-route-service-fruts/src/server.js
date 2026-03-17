import express from 'express'
import route from './routes/fruit-routes.js'
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/fruits", route)

app.listen(port, () => {
  console.log(`A aplicação está rodando em http://localhost:${port}`)
})
