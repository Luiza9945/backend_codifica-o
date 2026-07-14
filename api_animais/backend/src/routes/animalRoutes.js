import { Router } from "express";
import {animalController} from "../controllers/animalController.js"

const router = Router();

router.get('/animais', animalController.getAll);
router.post('/animais')