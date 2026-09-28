import { query } from "../config/db.js";

export const wallpaperRepository = {

    async findAll() {
        const res = await query(
            `SELECT 
                wallpapers.id,
                wallpapers.wallpaper,
                wallpapers.id_criador,
                wallpapers.descricao,
                usuarios.nome AS criador
             FROM wallpapers
             INNER JOIN usuarios
             ON wallpapers.id_criador = usuarios.id
             ORDER BY wallpapers.id;`
        );

        return res.rows;
    },


    async findById(id) {
        const res = await query(
            `SELECT 
                wallpapers.id,
                wallpapers.wallpaper,
                wallpapers.id_criador,
                wallpapers.descricao,
                usuarios.nome AS criador
             FROM wallpapers
             INNER JOIN usuarios
             ON wallpapers.id_criador = usuarios.id
             WHERE wallpapers.id = $1;`,
            [id]
        );

        return res.rows.length > 0 ? res.rows[0] : null;
    },


    async create(wallpaper, id_criador, descricao) {
        const res = await query(
            `INSERT INTO wallpapers 
                (wallpaper, id_criador, descricao)
             VALUES ($1, $2, $3)
             RETURNING *;`,
            [wallpaper, id_criador, descricao]
        );

        return res.rows[0];
    },


    async update(id, wallpaper, id_criador, descricao) {
        const res = await query(
            `UPDATE wallpapers
             SET wallpaper = $1,
                 id_criador = $2,
                 descricao = $3
             WHERE id = $4
             RETURNING *;`,
            [wallpaper, id_criador, descricao, id]
        );

        return res.rows.length > 0 ? res.rows[0] : null;
    },


    async delete(id) {
        const res = await query(
            `DELETE FROM wallpapers
             WHERE id = $1
             RETURNING *;`,
            [id]
        );

        return res.rows.length > 0 ? res.rows[0] : null;
    }

};