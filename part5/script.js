const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
  constructor() {
    this.width = 100;
    this.height = 100;

    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
  }
  update() {
    this.x -= this.directionX;
    this.y += this.directionY;
  }
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const raven = new Raven();

function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  timeToNextRaven += deltaTime;
  //   console.log(deltaTime);
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
  }
  requestAnimationFrame(animate);
  [...ravens].forEach((object) => {
    object.update();
  });
  [...ravens].forEach((object) => {
    object.draw();
  });
}
animate(0);
