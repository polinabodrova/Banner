const counterContainer = document.querySelector(".banner-container__counter");
const objectContainer = document.querySelector(".banner-container__objects");
const objects = Array.from(document.querySelectorAll(".object"));
const backpack = document.querySelector(".banner-container__bottom-backpack");
const task = document.querySelector(".banner-container__task");
const blicks = document.querySelectorAll(".blick");
const nintendo = document.querySelector(".banner-container__objects-nintendo");
const pencil = document.querySelector(".banner-container__objects-pencil");
const usb = document.querySelector(".banner-container__objects-usb");
const pen = document.querySelector(".banner-container__objects-pen");
const notebook = document.querySelector(".banner-container__objects-notebook");
const countImg = document.querySelector(".countImg");
const button = document.querySelector(".banner-container__button");
const readytext = document.querySelector(".banner-container__readytext");
let chosenObjects = [];
let count = 0;
const initialAppearance = function () {
  setTimeout(() => {
    counterContainer.classList.remove("displayNone");
    backpack.classList.remove("displayNone");
    task.classList.remove("displayNone");
    setTimeout(() => {
      objects.forEach((el) => {
        el.classList.remove("displayNone");
      });
    }, 700);
  }, 1500);
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
  console.log("test");
  button.classList.add("displayNone");
  readytext.classList.add("displayNone");
  backpack.classList.remove("backpackFinalMove");
  backpack.classList.add("displayNone");
  chosenObjects = [];
  initialAppearance();
});
