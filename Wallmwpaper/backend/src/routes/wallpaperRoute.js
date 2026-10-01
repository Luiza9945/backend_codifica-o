import express from "express";
import { wallpaperController } from "../controllers/wallpaperController.js";

const router = express.Router();

router.get("/", wallpaperController.findAll);

router.get("/:id", wallpaperController.findById);

router.post("/", wallpaperController.create);

router.put("/:id", wallpaperController.update);

router.delete("/:id", wallpaperController.delete);

export default router;