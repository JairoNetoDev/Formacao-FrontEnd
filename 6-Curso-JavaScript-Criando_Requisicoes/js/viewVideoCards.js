import { connectAPI } from "./connectAPI.js";

const videosContainer = document.querySelector("[data-list]");
// function to create the video card
export default function createVideoCard(url, imagem, titulo, descricao) {
  const video = document.createElement("ul");
  video.className = "videos__item";
  video.innerHTML = `<li class="videos__item">
    <iframe
      width="100%"
      height="72%"
      src="${url}"
      title="${titulo}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div class="descricao-video">
      <img src="${imagem}" />
      <h3>${titulo}</h3>
      <p>${descricao}</p>
    </div>
  </li>`;

  return video;
}
// function to get the videos from the API and render them on the page
(() => {
  async function videoList() {
    try {
      const dataVideoList = await connectAPI.getVideos();
      dataVideoList.forEach((element) =>
        videosContainer.appendChild(
          createVideoCard(
            element.url,
            element.imagem,
            element.titulo,
            element.descricao
          )
        )
      );
    } catch (error) {
      videosContainer.innerHTML = `<h2 class="mensagem__titulo">${error}</h2>`;
    }
  }

  videoList();
})();
