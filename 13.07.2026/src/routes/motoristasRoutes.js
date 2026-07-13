import express from "express";
import { listaMotoristas } from "../services/motoristasService.js"

const route = express.Router()

route.get("/", async (req, res) => {
    try {
        const motoristas = await listaMotoristas.getAll()
        res.json(motoristas)
    }

    catch
    (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao buscar motorista"
        })
    }
})

route.get("/:id", async (req , res) => {
    try{
        const motorista = await listaMotoristas.getById()
        const {id} =req.params

        if(!motorista){ 
            return  res.status(404).json({
                success: false,
                data: null,
                message: "Motorista não encontrado"
            }) 
            res.json(motorista)} 
    }
    catch
        (error) {
            res.status(500).json({
                success: false,
                data: null,
                message: "Erro ao buscar motorista"
            })
        }
    })

route.post("/", async (req , res) =>{

    try{
        const  motoristaData = req.body
        const newMotorista = await listaMotoristas.create(motoristaData)

        res.status(201).json(newMotorista)
    }

    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao criar motorista"
        })
    }
})

route.put("/:id" , async (req, res) =>{

    try{
        const {id} = req.params
        const motoristaData = req.bory
    }
})