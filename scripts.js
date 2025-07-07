const URL = "https://crudcrud.com/api/78082f872e0d42b6b1b6ec1db7381f1d/cadastro";
const form = document.getElementById("formulario");
const lista = document.getElementById("cadastroClientes");

// ➤ 1. Listar clientes ao carregar
function carregarClientes() {
  fetch(URL)
    .then(res => res.json())
    .then(clientes => {
      lista.innerHTML = ""; // limpa antes de exibir
      clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${cliente.nome} - ${cliente.email}
          <button onclick="deletarCliente('${cliente._id}')">Excluir</button>
        `;
        lista.appendChild(li);
      });
    });
}

// ➤ 2. Adicionar cliente
form.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const cliente = { nome, email };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  })
  .then(() => {
    form.reset();
    carregarClientes(); // atualiza a lista
  });
});

// ➤ 3. Deletar cliente
function deletarCliente(id) {
  fetch(`${URL}/${id}`, {
    method: "DELETE"
  }).then(() => carregarClientes());
}

carregarClientes(); // inicia ao abrir a página