
const fruits = [
    { id: 1, name: 'Maçã'},
    { id: 2, name: 'Melao'},
    { id: 3, name: 'Morango'},
    { id: 4, name: 'Pera'},
    { id: 5, name: 'Jambolão'},
    { id: 6, name: 'Banana' }
];

class FruitService {
    getAllFruits() {
        return fruits;
    }

    getFruitById(id) {
        return fruits.find((fruit) => fruit.id === parseInt(id))
    }
}

export const fruitService = new FruitService()