const request = require('supertest');
const app = require('../app'); // app.js exporta apenas o app Express

let livroId = null;  // variável para armazenar o id do livro criado

async function criarLivro() {
  try {
    const res = await request(app)
      .post('/api/livros')
      .send({
        titulo: 'Livro Exemplo',
        autor: 'Autor Exemplo',
        ano: 2020,
        genero: 'Ficção'
      });

    if (res.statusCode === 201 && res.body.id) {
      livroId = res.body.id;  // guarda o id
      console.log('✔️  Criou livro com sucesso (POST /api/livros), id:', livroId);
    } else {
      console.error('❌  Falha ao criar livro. Status:', res.statusCode, 'Body:', res.body);
    }
  } catch (err) {
    console.error('❌  Erro ao criar livro:', err.message);
  }
}

async function listarLivros() {
  try {
    const res = await request(app).get('/api/livros');
    if (res.statusCode === 200 && Array.isArray(res.body)) {
      console.log('✔️  Listou livros com sucesso (GET /api/livros)');
    } else {
      console.error('❌  Falha ao listar livros. Status:', res.statusCode);
    }
  } catch (err) {
    console.error('❌  Erro ao listar livros:', err.message);
  }
}

async function atualizarLivro() {
  if (!livroId) {
    console.error('❌  Livro não criado, não pode atualizar.');
    return;
  }
  try {
    const res = await request(app)
      .put(`/api/livros/${livroId}`)
      .send({ titulo: 'Livro Atualizado', autor: 'Autor Atualizado' });

    if (res.statusCode === 200) {
      console.log(`✔️  Atualizou livro com sucesso (PUT /api/livros/${livroId})`);
    } else {
      console.error('❌  Falha ao atualizar livro. Status:', res.statusCode);
    }
  } catch (err) {
    console.error('❌  Erro ao atualizar livro:', err.message);
  }
}

async function excluirLivro() {
  if (!livroId) {
    console.error('❌  Livro não criado, não pode excluir.');
    return;
  }
  try {
    const res = await request(app).delete(`/api/livros/${livroId}`);
    if (res.statusCode === 204) {
      console.log(`✔️  Excluiu livro com sucesso (DELETE /api/livros/${livroId})`);
    } else {
      console.error('❌  Falha ao excluir livro. Status:', res.statusCode);
    }
  } catch (err) {
    console.error('❌  Erro ao excluir livro:', err.message);
  }
}

// Executa os testes em sequência
async function rodarTestesLivros() {
  await criarLivro();
  await listarLivros();
  await atualizarLivro();
  await excluirLivro();
}

rodarTestesLivros();
