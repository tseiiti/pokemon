var notes = [
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
  
function cc(text, replace = false, tlog = true) {
  if (text) {
    let html = "";
    let t = "";
    if (!replace) html = qs("#div_console").innerHTML;
    if (tlog) t = getTime(new Date(), "mill") + " => ";
    qs("#div_console").innerHTML = "<p class=\"p-0 m-0\">" + t + text + "</p>" + html;
  }
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function play1() {
//   const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
//   const oscillator = audioCtx.createOscillator();
//   const gainNode = audioCtx.createGain();
//   const tempo = 100;
  
//   oscillator.connect(gainNode);
//   gainNode.connect(audioCtx.destination);
  
//   // oscillator.type = "square";
//   oscillator.detune.value = 100;
//   oscillator.start(0);
  
//   const initialVol = 0.1;
//   gainNode.gain.value = initialVol;
//   gainNode.gain.minValue = initialVol;
//   gainNode.gain.maxValue = initialVol;

//   for(let i = 0; i < notes.length; i++) {
//     let frequency = notes[i][0];
//     let duration = 1000 * 256 / (notes[i][1] * tempo);
//     cc(frequency + " - " + duration);
    
//     oscillator.frequency.value = frequency;
//     // gainNode.gain.value = 0.5;
//     // gainNode.connect(audioCtx.destination);
    
//     await sleep(duration);
//     // gainNode.disconnect(audioCtx.destination);
//   }
//   gainNode.disconnect(audioCtx.destination);
// }

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);

var oscillator = audioCtx.createOscillator();
var frequency = 0;
var type = 0;
var detune = 0;
var volume = 0;
var duration = 0;

function ff_show() {
  let c = qs("#fc_in").value;
  let f = qs("#ff_in").value;
  frequency = f * 1 + c * 100;
  qs("#ff_out").innerHTML = `frequency: ${frequency} hz`;
  oscillator.frequency.value = frequency;
}

function tp_show() {
  switch (qs("#tp_in").value * 1) {
    case 0: type = "sine"; break;
    case 1: type = "square"; break;
    case 2: type = "sawtooth"; break;
    case 3: type = "triangle"; break;
  }
  qs("#tp_out").innerHTML = `type: ${type}`;
  oscillator.type = type;
}

function de_show() {
  detune = qs("#de_in").value;
  qs("#de_out").innerHTML = `detune: ${detune}`;
  oscillator.detune.value = detune;
}

function vl_show() {
  volume = qs("#vl_in").value / 100;
  qs("#vl_out").innerHTML = `volume: ${volume}`;
  gainNode.gain.value = volume;
}

function du_show() {
  duration = qs("#du_in").value;
  qs("#du_out").innerHTML = `duration: ${duration} ms`;
}
ff_show();
tp_show();
de_show();
vl_show();
du_show();

function createOsc() {
  oscillator = audioCtx.createOscillator();
  oscillator.connect(gainNode);
  oscillator.detune.value = detune;
  oscillator.onended = function() {
    oscillator.disconnect(gainNode);
    oscillator = null;
  }
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gainNode.gain.value = volume;
}

function beep() {
  createOsc();
  
  let ct = audioCtx.currentTime;
  oscillator.start(ct);
  oscillator.stop(ct + (duration / 1000));
};

function oStart() {
  createOsc();
  oscillator.start();
}

function oStop() {
  oscillator.stop();
}

function oPlay() {
  createOsc();
  let accumulator = audioCtx.currentTime;
  for(let i = 0; i < notes.length; i++) {
    frequency = notes[i][0];
    oscillator.frequency.setValueAtTime(frequency, accumulator);
    duration = 256 / (notes[i][1] * 100); // tempo 100
    accumulator += duration;
  }
  oscillator.frequency.setValueAtTime(0, accumulator);
  oscillator.start();
  oscillator.stop(accumulator + 0.1);
}

function note(freq) {
  createOsc();
  
  oscillator.frequency.value = freq;
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + (duration / 1000));
};

afterLoad(function() {
  // play1();
});
