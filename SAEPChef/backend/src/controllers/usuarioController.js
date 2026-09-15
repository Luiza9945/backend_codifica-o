import {usuarioService} from "../services/usuarioService.js"

export const usuarioController = {
    async getAll(req, res){
        try{ 
            const usuarios = await usuarioService.getAllusuarios();
            res.json(usuarios);
        }catch(error){
            res.status(404).json({erro: error.message})
        }
    },


    async get(req , res){
        try{
           const usuario = await usuarioService.getAllusuario(req.params.id);
           res.json(usuario)
        }
        catch(error){
            res.status(404).json({erro: error.message})
        }
    }

}


