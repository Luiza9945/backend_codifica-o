import { wallpaperRepository } from "../repositories/wallpaperRepositories.js";

export const wallpaperService = {

    async findAll() {
        return await wallpaperRepository.findAll();
    },

    async findById(id) {
        return await wallpaperRepository.findById(id);
    },

    async create(wallpaper, id_criador, descricao) {
        return await wallpaperRepository.create(
            wallpaper,
            id_criador,
            descricao
        );
    },

    async update(id, wallpaper, id_criador, descricao) {
        return await wallpaperRepository.update(
            id,
            wallpaper,
            id_criador,
            descricao
        );
    },

    async delete(id) {
        return await wallpaperRepository.delete(id);
    }

};