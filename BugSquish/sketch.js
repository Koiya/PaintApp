let spriteSheet;
let animations = [];
let bugClicked = 0;
const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver:"GameOver"
}
const Game = {
  score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 15, state: GameState.Start, targetSprite: 2
}

function preload(){
  spriteSheet = loadImage("assets/Bug.png")
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);
  reset();
}

function reset(){
  Game.elapsedTime = 0;
  Game.score = 0;
  Game.totalSprites = random(10,30);
  animations = [];
  for(let i=0; i < Game.totalSprites; i++) {
    animations[i] = new WalkingAnimation(spriteSheet,32,32,random(100,300),random(100,300),3,random(0.5,1),6,random([0,1]));
  }
}

function draw() {
  switch(Game.state){
    case GameState.Playing:
      background(255);
      for(let i=0; i < animations.length; i++) {
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      text(Game.score,20,40);
      let currentTime = Game.maxTime - Game.elapsedTime; 
      text("Time: " + ceil(currentTime),300,40);
      Game.elapsedTime += deltaTime / 1000;
      if (currentTime < 0){
      Game.state = GameState.GameOver;
      }
      break;
    case GameState.GameOver:
      Game.maxScore = max(Game.score,Game.maxScore);

      background(0);
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Game Over!",200,200);
      textSize(35);
      text("Score: " + Game.score,200,270);
      text("Max Score: " + Game.maxScore,200,320);
      break;
    case GameState.Start:
      background(255);
      fill(0);
      textSize(50);
      textAlign(CENTER);
      text("Bug Squish",200,200);
      textSize(30);
      text("Press Any Key to Start",200,300);
      break;
  }

}
function keyPressed() {
  switch(Game.state) {
    case GameState.Start:
      Game.state = GameState.Playing;
      break;
    case GameState.GameOver:
      reset();
      Game.state = GameState.Playing;
      break;
  }
}
function mousePressed() {
  switch(Game.state) {
    case GameState.Playing:
      for (let i=0; i < animations.length; i++) {
        let contains = animations[i].contains(mouseX,mouseY);
        if (contains) {
          if (animations[i].moving != 0) {
            animations[i].stop();
            if (animations[i].spritesheet === spriteSheet)
              Game.score += 1;
              bugClicked = 1;
          }
          else {
            if (animations[i].xDirection === 1)
              animations[i].moveRight();
            else
              animations[i].moveLeft();
          }
        }
      }
      if (bugClicked){
        for(let i = 0; i < animations.length; i++){
          animations[i].speed += 0.25;
        }
        bugClicked = 0;
      }
      break;
    }
}
class WalkingAnimation{
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0){
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.vertical = vertical;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate*speed;
  }
  draw() {
    print(this.v);
    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
    push();
    translate(this.dx,this.dy);
    rotate(90);
    if (this.vertical){
      rotate(90);
    }
    scale(this.xDirection,1);
    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw+this.offsetX,this.v*this.sh+this.offsetY,this.sw,this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }
    if(this.vertical){
      this.dy += this.moving*this.speed;
      this.move(this.dy,this.sw/4, height-this.sw/4)
    }else{
      this.dx += this.moving*this.speed;
      this.move(this.dx,this.sw/4, width-this.sw/4)
    }
  }
  move(position, lowerBounds, upperBounds){
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }

  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
  }

  contains(x,y) {
    let insideX = x >= this.dx - 10 && x <= this.dx + 10;
    let insideY = y >= this.dy - 15 && y <= this.dy + 15;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
    this.u = 3;
    this.v = 0;
  }
}