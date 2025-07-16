const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosControllers');  // Importa o controlador de livros

// Rota para criar um novo livro
router.post('/', livrosController.criarLivro);

// Rota para listar todos os livros
router.get('/', livrosController.listarLivros);

// Rota para atualizar um livro
router.put('/:id', livrosController.atualizarLivro);

// Rota para excluir um livro
router.delete('/:id', livrosController.excluirLivro);

module.exports = router;  // Exporta o router para ser usado no app principal
