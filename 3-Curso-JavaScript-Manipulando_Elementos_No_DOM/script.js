const html = document.querySelector("html");
// Buttons
const buttons = document.querySelectorAll(".app__card-button");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const iniciarBt = document.querySelector(".app__card-primary-button");
const startPauseBt = document.getElementById("start-pause");
const startOrPauseIcon = startPauseBt.children[0];
const startOrPauseText = startPauseBt.children[1];
const restartTimerBt = document.getElementById("restart-timer");

const title = document.querySelector(".app__title");
const banner = document.querySelector(".app__image");
const pathImage = "./imagens";
// Timer
const timerOnScreen = document.getElementById("timer");

// Music
const focoMusicInput = document.getElementById("alternar-musica");
const pathMusic = "./sons";
const music = new Audio(`${pathMusic}/luna-rise-part-one.mp3`);
const musicStart = new Audio(`${pathMusic}/play.wav`);
const musicPause = new Audio(`${pathMusic}/pause.mp3`);
const musicEnd = new Audio(`${pathMusic}/beep.mp3`);

const listContextType = {
  Foco: {
    name: "foco",
    image: `${pathImage}/foco.png`,
    title: "Otimize sua produtividade",
    titleBold: "mergulhe no que importa!",
    time: 1500,
  },
  DescansoCurto: {
    name: "descanso-curto",
    image: `${pathImage}/descanso-curto.png`,
    title: "Que tal dar uma respirada?",
    titleBold: "Faça uma pausa curta!",
    time: 300,
  },
  DescansoLongo: {
    name: "descanso-longo",
    image: `${pathImage}/descanso-longo.png`,
    title: "Hora de voltar à superfície.",
    titleBold: "Faça uma pausa longa.",
    time: 900,
  },
};

class Context {
  constructor(name, image, title, titleBold, time) {
    this.name = name;
    this.image = image;
    this.title = title;
    this.titleBold = titleBold;
    this.time = time;
    this.intervalId = null;
    this.elapsedTime = time;
  }

  changeContext() {
    html.setAttribute("data-contexto", this.name);
    banner.setAttribute("src", this.image);
    title.innerHTML = `${this.title}<br />
    <strong class="app__title-strong">${this.titleBold}</strong>`;
    this.viewTime();
  }

  countdown = () => {
    if (this.elapsedTime <= 0) {
      this.continueOrPauseTimer();
      musicEnd.play();
      return;
    }
    this.elapsedTime -= 1;
    this.viewTime();
  };

  startOrPauseTimer = () => {
    if (this.intervalId) {
      musicPause.play();
      this.continueOrPauseTimer();
      return;
    }
    musicStart.play();
    this.intervalId = setInterval(this.countdown, 1000);
    startOrPauseIcon.setAttribute("src", `${pathImage}/pause.png`);
    startOrPauseText.textContent = "Pausar";
  };

  viewTime = () => {
    const time = new Date(this.elapsedTime * 1000);
    const formattedTime = time.toLocaleTimeString("pt-BR", {
      minute: "2-digit",
      second: "2-digit",
    });
    timerOnScreen.innerHTML = `${formattedTime}`;
  };

  continueOrPauseTimer = () => {
    clearInterval(this.intervalId);
    startOrPauseIcon.setAttribute("src", `${pathImage}/play_arrow.png`);
    startOrPauseText.textContent = "Iniciar";
    this.intervalId = null;
  };

  resetTimer = () => {
    clearInterval(this.intervalId);
    startOrPauseIcon.setAttribute("src", `${pathImage}/play_arrow.png`);
    startOrPauseText.textContent = "Iniciar";
    this.intervalId = null;
    this.elapsedTime = this.time;
    this.viewTime();
  };

  getName() {
    return this.name;
  }

  getImage() {
    return this.image;
  }

  getTitle() {
    return this.title;
  }

  getTitleBold() {
    return this.titleBold;
  }

  getTime() {
    return this.time;
  }

  getElapsedTime() {
    return this.elapsedTime;
  }
}

// Inicialização dos contextos
const { Foco, DescansoCurto, DescansoLongo } = listContextType;

const focoContext = new Context(
  Foco.name,
  Foco.image,
  Foco.title,
  Foco.titleBold,
  Foco.time
);

const descansoCurtoContext = new Context(
  DescansoCurto.name,
  DescansoCurto.image,
  DescansoCurto.title,
  DescansoCurto.titleBold,
  DescansoCurto.time
);

const descansoLongoContext = new Context(
  DescansoLongo.name,
  DescansoLongo.image,
  DescansoLongo.title,
  DescansoLongo.titleBold,
  DescansoLongo.time
);
// auxiliar functions
function removeClassActive() {
  buttons.forEach((button) => {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    }
  });
}

function addClassActive(button) {
  removeClassActive();
  button.classList.add("active");
}

function updateEventListener(contextInstance) {
  startPauseBt.onclick = () => contextInstance.startOrPauseTimer();
}

// Switch context function to change the context of the timer
let currentContext = null;
function switchContext(newContext, buttonElement) {
  if (currentContext) {
    // pause the current context
    currentContext.continueOrPauseTimer();
    // reset the current context
    // currentContext.resetTimer();
  }

  // set the new context
  newContext.changeContext();
  addClassActive(buttonElement);
  newContext.continueOrPauseTimer();
  updateEventListener(newContext);
  currentContext = newContext;
}

// Event for play or pause music
focoMusicInput.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});
// Listeners for context buttons
focoBt.addEventListener("click", () => {
  switchContext(focoContext, focoBt);
});

curtoBt.addEventListener("click", () => {
  switchContext(descansoCurtoContext, curtoBt);
});

longoBt.addEventListener("click", () => {
  switchContext(descansoLongoContext, longoBt);
});

restartTimerBt.addEventListener("click", () => {
  currentContext.resetTimer();
});
//  Initializer the timer with the focus context
switchContext(focoContext, focoBt);
