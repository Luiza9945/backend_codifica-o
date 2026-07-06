import express from "express";
import { produtos } from "../data/mockDBjs"; 

const route = express.Router();

route.get("/", (req, res) => {
    try {
        if (!req.session.carrinho) {
            req.session.carrinho = [];
        }

        const total = req.session.carrinho.reduce((acc, produto) => {
            return acc + Number(produto.preco || 0);
        }, 0);

        res.json({
            success: true,
            carrinho: req.session.carrinho,
            total: total
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao carregar o carrinho."
        });
    }
});

route.post("/", (req, res) => {
    try {
        const { id } = req.body; 

        const produto = produtos.find(p => String(p.id) === String(id));

        if (!produto) {
            return res.status(404).json({
                success: false,
                message: "Produto não encontrado."
            });
        }

        const estoqueAtual = produto.estoque !== undefined ? produto.estoque : 0;
        if (estoqueAtual <= 0) {
            return res.status(400).json({
                success: false,
                message: "Produto esgotado no estoque."
            });
        }

        if (!req.session.carrinho) {
            req.session.carrinho = [];
        }

        req.session.carrinho.push(produto);

        res.status(201).json({
            success: true,
            message: "Produto adicionado ao carrinho com sucesso.",
            carrinho: req.session.carrinho
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao adicionar produto ao carrinho."
        });
    }
});

route.post("/finalizar", (req, res) => {
    try {
        if (!req.session.usuarioLogado && !req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Você precisa estar logado para finalizar a compra."
            });
        }

        if (!req.session.carrinho || req.session.carrinho.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Seu carrinho está vazio."
            });
        }

        for (const itemCarrinho of req.session.carrinho) {
            const produtoNoDb = produtos.find(p => String(p.id) === String(itemCarrinho.id));
            
            if (produtoNoDb && produtoNoDb.estoque > 0) {
                produtoNoDb.estoque -= 1; 
            }
        }

       
        req.session.carrinho = [];

        res.json({
            success: true,
            message: "Compra finalizada com sucesso! Estoque atualizado."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao finalizar a compra."
        });
    }
});

export default route;
