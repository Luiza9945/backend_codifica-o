const clinicas = [
{id:1 , nome:"Dores do amor" , especialidade:"cardiologia"  },
{id:2 , nome:"Estrada sincera", especialidade: "Terapia"}
]

class ClinicasServece {

    getAll() {
        return clinicas
    }

    getById(id) {
        return clinicas.find(f => f.id === parseInt(id))
    }

    create (nome) {

        const novoNome = {

            id: clinicas.length  > 0 ? clinicas [clinicas.length-1]. id + 1:1 , nome
        }

        clinicas.push(novoNome)
        return novoNome
    }

    update (id , novoNome) {
    
     const clinica = clinicas.find(f => f.id === parseInt(id));
            if (clinica) {
                clinica.nome = novoNome;
                return clinica;
            }
            return null;
        }
    
    }
   

    export const clinicasServece = new ClinicasServece()   




