const Usuario = require('../models/usuario');  // Importa o modelo de Usuário

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      erro: 'Campos obrigatórios ausentes',
      mensagem: 'Nome e email são obrigatórios para cadastrar um usuário.'
    });
  }

  try {
    const novoUsuario = await Usuario.criar(nome, email, telefone);

    console.log('👤 Novo usuário criado:', novoUsuario);

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso.',
      usuario: novoUsuario
    });
  } catch (err) {
    console.error('❌ Erro ao criar usuário:', err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Ocorreu um erro ao tentar criar o usuário.',
      detalhes: err.message
    });
  }
};

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.listarTodos();

    res.status(200).json({
      mensagem: 'Lista de usuários.',
      total: usuarios.length,
      usuarios: usuarios
    });
  } catch (err) {
    console.error('❌ Erro ao listar usuários:', err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Não foi possível listar os usuários.',
      detalhes: err.message
    });
  }
};

// Atualizar um usuário pelo ID

exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  if (!nome && !email && !telefone) {
    return res.status(400).json({
      erro: 'Nenhum campo informado',
      mensagem: 'Informe pelo menos um campo para atualizar.'
    });

  }

  try {
    const usuarioAtualizado = await Usuario.atualizar(id, nome, email, telefone);
    if (!usuarioAtualizado) {
      return res.status(404).json({
        erro: 'Usuário não encontrado',
        mensagem: `Nenhum usuário com o ID ${id} foi encontrado para atualização.`
      });
    }

    console.log('✏️ Usuário atualizado:', usuarioAtualizado);

    res.status(200).json({
      mensagem: 'Usuário atualizado com sucesso.',
      usuario: usuarioAtualizado
    });
  } catch (err) {
    console.error(`❌ Erro ao atualizar usuário com ID ${id}:`, err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Não foi possível atualizar o usuário.',
      detalhes: err.message
    });
  }
};

// Excluir um usuário pelo ID
exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;

  try {
tus(500).json({ error: 'Erro ao excluir o usuário.' });
    const usuarioAntesExclusao = await Usuario.buscarPorId?.(id); // Verifica se existe a função
    const excluido = await Usuario.excluir(id);

    if (!excluido) {
      return res.status(404).json({
        erro: 'Usuário não encontrado',
        mensagem: `Nenhum usuário com o ID ${id} foi encontrado para exclusão.`
      });
    }

    console.log('🗑️ Usuário excluído:', usuarioAntesExclusao || { id });

    res.status(200).json({
      mensagem: `Usuário com ID ${id} excluído com sucesso.`,
      usuario: usuarioAntesExclusao || { id }
    });
  } catch (err) {
    console.error(`❌ Erro ao excluir usuário com ID ${id}:`, err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Não foi possível excluir o usuário.',
      detalhes: err.message
    });
  }
};


exports.listarLivrosDoUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const livros = await Usuario.listarLivrosDoUsuario(id);
    res.status(200).json({
      mensagem: `Livros do usuário ${id}`,
      total: livros.length,
      livros
    });
  } catch (err) {
    console.error(`❌ Erro ao listar livros do usuário ${id}:`, err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Não foi possível listar os livros deste usuário.',
      detalhes: err.message
    });
  }
};

exports.listarUsuariosComLivros = async (req, res) => {
  try {
    const usuarios = await Usuario.listarUsuariosComLivros();
    res.status(200).json({
      mensagem: 'Lista de usuários com seus livros.',
      total: usuarios.length,
      usuarios
    });
  } catch (err) {
    console.error('❌ Erro ao listar usuários com livros:', err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Não foi possível listar os usuários com livros.',
      detalhes: err.message
    });
  }
};

