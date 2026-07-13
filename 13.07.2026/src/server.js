import express from "express"
import route from "./routes/motoristasRoutes"

const app = express();
const PORT = 3001

app.use(express.json());

app.use("/motoristas" , route)

app.get("/" , (req , res) =>{
    res.send("está tudo certo")});

app.listen(PORT,() =>{
    console.log(`rodando em http://localhost${PORT}`);
})