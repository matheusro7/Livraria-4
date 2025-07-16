📚 API de Gerenciamento de Livros e Usuários
Esta aplicação permite gerenciar usuários e livros com operações de CRUD utilizando Node.js, Express e PostgreSQL.

🚀 Como iniciar o projeto
1. Pré-requisitos
Node.js instalado

PostgreSQL instalado e rodando

Git Bash ou terminal equivalente

2. Instalação
No terminal:

bash
Copiar
Editar
# Clone o repositório
# git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse o diretório do projeto
cd nome-do-projeto

# Inicialize o projeto Node.js
npm init -y

# Instale o Express (framework web)
npm install express

# Instale o pg (cliente PostgreSQL para Node.js)
npm install pg
3. Executar o servidor
Após configurar o server.js, rode a aplicação com:

bash
Copiar
Editar
node server.js
A API ficará disponível em:
http://localhost:3000


🗃️ Banco de Dados (PostgreSQL)
Estrutura das tabelas
sql
Copiar
Editar
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20)
);

CREATE TABLE livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  ano_publicacao INT,
  isbn VARCHAR(20) UNIQUE,
  usuario_id INTEGER,
  CONSTRAINT fk_livros_usuarios FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);


📘 Rotas da API
🔹 LIVROS
1. Criar Livro
Método: POST

URL: http://localhost:3000/livros

Body (JSON):

json
Copiar
Editar
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano_publicacao": 1899,
  "isbn": "978-85-359-0277-5"
}
2. Listar Todos os Livros
Método: GET

URL: http://localhost:3000/livros

3. Atualizar Livro por ID
Método: PUT

URL: http://localhost:3000/livros/1

Body (JSON):

json
Copiar
Editar
{
  "titulo": "Dom Casmurro (Atualizado)",
  "ano_publicacao": 1900
}
4. Excluir Livro por ID
Método: DELETE

URL: http://localhost:3000/livros/1

🔹 USUÁRIOS
1. Criar Usuário
Método: POST

URL: http://localhost:3000/usuarios

Body (JSON):

json
Copiar
Editar
{
  "nome": "Maria Oliveira",
  "email": "maria.oliveira@email.com",
  "telefone": "11988887777"
}
2. Listar Todos os Usuários
Método: GET

URL: http://localhost:3000/usuarios

3. Atualizar Usuário por ID
Método: PUT

URL: http://localhost:3000/usuarios/1

Body (JSON):

json
Copiar
Editar
{
  "nome": "Maria Oliveira Atualizada",
  "telefone": "11977776666"
}
4. Excluir Usuário por ID
Método: DELETE

URL: http://localhost:3000/usuarios/1

⚠️ Se o usuário tiver livros vinculados, pode haver erro por restrição de chave estrangeira.

🔹 Relações Usuário ↔ Livros
1. Listar livros de um usuário
Método: GET

URL: http://localhost:3000/usuarios/1/livros

2. Criar livro vinculado a um usuário
Método: POST

URL: http://localhost:3000/livros

Body (JSON):

json
Copiar
Editar
{
  "titulo": "A Hora da Estrela",
  "autor": "Clarice Lispector",
  "ano_publicacao": 1977,
  "isbn": "9788535930178",
  "usuario_id": 1
}
📄 Exemplos de Uso
Criar dois usuários:
json
Copiar
Editar
// POST /usuarios
{
  "nome": "Ana Costa",
  "email": "ana.costa@example.com",
  "telefone": "11999999999"
}

{
  "nome": "Carlos Silva",
  "email": "carlos.silva@example.com",
  "telefone": "21988887777"
}
Criar livros para os usuários:
json
Copiar
Editar
// POST /livros
{
  "titulo": "1984",
  "autor": "George Orwell",
  "ano_publicacao": 1949,
  "isbn": "9780451524935",
  "usuario_id": 2
}
📌 Outras Rotas Úteis
Ação	Método	Rota
Obter detalhes de um livro	GET	/livros/1
Obter detalhes de um usuário	GET	/usuarios/1
Listar todos os livros de um usuário	GET	/usuarios/:id/livros
Listar usuários com seus livros	GET	/api/usuarios/com-livros
