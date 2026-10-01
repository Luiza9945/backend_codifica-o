import { wallpaperService } from "../services/wallpaperServices.js";

export const wallpaperController = {

    async findAll(req, res) {

        try {

            const wallpapers = await wallpaperService.findAll();

            res.status(200).json(wallpapers);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                erro: "Erro ao buscar wallpapers."
            });

        }

    },

    async findById(req, res) {

        try {

            const wallpaper = await wallpaperService.findById(req.params.id);

            if (!wallpaper) {
                return res.status(404).json({
                    erro: "Wallpaper não encontrado."
                });
            }

            res.status(200).json(wallpaper);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                erro: "Erro ao buscar wallpaper."
            });

        }

    },

    async create(req, res) {

        try {

            const { wallpaper, id_criador, descricao } = req.body;

            const novoWallpaper = await wallpaperService.create(
                wallpaper,
                id_criador,
                descricao
            );

            res.status(201).json(novoWallpaper);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                erro: "Erro ao criar wallpaper."
            });

        }

    },

    async update(req, res) {

        try {

            const { wallpaper, id_criador, descricao } = req.body;

            const wallpaperAtualizado = await wallpaperService.update(
                req.params.id,
                wallpaper,
                id_criador,
                descricao
            );

            if (!wallpaperAtualizado) {
                return res.status(404).json({
                    erro: "Wallpaper não encontrado."
                });
            }

            res.status(200).json(wallpaperAtualizado);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                erro: "Erro ao atualizar wallpaper."
            });

        }

    },

    async delete(req, res) {

        try {

            const wallpaper = await wallpaperService.delete(req.params.id);

            if (!wallpaper) {
                return res.status(404).json({
                    erro: "Wallpaper não encontrado."
                });
            }

            res.status(200).json(wallpaper);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                erro: "Erro ao deletar wallpaper."
            });

        }

    }

};