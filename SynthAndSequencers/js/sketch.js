const synth = new Tone.PluckSynth();

const osc = new Tone.OmniOscillator("C#4", "pwm").start();

const reverb = new Tone.JCReverb(0.4);
synth.connect(reverb);

const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.5,
  decay: 0.6,
  sustain: 0.3,
  release: 0.2
})

let attackSlider;
let slider;
let decaySlider;
let sustainSlider;
let releaseSlider

let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'

}

function setup() {
  createCanvas(400, 400);
  reverb.toDestination();
 
  slider = new Nexus.Slider("#slider");
  releaseSlider = new Nexus.Slider("#releaseSlider");
  attackSlider = new Nexus.Slider("#attackSlider");
  sustainSlider = new Nexus.Slider("#sustainSlider");
  decaySlider = new Nexus.Slider("#decaySlider");
  slider.on('change', (v) =>  {
    reverb.roomSize.value = v;
  }); 
  releaseSlider.on('change', (v) =>  {
    ampEnv.release = v;
  }); 
  attackSlider.on('change', (v) =>  {
    ampEnv.attack = v;
  }); 
  sustainSlider.on('change', (v) =>  {
    ampEnv.sustain = v;
  }); 
  decaySlider.on('change', (v) =>  {
    ampEnv.decay = v;
  }); 
  osc.connect(ampEnv);
  ampEnv.connect(reverb);
}

function draw() {
  background(220);
  textSize(32);
  text("Keys to play:",120,35);
  text("A S D F G H J K",120,100);
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);

  osc.frequency.value = toPlay;
  ampEnv.triggerAttackRelease('8n');
}