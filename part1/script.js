const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Canvas size(constant)
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "img/shadow_dog.png";

const spriteWidth = 575;
const spriteHeight = 523;

// let frameX = 0;
// let frameY = 0;
let gameFrame = 0;
let staggerFrames = 12;

let spriteAnimations = [];
// animation state and frames
let animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

let playerState = "run";

const animations = document.getElementById("animations");
const frames = document.getElementById("frames");

animations.addEventListener("change", function (e) {
  playerState = e.target.value;
});
frames.addEventListener("change", function (e) {
  staggerFrames = 21 - e.target.value;
});

animationStates.forEach((states, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i <= states.frames - 1; i++) {
    let positionX = i * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[states.name] = frames;
});

//loop
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let postion =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length; //每个动作的帧数
  let frameX = spriteWidth * postion;
  let frameY = spriteAnimations[playerState].loc[postion].y;
  // console.log(frameY);
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
