let spriteSheet;
let spirteSheet2;


let walkingAnimation;
let walkingAnimation2;
function preload(){
  spriteSheet = loadImage("assets/SpelunkyGuy.png")
  spriteSheet2 = loadImage("assets/Green.png")
}
function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  walkingAnimation = new WalkingAnimation(spriteSheet,80,80,200,200,9)
  walkingAnimation2 = new WalkingAnimation(spriteSheet2,80,80,100,100,9)
}

let value = 255;
function draw() {
  background(value);
  walkingAnimation.draw();
  walkingAnimation2.draw();

}
function keyPressed(){
  walkingAnimation.keyPressed();
  walkingAnimation2.keyPressed();
}
function keyReleased(){
  walkingAnimation.keyReleased();
  walkingAnimation2.keyReleased();
}

class WalkingAnimation{
  constructor(spriteSheet,sw,sh,dx,dy,animationLength){
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }
  draw(){
    push();
    this.u =(this.moving != 0) ? this.currentFrame % this.animationLength : 0;
    translate(this.dx,this.dy);
    scale(this.xDirection,1);
    image(this.spriteSheet,0,0,this.sw,this.sh,this.u*this.sw, this.v*this.sh,this.sw,this.sh);
    if (frameCount % 5 == 0){
      this.currentFrame++;
    }
    this.dx += this.moving;
    pop();
  }
  keyPressed(){
    if(keyCode === RIGHT_ARROW){
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    }else if (keyCode === LEFT_ARROW){
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }
  keyReleased(){
    if(keyCode != RIGHT_ARROW || keyCode != LEFT_ARROW){
      this.moving = 0;
    }
  }
}