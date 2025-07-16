const Livro = require('../models/livro');  // Importa o modelo de livros



// Criar um novo livro
exports.criarLivro = async (req, res) => {
  const { titulo, autor, ano_publicacao, isbn, usuario_id } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({
      erro: 'Campos obrigatórios ausentes',
      mensagem: 'Título e autor são obrigatórios para cadastrar um livro.'
    });
  }

  try {
    const novoLivro = await Livro.criar(titulo, autor, ano_publicacao, isbn, usuario_id);
    
    // Mostra todos os dados no console
    console.log('📚 Novo livro criado:', novoLivro);

    res.status(201).json({
      mensagem: 'Livro criado com sucesso.',
      livro: novoLivro
    });
  } catch (err) {
    console.error('❌ Erro ao criar livro:', err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Ocorreu um erro ao tentar criar o livro.',
      detalhes: err.message
    });
  }
};

// Listar todos os livros
exports.listarLivros = async (req, res) => {
  try {
    const livros = await Livro.listarTodos();
    res.status(200).json({
      mensagem: 'Lista de livros.',
      total: livros.length,
      livros: livros
    });
  } catch (err) {
    console.error('❌ Erro ao listar livros:', err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Não foi possível listar os livros.',
      detalhes: err.message
    });
  }
};

// Atualizar um livro pelo ID
exports.atualizarLivro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano_publicacao, isbn } = req.body;

  if (!titulo && !autor && !ano_publicacao && !isbn) {
    return res.status(400).json({
      erro: 'Nenhum campo informado',
      mensagem: 'Informe pelo menos um campo para atualizar.'
    });
  }

  try {
    const livroAtualizado = await Livro.atualizar(id, titulo, autor, ano_publicacao, isbn);
    if (!livroAtualizado) {
      return res.status(404).json({
        erro: 'Livro não encontrado',
        mensagem: `Nenhum livro com o ID ${id} foi encontrado para atualização.`
      });
    }

    // Mostra todos os dados atualizados no console
    console.log('📘 Livro atualizado:', livroAtualizado);

    res.status(200).json({
      mensagem: 'Livro atualizado com sucesso.',
      livro: livroAtualizado
    });
  } catch (err) {
    console.error(`❌ Erro ao atualizar livro com ID ${id}:`, err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Não foi possível atualizar o livro.',
      detalhes: err.message
    });
  }
};

// Excluir um livro pelo ID
exports.excluirLivro = async (req, res) => {
  const { id } = req.params;

  try {
    const livroAntesExclusao = await Livro.buscarPorId?.(id); // Verifica se função existe
    const excluido = await Livro.excluir(id);

    if (!excluido) {
      return res.status(404).json({
        erro: 'Livro não encontrado',
        mensagem: `Nenhum livro com o ID ${id} foi encontrado para exclusão.`
      });
    }

    // Mostra os dados do livro excluído
    console.log(`🗑️ Livro excluído:`, livroAntesExclusao || { id });

    res.status(200).json({
      mensagem: `Livro com ID ${id} excluído com sucesso.`,
      livro: livroAntesExclusao || { id }
    });
  } catch (err) {
    console.error(`❌ Erro ao excluir livro com ID ${id}:`, err.message);
    res.status(500).json({
      erro: 'Erro interno',
      mensagem: 'Não foi possível excluir o livro.',
      detalhes: err.message
    });
  }
};
