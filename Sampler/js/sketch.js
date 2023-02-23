let sounds = new Tone.Players({
    "ding":"sounds/ding.mp3",
    "powerup" : "sounds/powerupsuccess.wav",
    "dog" : "sounds/woof.mp3",
    "water" : "sounds/water.mp3"

});

let soundNames = ["ding", "powerup", "dog", "water"];
let buttons = [];
const delay = new Tone.FeedbackDelay("8n", 0.5);

let dSlider;
let fSlider;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();
  soundNames.forEach((word,index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index*100, 100);
    buttons[index].mousePressed( () => buttonSound(word))
  })
  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.position(200,200)
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.position(20,200)
  fSlider.mouseReleased( () => {
    delay.feedback.value = fSlider.value();
  })

}

function draw() {
  background(220);
  textSize(32);
  text("Sounds",120,35);
  textSize(16);
  text("Delay Time Slider", 200, 180)
  text("Feedback Slider", 30, 180)
}

function buttonSound(sound){
  sounds.player(sound).start();

}