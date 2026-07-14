import { Router } from "express";
import { animalController } from "../controllers/animalController.js"

const router = Router();

router.get('/animais', animalController.getAll);
router.get('/animais:id' , animalController.get)
router.post('/animais', animalController.create);
router.put('/animais:id', animalController.update);
router.patch('/animais:id', animalController.patch);
router.delete('/animais:id', animalController.delete);

export default router