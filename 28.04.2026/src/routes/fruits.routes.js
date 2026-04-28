import express from "express";
import { fruitsService } from "../service/fruits.service.js";


export const fruitsRouter = express.Router();

// GET
fruitsRouter.get("/", async (req, res) => {
    const fruits = await fruitsServicervice.getAll();
    res.json(fruits);
});

// GET by id
fruitsRouter.get("/:id", async (req, res) => {
    const fruit = await fruitsService.getById(req.params.id);
    res.json(fruit);
});

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