import pool from '../config/db.js' // Ajuste o caminho para onde salvou o arquivo do pool

export const filmesService = {
    // 1. Buscar todos os filmes
    getAll: async () => {
        const query = 'SELECT * FROM filmes ORDER BY id ASC;'
        const resultado = await pool.query(query)
        return resultado.rows // Retorna a lista de filmes encontrada
    },

    // 2. Buscar um filme por ID
    getById: async (id) => {
        const query = 'SELECT * FROM filmes WHERE id = $1;'
        const resultado = await pool.query(query, [id])
        return resultado.rows[0] // Retorna apenas o filme encontrado ou undefined
    },

    // 3. Criar um novo filme
    create: async (nome, data_lancamento, genero) => {
        const query = `
            INSERT INTO filmes (nome, data_lancamento, genero) 
            VALUES ($1, $2, $3) 
            RETURNING *;
        `
        const valores = [nome, data_lancamento, genero]
        const resultado = await pool.query(query, valores)
        return resultado.rows[0] // Retorna o filme que acabou de ser criado
    },

    // 4. Atualizar um filme existente
    update: async (id, nome) => {
        const query = `
            UPDATE filmes 
            SET nome = $1 
            WHERE id = $2 
            RETURNING *;
        `
        const resultado = await pool.query(query, [nome, id])
        return resultado.rows[0] // Retorna o filme atualizado ou undefined se não achar
    }
}


export const filmesService = new filmesService()