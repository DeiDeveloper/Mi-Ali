const ringBox = document.getElementById("ringBox");
const poem = document.getElementById("poem");
const tulip = document.getElementById("tulip");
const actionButton = document.getElementById("actionButton");

let state = "closed";

const setButtonLabel = () => {
  if (state === "closed") {
    actionButton.textContent = "Abrir el anillo";
  } else if (state === "open") {
    actionButton.textContent = "Cerrar y convertir en tulipán";
  } else {
    actionButton.textContent = "Volver a la caja";
  }
};

const openBox = () => {
  state = "open";
  ringBox.classList.add("open");
  ringBox.setAttribute("aria-expanded", "true");
  poem.classList.add("visible");
  poem.setAttribute("aria-hidden", "false");
  tulip.classList.remove("visible");
  tulip.setAttribute("aria-hidden", "true");
  setButtonLabel();
};

const closeToTulip = () => {
  state = "closing";
  ringBox.classList.remove("open");
  ringBox.classList.add("closing");
  poem.classList.remove("visible");
  poem.setAttribute("aria-hidden", "true");

  const onTransitionEnd = () => {
    ringBox.classList.remove("closing");
    ringBox.setAttribute("aria-expanded", "false");
    state = "tulip";
    tulip.classList.add("visible");
    tulip.setAttribute("aria-hidden", "false");
    setButtonLabel();
    ringBox.removeEventListener("transitionend", onTransitionEnd);
  };

  ringBox.addEventListener("transitionend", onTransitionEnd);
};

const returnToBox = () => {
  state = "closed";
  tulip.classList.remove("visible");
  tulip.setAttribute("aria-hidden", "true");
  ringBox.setAttribute("aria-expanded", "false");
  setButtonLabel();
};

ringBox.addEventListener("click", () => {
  if (state === "closed") {
    openBox();
  } else if (state === "open") {
    closeToTulip();
  } else if (state === "tulip") {
    returnToBox();
  }
});

actionButton.addEventListener("click", () => {
  ringBox.click();
});

setButtonLabel();
