const express = require('express');
const pool = require('./db.js');
const app = express();
app.use(express.json());
// LISTAR tarefas (com filtro opcional por status)
app.get('/tarefas', async (req, res) => {
    try {
        const { concluida, pagina = 1, limite = 5 } = req.query;

        const numeroPagina = Math.max(1, parseInt(pagina) || 1);
        const quantidade = Math.max(1, parseInt(limite) || 5);
        const offset = (numeroPagina - 1) * quantidade;

        let query = 'SELECT * FROM tarefas';
        let params = [];
        let filtros = [];

        if (concluida !== undefined) {
            params.push(concluida === 'true');
            filtros.push(`concluida = $${params.length}`);
        }

        if (filtros.length > 0) {
            query += ' WHERE ' + filtros.join(' AND ');
        }

        query += ` ORDER BY id LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;

        params.push(quantidade, offset);

        const resultado = await pool.query(query, params);

        res.json({
            pagina: numeroPagina,
            limite: quantidade,
            tarefas: resultado.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar tarefas' });
    }
});
// BUSCAR uma tarefa especifica
app.get('/tarefas/:id', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM tarefas WHERE id = $1', [req.params.id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Tarefa nao encontrada' });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar tarefa' });
    }
});
// ESTATÍSTICAS das tarefas por prioridade
app.get('/tarefas/estatisticas', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT prioridade, COUNT(*) AS quantidade
            FROM tarefas
            GROUP BY prioridade
            ORDER BY prioridade;
        `);

        res.json(resultado.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao buscar estatísticas'
        });
    }
});

// CRIAR uma nova tarefa
app.post('/tarefas', async (req, res) => {
    try {
        const { titulo } = req.body;
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

        const resultado = await pool.query(
            'INSERT INTO tarefas (titulo) VALUES ($1) RETURNING *',
            [titulo.trim()]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao criar tarefa'
        });
    }
});
// ATUALIZAR uma tarefa
app.put('/tarefas/:id', async (req, res) => {
    try {
        const { titulo, concluida } = req.body;
        const tarefaAtual = await pool.query('SELECT * FROM tarefas WHERE id = $1', [req.params.id]);
        if (tarefaAtual.rows.length === 0) {
            return res.status(404).json({ erro: 'Tarefa nao encontrada' });
        }
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
        }
        const atual = tarefaAtual.rows[0];
        const novoTitulo = titulo !== undefined? titulo.trim(): atual.titulo;
        const novaConcluida = concluida !== undefined ? concluida : atual.concluida;
        const resultado = await pool.query(
            'UPDATE tarefas SET titulo = $1, concluida = $2 WHERE id = $3 RETURNING *',
            [novoTitulo, novaConcluida, req.params.id]
        );
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
    }
});
// DELETAR uma tarefa
app.delete('/tarefas/:id', async (req, res) => {
    try {
        const resultado = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [req.params.id]);
        if (resultado.rows.length === 0) { return res.status(404).json({ erro: 'Tarefa nao encontrada' }); }

        res.json({
            mensagem: 'Tarefa deletada com sucesso!',
            tarefa: resultado.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao deletar tarefa' });
    }
});
app.listen(3000, () => console.log('API rodando na porta 3000'));

//migrations são preferíveis porque tornam as alterações do banco de dados mais organizadas, rastreáveis e reproduzíveis, principalmente em projetos que crescem ou são desenvolvidos em equipe.

//a versão atual mantém os dados salvos no banco de dados, enquanto a Versão 1 perde os dados que não foram armazenados de forma permanente.