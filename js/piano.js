const notas = [];
const ctx = new(AudioContext || webkitAudioContext)();
var oscs = [];

function gera_notas() {
  let letras = ["A", "A", "B", "C", "C", "D", "D", "E", "F", "F", "G", "G"];
  let latim = ["Lá", "Lá", "Si", "Dó", "Dó", "Ré", "Ré", "Mi", "Fá", "Fá", "Sol", "Sol"];
  let cnt = 2 ** (1 / 12);
  let bas = 27.5;
  let id = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 12; j++) {
      let oi = j < 3 ? i : i + 1;
      if (oi > 0 && oi < 10) {
        let lt = letras[j];
        let su = [1, 4, 6, 9, 11].includes(j) ? "#" : "";
        let fr = cnt ** j * bas * 2 ** i;
        notas.push({
          id: id, 
          oitava: oi, 
          letra: lt, 
          sustenido: su, 
          assinatura: `${lt}${oi}${su}`,
          latim: latim[j] + su,
          frequencia: fr
        });
        id++;
      }
    }
  }
}

function teclado() {
  let keys, group_key, oitava = 0, piano = qs(".piano");
  
  notas.forEach(function(nota) {
    if (nota.oitava != oitava) {
      oitava = nota.oitava;
      keys = appendHtml(`<section class="keys"></section>`, piano, true);
      appendHtml(`<section class="controls">${oitava}° oitava</section>`, piano, true);
    }
    if (nota.sustenido == "#") {
      appendHtml(`<div class="key black" data-key="w" data-nota_id="${nota.id}"><span>${nota.latim}</span></div>`, group_key, true);
    } else {
      group_key = appendHtml(`<div class="group_key"></div>`, keys);
      appendHtml(`<div class="key white" data-key="a" data-nota_id="${nota.id}"><span>${nota.latim}</span></div>`, group_key);
    }
  });
}

function teclados() {
  gera_notas();
  teclado();
  
  qsa(".key").forEach(function(key) {
    key.onmousedown = function() { handleDown(key); }
    key.onmouseup = function() { handleUp(key); }
    key.onmouseleave = function() { handleUp(key); }
    key.ontouchstart = function() { handleDown(key); }
    key.ontouchend = function() { handleUp(key); }
  });
}

function aux_osc(frq, dtn) {
  let osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = frq;
  osc.detune.value = dtn;
  osc.connect(ctx.destination);
  osc.start();
  return osc;
}

function gen_osc(frq, dtn) {
  oscs[0] = aux_osc(frq, 0);
  oscs[1] = aux_osc(frq, dtn);
  oscs[2] = aux_osc(frq, -dtn);
}

function stp_osc() {
  oscs[0].stop();
  oscs[0].disconnect();
  oscs[1].stop();
  oscs[1].disconnect();
  oscs[2].stop();
  oscs[2].disconnect();
}

function handleDown(key) {
  if (!key) return;
  
  let nota = notas[key.dataset.nota_id];
  gen_osc(nota.frequencia, 11);
  
  if (key.className.includes("black")) {
    key.classList.add("black_pressed");
    return
  }
  key.style.background = "#ddd";
}

function handleUp(key) {
  if (!key) return;
  
  stp_osc();
  
  if (key.className.includes("black")) {
    key.classList.remove("black_pressed");
    return
  }
  key.style.background = "white";
}

function teste() {
  let ctx = new(AudioContext || webkitAudioContext)();
  // var gai = ctx.createGain();
  // gai.connect(ctx.destination);
  let osc = ctx.createOscillator();
  // osc.connect(gai);
  osc.type = "sine";
  osc.frequency.value = 440;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 2);
}

// document.onkeydown = function(event) {
//   handleDown(qs(`.key[data-key=${event.key}]`));
// }

// document.onkeyup = function(event) {
//   handleUp(qs(`.key[data-key=${event.key}]`));
// }

afterLoad(function() {
  teclados();
  appendHtml(`<div class="btn btn-primary mt-4" onclick="teste();">Teste</div>`);
});
