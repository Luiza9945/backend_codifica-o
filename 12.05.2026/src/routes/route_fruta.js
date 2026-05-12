import { Router } from "express"
import vendaController from "../controller/controller.js"

const router = Router()

router.get("/vendas/:id", vendaController.getByCliente)

export default router