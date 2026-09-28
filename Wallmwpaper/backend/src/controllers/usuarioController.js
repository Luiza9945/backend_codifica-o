import { usuarioService } from "../services/usuarioServices.js";

export const usuarioController = {
    async getAll(req, res) {
        try {
            const usuarios = await usuarioService.getAllUsuarios();

            res.status(200).json(usuarios);

        } catch (error) {
            res.status(500).json({
                erro: error.message
            });
        }
    },


    async get(req, res) {
        try {
            const usuario = await usuarioService.getUsuario(req.params.id);

            res.status(200).json(usuario);

        } catch (error) {
            res.status(404).json({
                erro: error.message
            });
        }
    },


    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;

            const usuario = await usuarioService.createUsuario(
                nome,
                email,
                senha
            );

            res.status(201).json(usuario);

        } catch (error) {
            if (error.message === "E-mail já cadastrado") {
                return res.status(409).json({
                    erro: error.message
                });
            }

            res.status(500).json({
                erro: error.message
            });
        }
    },


    async update(req, res) {
        try {
            const { nome, email, senha } = req.body;

            const usuario = await usuarioService.updateUsuario(
                req.params.id,
                nome,
                email,
                senha
            );

            res.status(200).json(usuario);

        } catch (error) {
            if (error.message === "Usuário não encontrado") {
                return res.status(404).json({
                    erro: error.message
                });
            }

            if (error.message === "E-mail já cadastrado") {
                return res.status(409).json({
                    erro: error.message
                });
            }

            res.status(500).json({
                erro: error.message
            });
        }
    },


    async delete(req, res) {
        try {
            const usuario = await usuarioService.deleteUsuario(
                req.params.id
            );

            res.status(200).json({
                mensagem: "Usuário excluído com sucesso",
                usuario: usuario
            });

        } catch (error) {
            if (error.message === "Usuário não encontrado") {
                return res.status(404).json({
                    erro: error.message
                });
            }

            res.status(500).json({
                erro: error.message
            });
        }
    },


    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const usuarioAutenticado = await usuarioService.login(
                email,
                senha
            );

            return res.status(200).json(usuarioAutenticado);

        } catch (error) {

            if (error.message === "E-mail ou senha inválidos") {
                return res.status(401).json({
                    erro: error.message
                });
            }

            return res.status(500).json({
                erro: "Erro interno no servidor de login"
            });
        }
    }

};