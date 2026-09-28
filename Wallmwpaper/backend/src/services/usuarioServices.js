import { usuarioRepository } from "../repositories/usuarioRepositories.js";

export const usuarioService = {

    async getAllUsuarios() {
        return await usuarioRepository.findAll();
    },


    async getUsuario(id) {
        const usuarioExistente = await usuarioRepository.findById(id);

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado");
        }

        return usuarioExistente;
    },

    async createUsuario(nome, email, senha) {

        const usuarioExistente = await usuarioRepository.findByEmail(email);

        if (usuarioExistente) {
            throw new Error("E-mail já cadastrado");
        }

        return await usuarioRepository.create(nome, email, senha);
    },

    async updateUsuario(id, nome, email, senha) {

        const usuarioExistente = await usuarioRepository.findById(id);

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado");
        }

        const emailExistente = await usuarioRepository.findByEmail(email);

        if (emailExistente && emailExistente.id !== Number(id)) {
            throw new Error("E-mail já cadastrado");
        }

        return await usuarioRepository.update(
            id,
            nome,
            email,
            senha
        );
    },


    async deleteUsuario(id) {

        const usuarioExistente = await usuarioRepository.findById(id);

        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado");
        }

        return await usuarioRepository.delete(id);
    },


    async login(email, senha) {

        const usuario = await usuarioRepository.findByEmail(email);

        if (!usuario || usuario.senha !== senha) {
            throw new Error("E-mail ou senha inválidos");
        }

        delete usuario.senha;

        return usuario;
    }

};
