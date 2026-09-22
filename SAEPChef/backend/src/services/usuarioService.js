import {usuarioRepository} from "../repositories/usuarioRepository.js"

export const usuarioService = {
    async getAllUsuarios() {
        return await usuarioRepository.findAll();
    },

    async getUsuario(id) {
        const usuarioExistente = await usuarioRepository.findById(id);
        if (!usuarioExistente) {
            throw new Error("usuario não encontrado");
        }
        return usuarioExistente
    },

    async login(email, senha) {
        const usuario = await usuarioRepository.findByEmail(email);

        if (!usuario || usuario.senha !== senha) {
            throw new Error("E-mail ou senha inválidos");
        }

        delete usuario.senha;

        return usuario;
    }

}
