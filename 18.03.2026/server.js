
//primeiro passo , importar o express e a pagina router.
import express from 'express'
import bolosRouter from './src/router/bolosRouter.js'

// aplicar o express no servidor e, cria uma porta onde vai rodar a nossa api.
const app = express()
const port = 3000


//criamos uma rota pro nosso servidor com o GET = buscar informação/ler
//e se estiver funcionando , ele vai responder 'está tudo bem'.
app.get('/bolos', bolosRouter)

app.get('/', (req, res) => {
    console.log('Está tudo bem');

})

//servidor rodando
app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);

})