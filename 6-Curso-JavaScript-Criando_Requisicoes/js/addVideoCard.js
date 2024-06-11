import { connectAPI } from "./connectAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function addVideo(event) {
  event.preventDefault();
  try {
    const url = document.querySelector("[data-url]").value;
    const imagem = document.querySelector("[data-imagem]").value;
    const titulo = document.querySelector("[data-titulo]").value;
    const descricao = Math.floor(Math.random() * 10).toString();

    await connectAPI.postVideo(titulo, descricao, url, imagem);

    window.location.href = "../pages/envio-concluido.html";
  } catch (e) {
    formulario.innerHTML = `<h2 class="mensagem__titulo">${e}</h2>`;
  }
}

formulario.addEventListener("submit", (event) => addVideo(event));
