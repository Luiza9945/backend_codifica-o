import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";

const router = Router();

router.post('/login', usuarioController.login);
router.get('/usuarios', usuarioController.getAll);
router.get('/:id', usuarioController.get);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);


export default router;