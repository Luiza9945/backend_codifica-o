import { Router } from 'express'
import { fruitsService } from '../service/fruits.service.js'

const fruitsRouter = Router()
// GET
fruitsRouter.get("/", async (req, res) => {
    const fruits = await fruitsService.getAll();
    res.json(fruits);
});


// GET by id


fruitsRouter.get("/:id", (req, res) => {
    const { id } = req.params
    const fruit = fruitsService.getById(id)
    if (!fruit) {
        return res.status(404).json({ message: "Fruta não encontrada" })
    }

    res.json(fruit)
})
// POST
fruitsRouter.post("/", async (req, res) => {
    const newFruit = await fruitsService.create(req.body.nome);
    res.status(201).json(newFruit);
});

// PUT
fruitsRouter.put("/:id", async (req, res) => {
    const updated = await fruitsService.update(
        req.params.id,
        req.body.nome
    );
    res.json(updated);
});

// DELETE
fruitsRouter.delete("/:id", async (req, res) => {
    const deleted = await fruitsService.delete(req.params.id);
    res.json({ success: deleted });
});

export default fruitsRouter;