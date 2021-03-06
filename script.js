const counterContainer = document.querySelector(".banner-container__counter");
const objects = Array.from(document.querySelectorAll(".object"));
const backpack = document.querySelector(".banner-container__bottom-backpack");
const task = document.querySelector(".banner-container__task");
const blicks = Array.from(document.querySelectorAll(".blick"));
const countImg = document.querySelector(".countImg");
const button = document.querySelector(".banner-container__button");
const readytext = document.querySelector(".banner-container__readytext");
let chosenObjects = [];

//Waiting for the pics to load
function firstLoad() {
  initialAppearance();
}
//promisifying settimeout
function wait(sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
}

function initialAppearance() {
  wait(0.5)
    .then(() => {
      counterContainer.classList.remove("displayNone");
      backpack.classList.remove("displayNone");
      task.classList.remove("displayNone");
      return wait(0.9);
    })
    .then(() => {
      objects.forEach((el) => el.classList.remove("displayNone"));
      blicks.forEach((el) => el.classList.remove("displayNone"));
    });
}

function toggleObjects(e) {
  e.target.classList.toggle("pickedObject");
  if (!chosenObjects.includes(e.target)) {
    chosenObjects.push(e.target);
    counter();
  } else {
    chosenObjects.splice(chosenObjects.indexOf(e.target), 1);
    counter();
  }
  if (chosenObjects.length === 5) {
    wait(0.1)
      .then(() => {
        objects.forEach((el) => {
          el.classList.add("fadeOutObjects");
          el.classList.remove("pickedObject");
        });
        counterContainer.classList.add("fadeOut");
        task.classList.add("fadeOut");
        return wait(0.5);
      })
      .then(() => {
        objects.forEach((el) => el.classList.add("displayNone"));
        counterContainer.classList.add("hidden");
        task.classList.add("displayNone");
      });
    blicks.forEach((el) => el.classList.add("displayNone"));
    backpack.classList.add("backpackFinalMove");
    finalAnimation();
  }
}

function counter() {
  countImg.src = `./images/${chosenObjects.length}.png`;
}

function finalAnimation() {
  button.classList.remove("displayNone");
  wait(1).then(() => {
    readytext.classList.remove("displayNone");
    readytext.classList.add("fadeIn");
  });
}

function playAgain() {
  button.classList.add("displayNone");
  readytext.classList.add("displayNone");
  backpack.classList.remove("backpackFinalMove");
  backpack.classList.add("displayNone");
  counterContainer.classList.remove("hidden");
  objects.forEach((el) => el.classList.remove("fadeOutObjects"));
  task.classList.remove("fadeOut");
  counterContainer.classList.remove("fadeOut");
  countImg.src = "./images/0.png";
  chosenObjects = [];
  initialAppearance();
}

window.addEventListener("load", firstLoad);
objects.forEach((el) => el.addEventListener("click", toggleObjects));
button.addEventListener("click", playAgain);
