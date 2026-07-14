import animalRepositories from "../repositories/animalRepositories.js"

export const animalService = {
    async gatAllAnimais() {
        return await animalRepositories.findAll();
    },

    async createAnimal(animalRequisicao) {
        if (animalRequisicao.idade < 0) {
          throw new Error('idade do animal tem que ser maior do que 0.')
        }

        return await animalRepositories.create(animalRepositories)
    }
}
