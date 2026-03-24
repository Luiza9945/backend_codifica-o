import expresss, { Router } from 'express'
import { bolosservice } from '../services/bolosService.js'

const route = expresss.Router()

route.get("/bolos", (req, res) => {
    const data = bolosservice.getAll()
    res.json(data)
})

route.get('/:id', (req, res) => {
    const {id} = req.params
    const bolos= fruitService.getFruitById(id)

    if (!bolos){
        res.status(404).json({mensagem: "Não encontrado"})
        res.json(bolos)
    }


})

export default route