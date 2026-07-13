import express from "express"

const app = express();
const PORT = 3001

app.get("/" , (req , res) =>{
    res.sed("está tudo certo")});

app.listen(PORT,() =>{
    console.log(`rodando em http://localhost${PORT}`);
})