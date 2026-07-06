import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./routes/auth.js";
import carrinhoRoute from "./routes/carrinho.js";
import produtosRoute from "./routes/produtos.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use(session({
    secret: "sua_chave_secreta_aqui",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/teste", (req, res) => {
    res.send("Está tudo certo com a API");
});

app.use("/api/produtos", produtosRoute);
app.use("/api/carrinho", carrinhoRoute);
app.use("/api", authRoute);

app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
});
