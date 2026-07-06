import express from "express";
import { usuarios } from "../data/mockDBjs"; // Ajuste o nome do arquivo se necessário

const route = express.Router();

// 1. POST /api/login - Autentica o usuário e cria a sessão no servidor
route.post("/login", (req, res) => {
    try {
        const { usuario, senha } = req.body;

        // Validação básica de campos
        if (!usuario || !senha) {
            return res.status(400).json({
                success: false,
                message: "Usuário e senha são obrigatórios."
            });
        }

        // Procura o usuário no array importado do mockDb
        const usuarioEncontrado = usuarios.find(
            u => u.usuario === usuario && u.senha === senha
        );

        // Se não encontrar ou a senha estiver incorreta
        if (!usuarioEncontrado) {
            return res.status(401).json({
                success: false,
                message: "Usuário ou senha incorretos."
            });
        }

        // Salva os dados do usuário na sessão (removendo a senha por segurança)
        const { senha: _, ...dadosUsuario } = usuarioEncontrado;
        req.session.user = dadosUsuario;

        res.json({
            success: true,
            message: "Login realizado com sucesso.",
            user: dadosUsuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao processar o login."
        });
    }
});

// 2. POST /api/logout - Encerra a sessão ativa do usuário
route.post("/logout", (req, res) => {
    try {
        // Método nativo do express-session para destruir a sessão
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao encerrar a sessão."
                });
            }

            // Limpa o cookie do navegador correspondente à sessão
            res.clearCookie("connect.sid"); 
            
            res.json({
                success: true,
                message: "Logout realizado com sucesso."
            });
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao processar o logout."
        });
    }
});

// 3. GET /api/me - Retorna os dados do usuário logado ou null
route.get("/me", (req, res) => {
    try {
        // Verifica se a chave 'user' existe na sessão do usuário atual
        if (!req.session.user) {
            return res.json({
                success: true,
                user: null
            });
        }

        // Se existir, retorna os dados que guardamos no momento do login
        res.json({
            success: true,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao verificar estado da sessão."
        });
    }
});

export default route;
