document.getElementById('formNovoUsuario').addEventListener('submit', async function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  const response = await fetch('/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, telefone })
  });

  if (response.ok) {
    const novoUsuario = await response.json();
    const lista = document.getElementById('usuarios-lista');
    const li = document.createElement('li');
    li.textContent = `${novoUsuario.nome} - ${novoUsuario.email}`;
    lista.appendChild(li);
    e.target.reset();
  } else {
    alert('Erro ao criar o usuário!');
  }
});

window.onload = async function () {
  const res = await fetch('/api/usuarios');
  const usuarios = await res.json();
  const lista = document.getElementById('usuarios-lista');
  usuarios.forEach(usuario => {
    const li = document.createElement('li');
    li.textContent = `${usuario.nome} - ${usuario.email}`;
    lista.appendChild(li);
  });
};
