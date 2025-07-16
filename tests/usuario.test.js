const request = require('supertest');
const app = require('../app'); // app.js exporta apenas o app Express

let usuarioId = null; // Armazena o ID do usuário criado

async function criarUsuario() {
  const emailAleatorio = `usuario_${Date.now()}@exemplo.com`; // e-mail único
  try {
    const res = await request(app)
      .post('/api/usuarios')
      .send({
        nome: 'Usuário Exemplo',
        email: emailAleatorio,
        telefone: '123456789'
      });

    if (res.statusCode === 201 && res.body.id) {
      usuarioId = res.body.id;
      console.log('✔️  Criou usuário com sucesso (POST /api/usuarios), id:', usuarioId);
    } else {
      console.error('❌  Falha ao criar usuário. Status:', res.statusCode, 'Body:', res.body);
    }
  } catch (err) {
    console.error('❌  Erro ao criar usuário:', err.message);
  }
}


async function listarUsuarios() {
  try {
    const res = await request(app).get('/api/usuarios');
    if (res.statusCode === 200 && Array.isArray(res.body)) {
      console.log('✔️  Listou usuários com sucesso (GET /api/usuarios)');
    } else {
      console.error('❌  Falha ao listar usuários. Status:', res.statusCode);
    }
  } catch (err) {
    console.error('❌  Erro ao listar usuários:', err.message);
  }
}

async function atualizarUsuario() {
  if (!usuarioId) {
    console.error('❌  Usuário não criado, não pode atualizar.');
    return;
  }
  try {
    const res = await request(app)
      .put(`/api/usuarios/${usuarioId}`)
      .send({ nome: 'Usuário Atualizado', email: 'atualizado@exemplo.com' });

    if (res.statusCode === 200) {
      console.log(`✔️  Atualizou usuário com sucesso (PUT /api/usuarios/${usuarioId})`);
    } else {
      console.error('❌  Falha ao atualizar usuário. Status:', res.statusCode);
    }
  } catch (err) {
    console.error('❌  Erro ao atualizar usuário:', err.message);
  }
}

async function excluirUsuario() {
  if (!usuarioId) {
    console.error('❌  Usuário não criado, não pode excluir.');
    return;
  }
  try {
    const res = await request(app).delete(`/api/usuarios/${usuarioId}`);
    if (res.statusCode === 204) {
      console.log(`✔️  Excluiu usuário com sucesso (DELETE /api/usuarios/${usuarioId})`);
    } else {
      console.error('❌  Falha ao excluir usuário. Status:', res.statusCode);
    }
  } catch (err) {
    console.error('❌  Erro ao excluir usuário:', err.message);
  }
}

async function rodarTestesUsuarios() {
  await criarUsuario();
  await listarUsuarios();
  await atualizarUsuario();
  await excluirUsuario();
}

rodarTestesUsuarios();
