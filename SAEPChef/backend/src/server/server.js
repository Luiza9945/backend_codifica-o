import express from 'express'
import 'dotenv/config'
import usuarioRoutes from "../routes/usuarioRoute.js"

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(usuarioRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Servidor ON em http://localhost: ${PORT}`)
})
