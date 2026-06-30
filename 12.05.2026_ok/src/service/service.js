import pool from "../config/db.js"

class VendaService {

    async getVendasByCliente(id) {

        const resultado = await pool.query(`
            SELECT
            clientes.nome AS cliente,
            frutas.nome AS fruta,
            vendas.quantidade
            FROM vendas
            INNER JOIN clientes
            ON vendas.cliente_id = clientes.id
            INNER JOIN frutas
            ON vendas.fruta_id = frutas.id
            WHERE clientes.id = $1
        `, [id])

        return resultado.rows
    }
}

export default new VendaService()