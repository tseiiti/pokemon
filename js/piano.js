const notas = {};
const ctx = new(AudioContext || webkitAudioContext)();

function gera_notas() {
  let letras = ["A", "A", "B", "C", "C", "D", "D", "E", "F", "F", "G", "G"];
  let latim = ["Lá", "Lá", "Si", "Dó", "Dó", "Ré", "Ré", "Mi", "Fá", "Fá", "Sol", "Sol"];
  let cnt = 2 ** (1 / 12);
  let bas = 27.5;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 12; j++) {
      let oitava = j < 3 ? i : i + 1;
      if (oitava > 0 && oitava < 10) {
        let nota = notas[`oitava_${oitava}`];
        if (!nota) nota = notas[`oitava_${oitava}`] = [];

        let su = [1, 4, 6, 9, 11].includes(j) ? "#" : "";
        let fr = cnt ** j * bas * 2 ** i;
        nota.push({
          id: j, 
          oitava: oitava, 
          letra: letras[j], 
          latim: latim[j],
          sustenido: su, 
          assinatura: `${letras[j]}${oitava}`,
          frequencia: fr
        });
      }
    }
  }
}

function teclado() {
  let keys, group_key, keyboard = qs(".keyboard");
  
  for (let i = 1; i < 10; i++) {
    let arr_nota = notas[`oitava_${i}`];
    keys = appendHtml(`<section class="col-12 col-sm-6 col-lg-4 keys"></section>`, keyboard);
    arr_nota.forEach(function(nota) {
      if (nota.sustenido == "#") {
        appendHtml(`<div class="key black" data-oitava="${nota.oitava}" data-id="${nota.id}"></div>`, group_key, true);
      } else {
        group_key = appendHtml(`<div class="group_key"></div>`, keys);
        appendHtml(`<div class="key white" data-oitava="${nota.oitava}" data-id="${nota.id}"><span>${nota.assinatura}</span></div>`, group_key);
      }
    });
  }
}

function tela() {
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

var oscs = [];
function gen_osc(frq, dtn) {
  oscs[0] = aux_osc(frq, 0);
  // oscs[1] = aux_osc(frq, dtn);
  // oscs[2] = aux_osc(frq, -dtn);
}

function stp_osc() {
  oscs[0].stop();
  oscs[0].disconnect();
  // oscs[1].stop();
  // oscs[1].disconnect();
  // oscs[2].stop();
  // oscs[2].disconnect();
}

function handleDown(key) {
  if (!key) return;
  
  let nota = notas[`oitava_${key.dataset.oitava}`][key.dataset.id];
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
  tela();
  appendHtml(`<div class="btn btn-primary mt-4" onclick="teste();">Teste</div>`);
});
