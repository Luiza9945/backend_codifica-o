import express from 'express'
import { filmesService } from '../service/service.js'

const route = express.Router()

// Adicionado async e await
route.get("/", async (req, res) => {
    try {
        const data = await filmesService.getAll()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" })
    }
})

// Adicionado async e await
route.post("/", async (req, res) => {
    const { nome, data_lancamento, genero } = req.body

    if (!nome) {
        return res.status(400).json({ message: "O nome do filme é obrigatório" })
    }

    try {
        const novoFilme = await filmesService.create(nome, data_lancamento, genero)
        res.status(201).json(novoFilme)
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar filme" })
    }
})

// Adicionado async e await
route.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const filme = await filmesService.getById(id) 
        if (!filme) {
            return res.status(404).json({ message: "Filme não encontrado" })
        }
        res.json(filme) 
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o filme" })
    }
})

// Adicionado async e await
route.put('/:id', async (req, res) => {
    const { id } = req.params 
    const { nome } = req.body 

    try {
        const resultado = await filmesService.update(id, nome)
        if (resultado) {
            return res.json(resultado) 
        } else {
            return res.status(404).json({ message: "Filme não encontrado!" })
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar filme" })
    }
})

export default route
