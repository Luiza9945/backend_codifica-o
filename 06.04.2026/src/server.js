import express from 'express'
import clinicaRouter from './router/router.js'

const app = express()
const port = 3000

app.use(express.json())

app.get('/clinicas', clinicaRouter )

app.listen(port, () => {
  console.log(` http://localhost:${port}`)
})
