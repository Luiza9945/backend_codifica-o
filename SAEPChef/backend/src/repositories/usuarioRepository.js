import { query } from "../config/db.js"

export const usuarioRepository = {
    
    async findAll() {
        const res = await query("SELECT * FROM usuario ORDER BY id;");
        return res.rows;
    },

    async findById(id) {
        const res = await query('SELECT * FROM usuario WHERE id = $1;', [id]);
        return res.rows[0];
    },


}
