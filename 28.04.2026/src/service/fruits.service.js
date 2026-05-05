import { pool } from "../config/db.js"

class FrutasService {
    async getAll(){
        try{
            const query = "SELECT * FROM frutas"
            const res = await pool.query(query)
            return(res.rows);
            
        } catch (error) {
            console.error(error);
        
        }
    }

    getById(id) {
        return fruits.find(f => f.id === parseInt(id))
    }

    create(nome) {
        const newFruit = {
            id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
            nome
        }
        fruits.push(newFruit)
        return newFruit
    }

     update(id, novoObjeto) {
        const fruta = fruits.find(f => f.id === parseInt(id));
        if (fruta) {
            fruta.nome = novoObjeto;
            return fruta;
        }
        return null;
    }

    patch(id, nome) {
        console.log(nome);
        
    const index = fruits.findIndex((fruta) => fruta.id === parseInt(id));
    console.log(index);
    

    if (index === -1) return null;

    fruits[index].nome = nome

    return fruits;
    }

    delete(id) {
        const index = fruits.findIndex(f => f.id === parseInt(id));
        
        if (index !== -1) {
            const deletado = fruits.splice(index, 1); 
            return deletado[0]; 
        }
        
        return null; 
    }
    

}

export const fruitsService = new FrutasService()