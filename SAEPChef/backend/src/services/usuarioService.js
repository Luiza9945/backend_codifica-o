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
    }
}
