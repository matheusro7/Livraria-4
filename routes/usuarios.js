const express = require('express');
const router = express.Router();
const usuariosControllers = require('../controllers/usuariosControllers');  // Importa o controlador de usuários

// Rota para criar um novo usuário
router.post('/', usuariosControllers.criarUsuario);

// Rota para listar todos os usuários
router.get('/', usuariosControllers.listarUsuarios);

// Rota para atualizar um usuário
router.put('/:id', usuariosControllers.atualizarUsuario);

// Rota para excluir um usuário
router.delete('/:id', usuariosControllers.excluirUsuario);

module.exports = router;  // Exporta o router
