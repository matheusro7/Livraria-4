const express = require('express');
const path = require('path');
const app = express();

const livrosRouter = require('./routes/livros'); // Importa as rotas de Livros
const usuariosRouter = require('./routes/usuarios'); // Importa as rotas de Usuários

app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Define as rotas para Livros e Usuários, prefixando com '/api'
app.use('/api/livros', livrosRouter);
app.use('/api/usuarios', usuariosRouter);

// Serve arquivos estáticos (CSS, JS, Imagens) a partir da pasta 'public'
app.use(express.static('public'));


// Configura o motor de templates para EJS
app.set('view engine', 'ejs');

// Define o diretório onde os templates EJS serão armazenados
app.set('views', './views');

// Rota para a página inicial
app.get('/', (req, res) => {
    res.render('index');  // Renderiza o arquivo views/index.ejs
  });
  
  // Rota para listar os usuários
  app.get('/usuarios', async (req, res) => {
    const usuarios = await obterUsuariosDoBanco();  // Função para obter os usuários do banco
    res.render('usuarios', { usuarios });  // Passa os dados dos usuários para o template
  });
  
  // Rota para listar os livros
  app.get('/livros', async (req, res) => {
    const livros = await obterLivrosDoBanco();  // Função para obter os livros do banco
    res.render('livros', { livros });  // Passa os dados dos livros para o template
  });

  // Rota para criar um novo usuário
app.post('/usuarios', async (req, res) => {
    try {
      await criarUsuario(req.body.nome, req.body.email, req.body.telefone);
      res.redirect('/usuarios');  // Após criar, redireciona para a lista de usuários
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao criar o usuário');
    }
  });
  
  

module.exports = app; // Exporta o app, mas não roda o servidor aqui
