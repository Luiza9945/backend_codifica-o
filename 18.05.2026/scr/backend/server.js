server.js

const express = require('express');
const path = require('path');
const service = ('./services/notaService.js');


const app = express();
app.use(express.json());


// Serve para os arquivos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));


//rotas da API


app.get('api/notas', (req, res) => res.json(service.lisrTodas()));
app.post('api/notas', (req, res) => {
    const nota = service.criar(req.body.titulo, req.body.conteudo);
    res.status(201).json(nota);
});
app.put('api/notas/:id', (req, res) => {
    const nota = service.atualizar(req.params.id, req.body.titulo, req.body.conteudo);
    nota ? res.json(data) : req.status(404).send();
});
app.delete('api/notas/:id', (req, res) => {
    service.excluir(req.params.id);
    res.status(204).send();
});


app.listen(3000, () => console.log("Servidor ON em http://localhost:3000"));
