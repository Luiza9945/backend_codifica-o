import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js"

const router = Router();

router.get('/usuarios', usuarioController.getAll);
router.get('/usuario:id' , usuarioController.get)

export default router