var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.type = 'square';
oscillator.detune.value = 100;
oscillator.start(0);

const initialVol = 0.001;
gainNode.gain.value = initialVol;
gainNode.gain.minValue = initialVol;
gainNode.gain.maxValue = initialVol;



function playNote(frequency, duration) {
  gainNode.connect(audioCtx.destination);
  
  oscillator.frequency.value = frequency;
  gainNode.gain.value = 0.5;

  setTimeout(
    function() {
      gainNode.disconnect(audioCtx.destination)
      playMelody();
    }, duration);
}

function playMelody() {
  if (notes.length > 0) {
    note = notes.pop();
    playNote(note[0], 1000 * 256 / (note[1] * tempo));
  }
}


notes = [
  [659, 4],
  [659, 4],
  [659, 4],
  [523, 8],
  [0, 16],
  [783, 16],
  [659, 4],
  [523, 8],
  [0, 16],
  [783, 16],
  [659, 4],
  [0, 4],
  [987, 4],
  [987, 4],
  [987, 4],
  [1046, 8],
  [0, 16],
  [783, 16],
  [622, 4],
  [523, 8],
  [0, 16],
  [783, 16],
  [659, 4]
];

notes.reverse();
tempo = 100;

playMelody();

afterLoad(function() {

});
