import express from 'express';
import { fruitService } from '../services/fruit-services.js';

const route = express.Router();

// Rota para obter a lista de frutas

route.get('/', (req, res) => {
    res.json(fruitService.getAllFruits())
})

route.get('/:id', (req, res) => {
    const {id} = req.params
    const fruit = fruitService.getFruitById(id)

    if (!fruit) {
        res.status(404).json({message: "Fruta não encontrada"})
    }

    res.json(fruit)
})

export default route