// custom_console();

// const letra = ["A", "A", "B", "C", "C", "D", "D", "E", "F", "F", "G", "G"];
// const suste = [1, 4, 6, 9, 11];
// const cnt = 2 ** (1 / 12);
// const bas = 27;
// const notas = {};

// for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 12; j++) {
//     let oit = j < 3 ? i : i + 1;
//     if (oit > 0 && oit < 10) {
//       let id = j < 3 ? j + 9 : j - 3;
//       let sus = suste.includes(j) ? "#" : "";
//       let frq = cnt ** j * bas * 2 ** i;
//       notas[`O${oit}L${letra[j]}S${sus}`] = {
//         letra: letra[j], 
//         suste: sus, 
//         assin: `${letra[j]}${oit}`,
//         frequ: frq
//       };
//     }
//   }
// }


// Object.keys(notas).forEach(function(k) {
//   cc(k)
// });

let p1 = appendHtml(`<p id="p1">p1</p>`);
let p2 = appendHtml(`<p id="p2">p2</p>`);
let p3 = appendHtml(`<p id="p3">p3</p>`);
let p4 = appendHtml(`<p id="p4">p4</p>`);

appendHtml(`<button class="btn btn-primary m-2" onclick="toggle()">toggle</button>`);
appendHtml(`<button class="btn btn-primary m-2" onclick="toca()">toca</button>`);

cc(null ? "x" : "y")

console.time("teste 1");
for (let i = 0; i < 1000000; i++) {
  p1.dataset.teste = i;
  let r = p1.dataset.teste;
}
console.timeEnd("teste 1");

let t = {}
console.time("teste 2");
for (let i = 0; i < 1000000; i++) {
  t.teste = i;
  let r = t.teste;
}
console.timeEnd("teste 2");

console.time("teste 3");
for (let i = 0; i < 1000000; i++) {
  p2.setAttribute("teste", i);
  let r = p2.teste;
}
console.timeEnd("teste 3");


// let start = false;
// let notas = [];
// let audioCtx = new(AudioContext || webkitAudioContext)();

// function crea() {
//   let gainNode = audioCtx.createGain();
//   let oscillator = audioCtx.createOscillator();

//   oscillator.connect(gainNode);
//   gainNode.connect(audioCtx.destination);
  
//   gainNode.gain.value = 0;
  
//   oscillator.detune.value = 0;
//   oscillator.start(0);
  
//   notas.push({
//     oscillator: oscillator, 
//     gainNode: gainNode
//   });
  
//   return notas.slice(-1);
// }

// function toca() {
//   let gainNode = notas.find(e => e.gainNode.gain.value == 0);
//   if (!gainNode) gainNode = crea();
//   gainNode = gainNode.gainNode;
  
//   let aet = audioCtx.currentTime + 0.6;
//   gainNode.gain.linearRampToValueAtTime(1, aet);
//   gainNode.gain.setTargetAtTime(0.7, aet, 0.4);
  
//   gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime + 2);
//   gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 3);
// }

// function step(timestamp) {
//   let n = notas.find(e => e.gainNode.gain.value == 0);
  
//   p1.innerText = timestamp;
//   p2.innerText = notas.length;
//   p3.innerText = n ? n.gainNode : 'null';
//   p4.innerText = notas.indexOf(n);
  
//   if (start) {
//     requestAnimationFrame(step);
//   }
// }

// function toggle() {
//   if (start) {
//     start = false;
//   } else {
//     start = true;
//     requestAnimationFrame(step);
//   }
// }
