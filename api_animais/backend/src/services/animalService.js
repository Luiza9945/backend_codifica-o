import {animalRepository} from "../repositories/animalRepository.js"

export const animalService = {
    async getAllAnimais() {
        return await animalRepository.findAll();
    },

    async getAnimal(id) {
        const animalExistente = await animalRepository.findById(id);
        if (!animalExistente) {
            throw new Error("Animal não encontrado");
        }
        return animalExistente
    },

    async createAnimal(animalRequisicao) {
        if (animalRequisicao.idade < 0) {
            throw new Error('A idade do animal tem que ser maior do que 0.')
        }
        return await animalRepository.create(animalRequisicao);
    },

    async updateAnimal(id, animalRequisicao) {
        const animalExistente = await animalRepository.findById(id);
        if (!animalExistente) {
            throw new Error("Animal não encontrado");
        }
        return await animalRepository.update(id, animalRequisicao)
    },

    async patchAnimal(id, animalRequisicao) {
        const animalExistente = await animalRepository.findById(id);
        if (!animalExistente) {
            throw new Error("Animal não encontrado");
        }
        return await animalRepository.patch(id, animalRequisicao)
    },

    async deleteAnimal(id) {
        const animalExistente = await animalRepository.findById(id);
        if (!animalExistente) {
            throw new Error("Animal não encontrado");
        }
        return await animalRepository.delete(id, animalRequisicao)
    }
}