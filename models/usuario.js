const pool = require('../config/db');  // Ajuste o caminho conforme seu projeto

exports.criar = async (nome, email, telefone) => {
  const query = `
    INSERT INTO usuarios (nome, email, telefone)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [nome, email, telefone];
  const res = await pool.query(query, values);
  return res.rows[0];
};

exports.listarTodos = async () => {
  const res = await pool.query('SELECT * FROM usuarios;');
  return res.rows;
};

exports.atualizar = async (id, nome, email, telefone) => {
  // Atualiza apenas os campos que foram enviados (exemplo simples)
  const query = `
    UPDATE usuarios
    SET nome = COALESCE($2, nome),
        email = COALESCE($3, email),
        telefone = COALESCE($4, telefone)
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, nome, email, telefone];
  const res = await pool.query(query, values);
  return res.rows[0] || null;
};

exports.excluir = async (id) => {
  const res = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *;', [id]);
  return res.rowCount > 0;
};

exports.buscarPorId = async (id) => {
  const res = await pool.query('SELECT * FROM usuarios WHERE id = $1;', [id]);
  return res.rows[0] || null;
};

