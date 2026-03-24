import express from 'express'
import routercores from './router/routercores.js'

const app = express()
const port = 3000
app.use(express.json())

app.use('/cores', routercores)

app.get('/', (req, res) => {
  res.send('Tudo certo API de cores rodando em /cores')
})

app.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}`)
})
