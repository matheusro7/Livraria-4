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

// Buscar livro do usuário
exports.listarLivrosDoUsuario = async (usuarioId) => {
  const query = 'SELECT * FROM livros WHERE usuario_id = $1';
  const res = await pool.query(query, [usuarioId]);
  return res.rows;
};

exports.listarUsuariosComLivros = async () => {
  const query = `
    SELECT 
      u.id AS usuario_id,
      u.nome,
      u.email,
      u.telefone,
      l.id AS livro_id,
      l.titulo,
      l.autor,
      l.ano_publicacao,
      l.isbn
    FROM usuarios u
    LEFT JOIN livros l ON u.id = l.usuario_id
    ORDER BY u.id;
  `;

  const res = await pool.query(query);

  // Agrupar os livros por usuário
  const usuariosMap = new Map();

  res.rows.forEach(row => {
    const usuarioId = row.usuario_id;

    if (!usuariosMap.has(usuarioId)) {
      usuariosMap.set(usuarioId, {
        id: usuarioId,
        nome: row.nome,
        email: row.email,
        telefone: row.telefone,
        livros: []
      });
    }

    if (row.livro_id) {
      usuariosMap.get(usuarioId).livros.push({
        id: row.livro_id,
        titulo: row.titulo,
        autor: row.autor,
        ano_publicacao: row.ano_publicacao,
        isbn: row.isbn
      });
    }
  });

  return Array.from(usuariosMap.values());
};