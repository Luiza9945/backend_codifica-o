import { lerDados , salvarDados } from "../config/db.js";

async function getAll() {
  
    return await lerDados()
}

async function getById(id) {
    const motoristas = await lerDados()
    return motoristas.find((motoristas) => motoristas.id === Number(id))
}

async function create( motoristas){

    const motoristas = await lerDados()
    const nextId = motoristas.length > 0? Math.max(...motoristas.map((motoristas) => motoristas.id)) + 1:1
    const newMotorista = {id: nextId , ...motoristas}

    motoristas.push(newMotorista)
    await salvarDados 
    return newMotorista
}

async function update (id,motoristas){

    const index = motoristas.findIndex( (motoristas) => motoristas.id === Number(id))

    if(index ===  -1){
        return null
    }

    motoristas[index] = {id:Number(id), ...motoristas}
    await salvarDados (motoristas)
    return motoristas [index]
}

async function patch (id , motoristas){

    const motoristas = await lerDados()
    const index = motoristas.findIndex( (motoristas) => motoristas.id === Number(id))

    if(index ===  -1){
        return null
    }
    
    motoristas[index] = {id:Number(id), ...motoristas}
    await salvarDados (motoristas)
    return motoristas [index]

}

async function remove (id){

 const motoristas = await lerDados()
 const index = motoristas.findIndex((motoristas) => motoristas.id ===  Number(id))

 if(index === -1){
    return null
 }

 const deleteMotorista =  motoristas.splice(index,1)[0] 

 await salvarDados(motoristas)
 return deleteMotorista
}

export const listaMotoristas = {

    getAll,
    getById, 
    create , 
    update ,
    patch,
    delete:remove
}