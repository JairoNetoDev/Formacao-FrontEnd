async function getVideos() {
  const response = await fetch("http://localhost:3000/videos");
  if (!response.ok) {
    throw new Error(
      "Não foi possível buscar os vídeos. URL inválida ou a API está desligada."
    );
  }
  const data = await response.json();
  return data;
}

async function postVideo(titulo, descricao, url, imagem) {
  const response = await fetch("http://localhost:3000/videos", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      titulo: titulo,
      descricao: `${descricao} mil visualizações`,
      url: url,
      imagem: imagem,
    }),
  });
  if (!response.ok) {
    throw new Error(
      "Não foi possível adicionar o vídeo. Verifique a URL inserida. Se o erro persistir, a API pode estar desligada"
    );
  }
  const data = await response.json();

  return data;
}

async function getSearchVideo(searchTerm) {
  const response = await fetch(`http://localhost:3000/videos?q=${searchTerm}`);
  if (!response.ok) {
    throw new Error(
      "Não foi possível buscar os vídeos. API desligada ou termo inválido."
    );
  }
  console.log(response);
  const data = await response.json();
  console.log(data);

  return data;
}

export const connectAPI = {
  getVideos,
  postVideo,
  getSearchVideo,
};
