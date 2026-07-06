import express from "express";
import { produtos } from "../data/mockDBjs";

const route = express.Router();

route.get("/", async (req, res) => {
    try {
        res.json(produtos);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao buscar os produtos."
        });
    }
});

route.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const produto = produtos.find(p => String(p.id) === String(id));

        if (!produto) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Produto não encontrado."
            });
        }

        res.json(produto);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao buscar o produto."
        });
    }
});

route.post("/", async (req, res) => {
    try {
        const produtoData = req.body;
        const novoId = produtos.length > 0 ? Number(produtos[produtos.length - 1].id) + 1 : 1;

        const newProduto = {
            id: novoId,
            ...produtoData
        };

        produtos.push(newProduto);
        res.status(201).json(newProduto);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao cadastrar o produto."
        });
    }
});

route.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const produtoData = req.body;
        const index = produtos.findIndex(p => String(p.id) === String(id));

        if (index === -1) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Produto não encontrado."
            });
        }

        produtos[index] = { id: produtos[index].id, ...produtoData };
        res.json(produtos[index]);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao atualizar o produto."
        });
    }
});

route.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const index = produtos.findIndex(p => String(p.id) === String(id));

        if (index === -1) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Produto não encontrado."
            });
        }

        const [produtoDelete] = produtos.splice(index, 1);

        res.json({
            success: true,
            data: produtoDelete,
            message: "Produto removido com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao remover o produto."
        });
    }
});

export default route;
