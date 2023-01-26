var boxes = [];
var currentColor = 'red'
let colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'cyan',
  'blue',
  'magenta',
  'rgb(92, 64, 51)',
  'white',
  'black'
];
function setup() {
  createCanvas(600, 400);
  var posY = 0;
  for(i = 0; i < colors.length; i++){ 
    console.log(colors[i])
    boxes[i] = new colorBox(posY,colors[i]);
    posY = posY + 20;
  }
}
function draw() {
  stroke(255);
  strokeWeight(1);
  for(i = 0; i < colors.length; i++){
    boxes[i].draw()
  }
  if (mouseIsPressed)
  {
  stroke(currentColor)
  strokeWeight(10)
  line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function mouseClicked(){
  for(i = 0; i < colors.length; i++){
    boxes[i].mouseClicked()
  }
}

class colorBox{
  constructor(y,c){
    this.y = y;
    this.c = c;
    
  }
  draw(){
    fill(this.c);
    rect(0,this.y,20,20);
  }
  mouseClicked(){
  
  let insideX = mouseX >= 0 && mouseX <= 20;
  let insideY = mouseY >= this.y && mouseY <= this.y + 20;
  let inside = insideX && insideY;
  if(inside){
    currentColor = this.c;
  }
  }
}
