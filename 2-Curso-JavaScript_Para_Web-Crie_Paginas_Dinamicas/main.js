function tocarSom(seletorAudio) {
  const elemento = document.querySelector(seletorAudio);

  if (!elemento || elemento.localName !== "audio") {
    console.error("Elemento não encontrado ou seletor inválido!");
  } else {
    elemento.play();
  }
}

const listaTeclas = document.querySelectorAll(".tecla");

listaTeclas.forEach((tecla) => {
  const instrumento = tecla.classList[1];
  const idAudio = `#som_${instrumento}`;

  tecla.onclick = () => {
    tocarSom(idAudio);
  };

  tecla.onkeydown = (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      tecla.classList.add("ativa");
    }
  };

  tecla.onkeyup = (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      tecla.classList.remove("ativa");
    }
  };
});
