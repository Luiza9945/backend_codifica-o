import express from "express";
import animalRoutes from "../routes/animalRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(animalRoutes);

app.listen(PORT, () => {
    console.log(`Servidor do ZOO rodando na porta: ${PORT}...`)
});


