import { connectAPI } from "./connectAPI.js";
import createVideoCard from "./viewVideoCards.js";
// function for searching videos
async function searchVideo(event) {
  event.preventDefault();
  const videosContainer = document.querySelector("[data-list]");
  try {
    const searchTerm = document.querySelector("[data-search]").value;

    const search = await connectAPI.getSearchVideo(searchTerm);

    while (videosContainer.firstChild) {
      videosContainer.removeChild(videosContainer.firstChild);
    }

    search.forEach((element) =>
      videosContainer.appendChild(
        createVideoCard(
          element.url,
          element.imagem,
          element.titulo,
          element.descricao
        )
      )
    );

    if (search.length === 0) {
      videosContainer.innerHTML = `<h2 class="mensagem__titulo">Não existe nenhum vídeo com este termo.</h2>`;
    }
  } catch (error) {
    videosContainer.innerHTML = `<h2 class="mensagem__titulo">${error}</h2>`;
  }
}
const searchButton = document.querySelector("[data-search-button]");
searchButton.addEventListener("click", (event) => searchVideo(event));
