import query from "../config/db.js"

export const animalRepositories = {

    async findAll(){
        const res = await query("SELECT * FROM { nome_tabela} ORDER BY id")
        return res.rows;
    }

    async create (animal){
        
    }
}