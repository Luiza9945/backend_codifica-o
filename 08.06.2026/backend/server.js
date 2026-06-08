import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = Process.env.PORT || 3000

// configuração para ler json no corpo das requisições 

let chats = [

    {
        id: "order-101",
        orderStatus: "A caminho",
        driver: { name: "Carlos ", phone: "(11) 12344-4444" },
        customer: { name: "Ana Souza" },
        menssages: [
            { id: 1, sender: "system", text: "Pedido em processo...", timetamp: "20:15" },
            { id: 2, sender: "driver", text: "Ola Ana , estou a caminho...", timetamp: "20:16" }]
    }
]

app.use(express.json())


app.get('api/chats', (req, res) => {
    res.send(chats)
})

//buscar detalhes de um chat específico
app.get('api/chats/:orderId', (req, res) => {
    const chat = chats.find(c=>c.id === req.params.orderId);

    if (!chat) {

        return res.status(404).json({error: "Chat/Pedido não encontrado"});
        
    }
})

app.post('api/chats/:orderId/menssages' , (req , res) =>{
    const{orderId}= req.params;
    const {sender , text} = req.body;
    if (!sender|| !text){
        return res.status(404).json({error : "Os campos sender e text são obrigatorios"});
    };

    const chat  = chats.find(c=>c.id===orderId);
    if (!chat) {
        return res.status(404).json({error : "chat não encontrado"})
    };
    
})

const now = new Date()
const timetamp=`${String(now.getHours()).padStart(2,'0')}:
${String(now.getMinutes()).padStart(2, '0')}`;

const newMenssage = {
    id: chat.menssages.lemgth + 1 , 
    sender ,
    text,
    timetamp
};

const_filename = fileURLToPath(import.meta.url);
const_dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname , 'public')));

app.listen(port, () => {
    console.log(`Servidor ON em http://localhost:${port}`)
})
