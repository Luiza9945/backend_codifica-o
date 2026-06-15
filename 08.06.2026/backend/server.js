import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'


const app = express()
const port = process.env.PORT || 4000


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}))


app.use(express.json())


let chats = [
    {
        id: "order-101",
        orderStatus: "Em andamento",
        agent: { id: "user_agent_1", name: "Carlos" },
        customer: {  id: "user_client_1", name: "Ana" },
        messages: [
             { id: 1, sender: "system", text: "Chat de suporte iniciado.", timestamp: "20:15" },
             { id: 2, sender: "customer", text: "Olá, preciso de ajuda com o meu pedido.", timestamp: "20:16" },
             { id: 3, sender: "agent", text: "Oi Ana! Sou o Carlos. Como posso te ajudar hoje?", timestamp: "20:17" }
        ]
    },
];


app.get('/api/chats/:orderId', (req, res) => {
    const chat = chats.find(c => c.id === req.params.orderId);
    if (!chat) return res.status(404).json({ error: "Chat/Pedido não encontrado" })
    res.json(chat);
});


app.post('/api/chats/:orderId/messages', (req, res) => {
    const { orderId } = req.params;
    const { sender, text } = req.body;
   
    if (!sender || !text) return res.status(400).json({ error: "Os campos sender e text são obrigatórios" });


    const chat = chats.find(c => c.id === orderId);
    if (!chat) return res.status(404).json({ error: "Chat não encontrado" });


    const now = new Date();
    const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;


    const newMessage = {
        id: chat.messages.length + 1,
        sender,
        text,
        timestamp
    };


    chat.messages.push(newMessage);
    return res.status(201).json(newMessage);
});


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);      
app.use(express.static(path.join(__dirname, '..', 'fronend')));


app.listen(port, () => { console.log(`Servidor ON em http://localhost:${port}`) })









