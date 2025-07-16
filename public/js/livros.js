document.getElementById('formNovoLivro').addEventListener('submit', async function (e) {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const ano = document.getElementById('ano').value;
  const genero = document.getElementById('genero').value;

  const response = await fetch('/api/livros', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, autor, ano, genero })
  });

  if (response.ok) {
    const novoLivro = await response.json();
    const lista = document.getElementById('livros-lista');
    const li = document.createElement('li');
    li.textContent = `${novoLivro.titulo} - ${novoLivro.autor}`;
    lista.appendChild(li);
    e.target.reset();
  } else {
    alert('Erro ao criar o livro!');
  }
});

window.onload = async function () {
  const res = await fetch('/api/livros');
  const livros = await res.json();
  const lista = document.getElementById('livros-lista');
  livros.forEach(livro => {
    const li = document.createElement('li');
    li.textContent = `${livro.titulo} - ${livro.autor}`;
    lista.appendChild(li);
  });
};
