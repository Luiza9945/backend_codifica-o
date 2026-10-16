const express = require('express');
const app = express();
app.use(express.json());


let tarefas = [
    { id: 1, titulo: 'Aprender Express', prioridade: "média", concluida: false },
    { id: 2, titulo: 'Criar minha primeira API', prioridade: "alta", concluida: false }];

let proximoId = 3;

// LISTAR todas as tarefas (com filtro opcional por status)
app.get('/tarefas', (req, res) => {
    const { concluida } = req.query;
    let resultado = tarefas;
    if (concluida !== undefined) {
        resultado = tarefas.filter(t => t.concluida === (concluida === 'true'));
    }
    res.json(resultado);
});

app.get('/tarefas/resumo', (req, res) => {
    const concluidas = tarefas.filter(t => t.concluida === true).length;
    const pendentes = tarefas.filter(t => t.concluida === false).length;

    res.json({
        concluidas: concluidas,
        pendentes: pendentes
    });
});

// BUSCAR uma tarefa especifica
app.get('/tarefas/:id', (req, res) => {
    const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa nao encontrada' });
    res.json(tarefa);
});
// CRIAR uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { titulo } = req.body;

    // Verifica se o título é um texto
    if (typeof titulo !== 'string') {
        return res.status(400).json({
            erro: 'O titulo deve ser um texto'
        });
    }

    // Verifica se o título está vazio
    if (titulo.trim() === '') {
        return res.status(400).json({
            erro: 'O titulo nao pode estar vazio'
        });
    }

    // Verifica se o título tem no máximo 255 caracteres
    if (titulo.trim().length > 255) {
        return res.status(400).json({
            erro: 'O titulo deve ter no maximo 255 caracteres'
        });
    }

    // Verifica se já existe uma tarefa com esse título
    const tarefaExiste = tarefas.find(
        t => t.titulo.toLowerCase() === titulo.trim().toLowerCase()
    );

    if (tarefaExiste) {
        return res.status(400).json({
            erro: 'Ja existe uma tarefa com esse titulo'
        });
    }

    // Cria a nova tarefa
    const novaTarefa = {
        id: proximoId++,
        titulo: titulo.trim(),
        prioridade: 'média',
        concluida: false
    };

    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
});
// ATUALIZAR uma tarefa (ex: marcar como concluida)
app.put('/tarefas/:id', (req, res) => {
    const tarefa = tarefas.find(
        t => t.id === parseInt(req.params.id)
    );

    if (!tarefa) {
        return res.status(404).json({
            erro: 'Tarefa nao encontrada'
        });
    }

    const { titulo, concluida } = req.body;

    // Valida o título somente se ele foi enviado
    if (titulo !== undefined) {
        if (typeof titulo !== 'string') {
            return res.status(400).json({
                erro: 'O titulo deve ser um texto'
            });
        }

        if (titulo.trim() === '') {
            return res.status(400).json({
                erro: 'O titulo nao pode estar vazio'
            });
        }

        if (titulo.trim().length > 255) {
            return res.status(400).json({
                erro: 'O titulo deve ter no maximo 255 caracteres'
            });
        }

        // Verifica se outra tarefa já possui esse título
        const tarefaExiste = tarefas.find(
            t => t.id !== tarefa.id &&
            t.titulo.toLowerCase() === titulo.trim().toLowerCase()
        );

        if (tarefaExiste) {
            return res.status(400).json({
                erro: 'Ja existe uma tarefa com esse titulo'
            });
        }

        tarefa.titulo = titulo.trim();
    }

    // Atualiza a conclusão somente se for um booleano
    if (concluida !== undefined) {
        if (typeof concluida !== 'boolean') {
            return res.status(400).json({
                erro: 'O campo concluida deve ser true ou false'
            });
        }

        tarefa.concluida = concluida;
    }

    res.json(tarefa);
});
// DELETAR uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ erro: 'Tarefa nao encontrada' });
    tarefas.splice(index, 1);
    res.status(204).send();
});

app.delete('/tarefas', (req, res) => {
    tarefas = tarefas.filter(t => t.concluida === false);

    res.json({
        mensagem: 'Tarefas concluídas apagadas com sucesso!',
        tarefas: tarefas
    });
});


app.listen(1000, () => console.log('API de tarefas rodando na porta http://localhost:1000'));


//As tarefas criadas durante a execução anterior não forai salva em banco de dados ou em um arquivo