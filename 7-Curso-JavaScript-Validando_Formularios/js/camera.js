import { conectaAPI } from "./server.js";

const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const mensagem = document.querySelector("[data-mensagem]");
const canvas = document.querySelector("[data-video-canvas]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

botaoIniciarCamera.addEventListener("click", async function () {
  const inciarVideo = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  botaoIniciarCamera.style.display = "none";
  campoCamera.style.display = "block";

  video.srcObject = inciarVideo;
});

botaoTirarFoto.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  imagemURL = canvas.toDataURL("image/jpeg");

  campoCamera.style.display = "none";
  mensagem.style.display = "block";
});

botaoEnviarFoto.addEventListener("click", async function () {
  const receberDadosExistentes = localStorage.getItem("cadastro");
  const converterRetorno = JSON.parse(receberDadosExistentes);
  // Adicionando o atributo "imagem" no objeto "converterRetorno"
  converterRetorno.imagem = imagemURL;

  localStorage.setItem("cadastro", JSON.stringify(converterRetorno));

  await conectaAPI.registrarUsuario();
  window.location.href = "./abrir-conta-form-3.html";
});
