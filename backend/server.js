const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as agora');
    res.send(`Ambiente configurado com sucesso! Hora no banco: ${result.rows[0].agora}`);
  } catch (error) {
    res.status(500).send('Erro ao conectar ao banco: ' + error.message);
  }
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
