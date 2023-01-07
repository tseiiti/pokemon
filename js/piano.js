// var notes = [
//   [659, 4],
//   [659, 4],
//   [659, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4],
//   [0, 4],
//   [987, 4],
//   [987, 4],
//   [987, 4],
//   [1046, 8],
//   [0, 16],
//   [783, 16],
//   [622, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4]
// ];
// const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
// const oscillator = audioCtx.createOscillator();
// const gainNode = audioCtx.createGain();
// const tempo = 100;
  
  
// function cc(text, replace = false, tlog = true) {
//   if (text) {
//     let html = "";
//     let t = "";
//     if (!replace) html = qs("#div_console").innerHTML;
//     if (tlog) t = getTime(new Date(), "mill") + " => ";
//     qs("#div_console").innerHTML = "<p class=\"p-0 m-0\">" + t + text + "</p>" + html;
//   }
// }

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
  
//   // oscillator.type = 'square';
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

// var note_idx = 0;
// function play2_aux(i) {
//   let frequency = notes[i][0];
//   let duration = 1000 * 256 / (notes[i][1] * tempo);
//   cc(frequency + " - " + duration);
//   oscillator.frequency.value = frequency;
  
//   setTimeout(function() {
//     note_idx++;
//     if (note_idx < notes.length) {
//       play2_aux(note_idx);
//     } else {
//       gainNode.disconnect(audioCtx.destination);
//       note_idx = 0;
//     }
//   }, duration);
// }

// function play2() {
//   oscillator.connect(gainNode);
//   gainNode.connect(audioCtx.destination);
  
//   // oscillator.type = 'square';
//   oscillator.detune.value = 100;
//   oscillator.start(0);
  
//   const initialVol = 0.001;
//   gainNode.gain.value = initialVol;
//   gainNode.gain.minValue = initialVol;
//   gainNode.gain.maxValue = initialVol;
  
//   play2_aux(note_idx);
// }


var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
var oscillator = audioCtx.createOscillator();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

var frequency = 0;
var type = 0;
var volume = 0;
var duration = 0;

function show() {
  let c = qs("#cIn").value;
  let f = qs("#fIn").value;
  frequency = f * 1 + c * 100;
  qs("#fOut").innerHTML = frequency + ' hz';

  switch (qs("#tIn").value * 1) {
    case 0: type = 'sine'; break;
    case 1: type = 'square'; break;
    case 2: type = 'sawtooth'; break;
    case 3: type = 'triangle'; break;
  }
  qs("#tOut").innerHTML = type;

  volume = qs("#vIn").value / 100;
  qs("#vOut").innerHTML = volume;

  duration = qs("#dIn").value;
  qs("#dOut").innerHTML = duration + ' ms';
}
show();

function beep() {
  // let oscillator = audioCtx.createOscillator();
  // let oscillator2 = audioCtx.createOscillator();
  
  // oscillator.connect(gainNode);
  // oscillator2.connect(gainNode);
  // gainNode.connect(audioCtx.destination);
  // oscillator.onended = function() {
  //   gainNode.disconnect(audioCtx.destination);
  //   oscillator.disconnect(gainNode);
  //   oscillator = null;
  // }
  // oscillator.detune.value = 100;
  
  // oscillator2.frequency.value = frequency * 3 / 2;
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  gainNode.gain.value = volume;
  
  oscillator.start();
  // oscillator2.start();
  oscillator.stop(audioCtx.currentTime + (duration / 1000));
  // oscillator2.stop(audioCtx.currentTime + (duration / 1000));
};

function oStart() {
}

function oStop() {
}

afterLoad(function() {
  // play1();
});
