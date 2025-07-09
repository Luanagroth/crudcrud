import { Cliente } from "./classes.js";
import { criarElementoCliente } from "./utils.js";

const URL = "https://crudcrud.com/api/78082f872e0d42b6b1b6ec1db7381f1d/cadastro";
const form = document.getElementById("formulario");
const lista = document.getElementById("cadastroClientes");

function carregarClientes() {
  fetch(URL)
    .then(res => res.json())
    .then(clientes => {
      lista.innerHTML = "";
      clientes.forEach(cliente => {
        const li = criarElementoCliente(cliente, deletarCliente);
        lista.appendChild(li);
      });
    });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) return alert("Preencha todos os campos!");

  const cliente = new Cliente(nome, email);

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  })
    .then(() => {
      form.reset();
      carregarClientes();
    });
});

function deletarCliente(id) {
  fetch(`${URL}/${id}`, {
    method: "DELETE"
  }).then(() => carregarClientes());
}

carregarClientes();