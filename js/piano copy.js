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

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);

var oscillator = null;
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
  if (oscillator) oscillator.frequency.value = frequency;
}

function tp_show() {
  switch (qs("#tp_in").value * 1) {
    case 0: type = "sine"; break;
    case 1: type = "square"; break;
    case 2: type = "sawtooth"; break;
    case 3: type = "triangle"; break;
  }
  qs("#tp_out").innerHTML = `type: ${type}`;
  if (oscillator) oscillator.type = type;
}

function de_show() {
  detune = qs("#de_in").value;
  qs("#de_out").innerHTML = `detune: ${detune}`;
  if (oscillator) oscillator.detune.value = detune;
}

function vl_show() {
  volume = qs("#vl_in").value / 100;
  qs("#vl_out").innerHTML = `volume: ${volume}`;
  gainNode.gain.value = volume;
  // cc(volume)
}

function du_show() {
  duration = qs("#du_in").value;
  qs("#du_out").innerHTML = `duration: ${duration} ms`;
}

function all_show() {
  ff_show();
  tp_show();
  de_show();
  vl_show();
  du_show();
}

function createOsc() {
  if (oscillator != null) {
    oscillator.stop();
  }
  
  oscillator = audioCtx.createOscillator();
  oscillator.connect(gainNode);
  oscillator.detune.value = detune;
  oscillator.onended = function() {
    oscillator.disconnect(gainNode);
    oscillator = null;
  }
  
  all_show();
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gainNode.gain.value = volume;
}

function beep() {
  createOsc();
  
  gainNode.gain.value = 0;
  oscillator.start();
  
  let ct = audioCtx.currentTime;
  let st = ct + duration / 1000;
  let cl = 200;
  // cc(`ct: ${ct}; stop: ${st};`, true, false);
  
  for(let i = 0; i <= cl; i++) {
    let p = i / cl;
    let c = p / 5;
    let v = volume * p;
    let t = ct + c;
    let u = ct + duration / 1000 - c;
    // cc(`i: ${i}; v: ${v.toString().substring(0, 6)}; t: ${t.toString().substring(0, 6)}; u: ${u.toString().substring(0, 6)};`, false, false)
    gainNode.gain.setValueAtTime(v, t);
    gainNode.gain.setValueAtTime(v, u);
  }
  
  // cc(`ct: ${ct}; stop: ${st};`, false, false);
  
  // oscillator.start(ct);
  oscillator.stop(st);
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
  let acc = audioCtx.currentTime;
  for(let i = 0; i < notes.length; i++) {
    frequency = notes[i][0];
    oscillator.frequency.setValueAtTime(frequency, acc);
    duration = 256 / (notes[i][1] * 100); // tempo 100
    acc += duration;
  }
  oscillator.frequency.setValueAtTime(0, acc);
  oscillator.start();
  oscillator.stop(acc + 0.1);
}

function note(freq) {
  createOsc();
  oscillator.frequency.value = freq;
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + (duration / 1000));
};

function draw() {
  let html = `
        <canvas id="canvas" width="150" height="150">teste</canvas>
        <style>
          canvas {
            border: 1px solid black;
          }
        </style>`;
  qs("#div_console").innerHTML = html;
  
  const canvas = qs("#canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    // ctx.fillStyle = "rgb(200, 0, 0)";
    // ctx.fillRect(10, 10, 50, 50);
    // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    // ctx.fillRect(30, 30, 50, 50);
    
    // ctx.fillRect(25, 25, 100, 100);
    // ctx.clearRect(45, 45, 60, 60);
    // ctx.strokeRect(50, 50, 50, 50);
    
    ctx.beginPath();
    ctx.moveTo(75, 41.4);
    ctx.lineTo(100, 100);
    ctx.lineTo(100, 50);
    ctx.fill();
    
    // ctx.beginPath();
    // ctx.moveTo(70, 50);
    // ctx.lineTo(100, 75);
    // ctx.lineTo(100, 25);
    // ctx.fill();
  }
}

function teste() {
  new Audio("/assets/key03.mp3").play();
}

afterLoad(function() {
  all_show();
  draw();
});

  // attack: 0.2,
  // decay: 0, 
  // sustain: 1, 
  // realease: 0.3, 
  // max_time: 2