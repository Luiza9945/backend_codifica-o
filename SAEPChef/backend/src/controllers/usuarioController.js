import {usuarioService} from "../services/usuarioService.js"

export const usuarioController = {
    async getAll(req, res){
        try{ 
            const usuarios = await usuarioService.getAllUsuarios();
            res.json(usuarios);
        }catch(error){
            res.status(404).json({erro: error.message})
        }
    },


    async get(req , res){
        try{
           const usuario = await usuarioService.getUsuario(req.params.id);
           res.json(usuario)
        }
        catch(error){
            res.status(404).json({erro: error.message})
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const usuarioAutenticado = await usuarioService.login(email, senha);
            
            return res.status(200).json(usuarioAutenticado);
        } catch (error) {
            if (error.message === "E-mail ou senha inválidos") {
                return res.status(401).json({ erro: error.message }); 
            }
            
            return res.status(500).json({ erro: "Erro interno no servidor de login" });
        }
    }
}




