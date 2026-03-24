import express, { Router } from 'express'
import { service_cores } from '../service/service_cores.js'

const route = Router()

route.get("/", (req, res) => {
    const data = service_cores.getAll()
    res.json(data)
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    const core = service_cores.getAll().find(c => c.id == id)

    if (!core) {
        return res.status(404).json({ mensagem: "Cor não encontrada" })
    }
    res.json(core)
})

export default route
