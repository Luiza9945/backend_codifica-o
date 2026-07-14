import animalService from "../services/animalService.js"

export const animalController = {
    async getAll(req, res){
        try{ 
            const animais = await animalService.getAllAnimais();
            res.json(animais);
        }catch(error){
            res.status(404).json({erro: error.message})
        }
    },

    async create(req, res){
        try{
            const novoAnimal = await animalService.createAnimal(req.body);
            res.status(201).json(novoAnimal);
        }catch(error){
            res.status(400).json({erro: error.message});
        }
    },

    async update(req, res){
        try{
            const animalAtualizado = await animalService.updateAnimal(
                req.params.id, req.body)
            res.json(animalAtualizado)
        }catch(error){
            const status = error.message === "Animal não encontrado" ? 404 : 400;
            res.status(status).json({erro: error.message});
        }
    }


}


