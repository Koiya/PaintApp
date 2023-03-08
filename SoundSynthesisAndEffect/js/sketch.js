let gif;
let synth = new Tone.MembraneSynth().toDestination();
var synthJSON = {
	"pitchDecay"  : 0.15 ,
	"octaves"  : 8 ,
	"oscillator"  : {
		"type"  : "sine"
}  ,
	"envelope"  : {
		"attack"  : 0.001 ,
		"decay"  : 0.1 ,
		"sustain"  : 0.01,
		"release"  : 1.4 ,
		"attackCurve"  : "exponential"
	}
};
synth.set(synthJSON);

function preload(){
	gif = loadImage("assets/firing-blaster-andor.gif");

}

function setup() {
  createCanvas(400, 400);
}
let pressed = 0;
function draw() {
	image(gif,0,0);
	if (pressed == 1){
		gif.play();
	}else{
		gif.pause();
	}
}


function mousePressed() {
	gif.play();
	pressed = 1;
  	console.log('pressed');
  	synth.triggerAttackRelease("C4", "16n");
  
}

function mouseReleased(){
	pressed = 0;
}