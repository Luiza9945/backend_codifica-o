// Mock de dados

const fruits = [
    { id: 1, nome: "Maça" },
    { id: 2, nome: "Pera" }
]

class FruitService {
    getAll() {
        return fruits
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

   }

export const fruitService = new FruitService()