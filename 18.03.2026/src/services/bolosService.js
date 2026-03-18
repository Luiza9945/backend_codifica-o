//moke: simula um baco de dados

const bolos = [
  {id:1, tipo:"Morango", classe: "Comia tudo"},
  {id:2, tipo:"Red-Velvt", classe: "Muito boom"},
  {id:3, tipo:"Chocolatudo", classe: "Bom demais"}
]

class bolosService {

    getAll(){
     return bolos
    }
}

export const bolosservice = new bolosService()