import vendaService from "../service/service.js"

class VendaController {

    async getByCliente(req, res) {

        try {

            const { id } = req.params

            const vendas = await vendaService.getVendasByCliente(id)

            res.status(200).json(vendas)

        } catch (error) {

            res.status(500).json({
                mensagem: "Erro ao buscar vendas"
            })
        }
    }
}

export default new VendaController()