import { query } from "../config/db.js";

export const usuarioRepository = {

    async findAll() {
        const res = await query(
            "SELECT * FROM usuarios ORDER BY id;"
        );

        return res.rows;
    },

    async findById(id) {
        const res = await query(
            "SELECT * FROM usuarios WHERE id = $1;",
            [id]
        );

        return res.rows.length > 0 ? res.rows[0] : null;
    },

    async findByEmail(email) {
        const res = await query(
            "SELECT * FROM usuarios WHERE email = $1;",
            [email]
        );

        return res.rows.length > 0 ? res.rows[0] : null;
    },

    async create(nome, email, senha) {
        const res = await query(
            `INSERT INTO usuarios (nome, email, senha)
             VALUES ($1, $2, $3)
             RETURNING *;`,
            [nome, email, senha]
        );

        return res.rows[0];
    },

    async update(id, nome, email, senha) {
        const res = await query(
            `UPDATE usuarios
             SET nome = $1,
                 email = $2,
                 senha = $3
             WHERE id = $4
             RETURNING *;`,
            [nome, email, senha, id]
        );

        return res.rows.length > 0 ? res.rows[0] : null;
    },

    async delete(id) {
        const res = await query(
            "DELETE FROM usuarios WHERE id = $1 RETURNING *;",
            [id]
        );

        return res.rows.length > 0 ? res.rows[0] : null;
    }

};