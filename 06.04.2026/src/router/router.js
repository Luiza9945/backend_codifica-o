import express, { json } from 'express'
import { clinicasServece } from '../service/service.js'

const route = express.Router()

route.get("/", (req, res) => {
    const data = clinicasServece.getAll()
    res.json(data)
})

route.post("/", (req, res) => {
    console.log("cheguei aqui");

    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ message: "O nome da clinica é obrigatório" })
    }

    const novaClinica = clinicasServece.create(nome)

    res.status(201).json(novaClinica)
})

route.get("/:id", (req, res) => {
    const { id } = req.params
    const clinica = fruitService.getById(id)
    if (!clinica) {
        return res.status(404).json({ message: "Clinica não encontrada" })
    }

    res.json(fruit)
})
route.put('/:id', (req, res) => {
    const { id } = req.params; // Pega o ID da URL (ex: 2)
    const { nome } = req.body; // Pega o nome do Body do Thunder

    // Chama o método que adicionamos no service
    const resultado = clinicasServece.update(id, nome);

    if (resultado) {
        // Se você quer que apareça DIRETO o objeto no Thunder:
        return res.json(resultado); 
    } else {
        return res.status(404).json({ message: "Clinica não encontrada!" });
    }
});

export default route;