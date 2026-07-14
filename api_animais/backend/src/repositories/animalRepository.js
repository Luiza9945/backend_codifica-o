import query from "../config/db.js"

export const animalRepository = {
    async findAll(){
        const res = await query("SELECT * FROM {nome_tabela} ORDER BY id;");
        return res.rows;
    },

    async create(animal){
        const { nome, especie, idade, status_saude } = animal;
        const sql = 'INSERT INTO animal (nome, especie, idade, status_saude) VALUES ($1, $2, $3, $4) RETURNING *;';
        const res = await query(sql, [nome, especie, idade, status_saude]);
        return res.rows[0]
    },

    async findById(id){
        const res = await query('SELECT * FROM animal where id = $1;',[id]);
        return res.rows[0]
    },

    async update(id, animal){
        const { nome, especie, idade, status_saude } = animal;
        const sql = 'UPDATE animal SET nome = $1, especie = $2, idade = $3, status_saude = $4 WHERE id = $5 RETURNING *;';
        const res = await query(sql, [nome, especie, idade, status_saude, id]);
        return res.rows[0]
    }

}