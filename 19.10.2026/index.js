
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '10kb' }));

// Conexão protegida por variáveis de ambiente
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});

// Verifica se o ID é um número inteiro positivo
function idValido(id) {
  return /^[1-9]\d*$/.test(id);
}

// GET /tarefas — lista todas as tarefas
app.get('/tarefas', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM tarefas ORDER BY id'
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error.message);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// GET /tarefas/buscar?termo=estudar
app.get('/tarefas/buscar', async (req, res) => {
  try {
    const { termo } = req.query;

    if (typeof termo !== 'string' ||
        termo.trim().length === 0 ||
        termo.length > 100) {
      return res.status(400).json({
        erro: 'Informe um termo de busca válido.'
      });
    }

    // Consulta parametrizada: evita SQL Injection
    const resultado = await pool.query(
      "SELECT * FROM tarefas WHERE titulo LIKE $1 ORDER BY id",
      [`%${termo.trim()}%`]
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error.message);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// POST /tarefas — cria uma tarefa
app.post('/tarefas', async (req, res) => {
  try {
    const { titulo } = req.body;

    if (typeof titulo !== 'string' ||
        titulo.trim().length === 0 ||
        titulo.trim().length > 150) {
      return res.status(400).json({
        erro: 'O título deve ter entre 1 e 150 caracteres.'
      });
    }

    // O valor é enviado separadamente do comando SQL
    const resultado = await pool.query(
      'INSERT INTO tarefas (titulo, concluida) VALUES ($1, false) RETURNING *',
      [titulo.trim()]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error.message);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// PUT /tarefas/:id — marca uma tarefa como concluída
app.put('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!idValido(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }

    const resultado = await pool.query(
      'UPDATE tarefas SET concluida = true WHERE id = $1 RETURNING *',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error.message);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// DELETE /tarefas/:id — apaga uma tarefa
app.delete('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!idValido(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }

    const resultado = await pool.query(
      'DELETE FROM tarefas WHERE id = $1 RETURNING id',
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error.message);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// Inicialização do servidor
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API de treinamento rodando em http://127.0.0.1:${PORT}`);
});
