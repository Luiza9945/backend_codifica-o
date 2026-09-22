import { query } from "../config/db.js"

export const usuarioRepository = {

    async findAll() {
        const res = await query("SELECT * FROM tb_usuario ORDER BY id_usuario;");
        return res.rows;
    },

    async findById(id) {
        const res = await query('SELECT * FROM tb_usuario WHERE id_usuario = $1;', [id]);
        return res.rows.length > 0 ? res.rows[0] : null;
    },

    async findByEmail(email) {
        const res = await query('SELECT * FROM tb_usuario WHERE email = $1;', [email]);
        return res.rows.length > 0 ? res.rows[0] : null;
    }

}
