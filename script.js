const counterContainer = document.querySelector(".banner-container__counter");
const objects = Array.from(document.querySelectorAll(".object"));
const backpack = document.querySelector(".banner-container__bottom-backpack");
const task = document.querySelector(".banner-container__task");
const blicks = Array.from(document.querySelectorAll(".blick"));
const countImg = document.querySelector(".countImg");
const button = document.querySelector(".banner-container__button");
const readytext = document.querySelector(".banner-container__readytext");
let chosenObjects = [];
function wait(sec) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
}

const initialAppearance = function () {
  wait(1.5)
    .then(() => {
      counterContainer.classList.remove("displayNone");
      backpack.classList.remove("displayNone");
      task.classList.remove("displayNone");
      blicks.forEach((el) => el.classList.remove("displayNone"));
      return wait(0.9);
    })
    .then(() => {
      objects.forEach((el) => el.classList.remove("displayNone"));
    });
};
initialAppearance();

objects.forEach((el) => el.addEventListener("click", toggleObjects));

function toggleObjects(e) {
  e.target.classList.toggle("pickedObject");
  if (!chosenObjects.includes(e.target)) {
    chosenObjects.push(e.target);
    counter();
  } else {
    chosenObjects.splice(chosenObjects.indexOf(e.target), 1);
    // console.log(chosenObjects);
    counter();
  }
  if (chosenObjects.length === 5) {
    counterContainer.classList.add("displayNone");
    objects.forEach((el) => {
      el.classList.add("displayNone");
      el.classList.remove("pickedObject");
    });
    blicks.forEach((el) => el.classList.add("displayNone"));
    task.classList.add("displayNone");
    backpack.classList.add("backpackFinalMove");

    finalAnimation();
  }
}

const counter = function () {
  countImg.src = `./images/${chosenObjects.length}.svg`;
};

function finalAnimation() {
  button.classList.remove("displayNone");
  readytext.classList.remove("displayNone");
}
button.addEventListener("click", function () {
  button.classList.add("displayNone");
  readytext.classList.add("displayNone");
  backpack.classList.remove("backpackFinalMove");
  backpack.classList.add("displayNone");
  countImg.src = "./images/0.svg";
  chosenObjects = [];
  initialAppearance();
});
