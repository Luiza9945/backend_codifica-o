import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js"

const router = Router();

router.post('/login', usuarioController.login); 

router.get('/', usuarioController.getAll);

router.get('/:id', usuarioController.get);

export default router;
