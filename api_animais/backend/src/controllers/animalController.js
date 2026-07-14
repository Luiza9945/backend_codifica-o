import animalService from "../services/animalService"
export const animalController = {

    async getAll(req, res) {
        try {
            const animais = await animalService.getAllAnimais();
            res.json(animais);
        }
        catch (error) {
            res.status(404).json({ erro: error.menssage })
        }
    },

    async create (req , res ) {
        try{
            const novoAnimal = await animalService.createAnimal(req.body);
            res.status(201).json(novoAnimal);
        }
        catch (error) {
            res.status(400).json({ erro: error.menssage })
        }
    }
}

