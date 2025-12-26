window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 500;
  canvas.height = 800;

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.#addNewEnemy();
      this.enemyInterval = 1000;
      this.enemyTimer = 0;
      // console.log(width, height);
    }
    update(deltaTime) {
      this.enemies = this.enemies.filter((item) => {
        return item.markedForDeletion === false;
      });
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => enemy.update());
    }
    draw() {
      this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    }

    #addNewEnemy() {
      this.enemies.push(new Worm(this));
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      // console.log(this.game);
      this.width = 100;
      this.height = 100;
      this.x = this.game.width;
      this.y = Math.random() * (this.game.height - this.height);
      this.markedForDeletion = false;
    }
    update() {
      this.x--;
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true;
      }
    }
    draw(ctx) {
      // ctx.fillStyle = "skyblue";
      // //画一个圆
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      // ctx.fill();
      //正方形
      // ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        0,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Worm extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 229;
      this.spriteHeight = 171;
      this.x = this.game.width;
      this.y = Math.random() * (this.game.height - this.height);
      this.width = this.spriteWidth / 2;
      this.height = this.spriteHeight / 2;
      this.image = worm;
      // console.log(this.image);
    }
  }

  let lastTime = 1;
  // let timeToNextEnemy = 0;
  // const ravenInterval = 500;

  // const Enemy = new Enemy();
  const game = new Game(ctx, canvas.width, canvas.height);
  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // timeToNextEnemy += deltaTime;
    // if (timeToNextEnemy > ravenInterval) {
    //   timeToNextEnemy = 0;
    // }
    game.update(deltaTime);
    game.draw();
    // console.log(deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
