const pool = require('../config/db');  // ajuste o caminho conforme seu projeto

exports.criar = async (titulo, autor, ano_publicacao, isbn) => {
  const query = `
    INSERT INTO livros (titulo, autor, ano_publicacao, isbn)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [titulo, autor, ano_publicacao, isbn];
  const res = await pool.query(query, values);
  return res.rows[0];
};

exports.listarTodos = async () => {
  const res = await pool.query('SELECT * FROM livros;');
  return res.rows;
};

exports.atualizar = async (id, titulo, autor, ano_publicacao, isbn) => {
  const query = `
    UPDATE livros
    SET titulo = COALESCE($2, titulo),
        autor = COALESCE($3, autor),
        ano_publicacao = COALESCE($4, ano_publicacao),
        isbn = COALESCE($5, isbn)
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, titulo, autor, ano_publicacao, isbn];
  const res = await pool.query(query, values);
  return res.rows[0] || null;
};

exports.excluir = async (id) => {
  const res = await pool.query('DELETE FROM livros WHERE id = $1 RETURNING *;', [id]);
  return res.rowCount > 0;
};

exports.buscarPorId = async (id) => {
  const res = await pool.query('SELECT * FROM livros WHERE id = $1;', [id]);
  return res.rows[0] || null;
};

exports.criar = async (titulo, autor, ano_publicacao, isbn, usuario_id) => {
  const query = `
    INSERT INTO livros (titulo, autor, ano_publicacao, isbn, usuario_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [titulo, autor, ano_publicacao, isbn, usuario_id];
  const res = await pool.query(query, values);
  return res.rows[0];
};
