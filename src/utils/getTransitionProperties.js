// const Animations = ["flash", "shake", "pulse", "tada"];
const Animations = ["tada"];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function getTransitionProperties() {
  return { animation: Animations[randomInteger(0, randomInteger.length - 1)], duration: 1500 };
}