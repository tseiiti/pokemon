var notas, audioCtx, gainNode, oscillator;

function inicio() {
  notas = {};
  audioCtx = new(AudioContext || webkitAudioContext)();
  gainNode = audioCtx.createGain();
  oscillator = audioCtx.createOscillator();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  gainNode.gain.value = 0.001;
  gainNode.gain.minValue = 0.001;
  gainNode.gain.maxValue = 0.001;
  
  oscillator.detune.value = 0;
  oscillator.start(0);
}

function gera_notas() {
  let letras = ["A", "A", "B", "C", "C", "D", "D", "E", "F", "F", "G", "G"];
  let latim = ["Lá", "Lá", "Si", "Dó", "Dó", "Ré", "Ré", "Mi", "Fá", "Fá", "Sol", "Sol"];
  let cnt = 2 ** (1 / 12);
  let bas = 27.5;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 12; j++) {
      let oit = j < 3 ? i : i + 1;
      
      if (oit > 0 && oit < 10) {
        if (!notas[`oitava_${oit}`])
          notas[`oitava_${oit}`] = [];
        let id = j < 3 ? j + 9 : j - 3;
        let su = [1, 4, 6, 9, 11].includes(j) ? "#" : "";
        let fr = cnt ** j * bas * 2 ** i;
        notas[`oitava_${oit}`].push({
          id: id, 
          oitava: oit, 
          letra: letras[j], 
          latim: latim[j],
          sustenido: su, 
          assinatura: `${letras[j]}${oit}`,
          frequencia: fr
        });
      }
    }
  }
}

function teclado() {
  let group_key;
  let keyboard = qs(".keyboard");
  let html;
  
  for (let i = 1; i < 10; i++) {
    html = `<section class="col-12 col-sm-6 col-md-4 col-lg-3 collapse keys" id="keys_${i}"></section>`;
    let keys = appendHtml(html, keyboard);
    let arr_nota = notas[`oitava_${i}`];
    
    arr_nota.forEach(function(nota) {
      if (nota.sustenido == "#") {
        html = `<div class="key black" data-oitava="${nota.oitava}" data-id="${nota.id}"></div>`;
        appendHtml(html, group_key, true);
      } else {
        html = `<div class="group_key"></div>`;
        group_key = appendHtml(html, keys);
        html = `<div class="key white" data-oitava="${nota.oitava}" data-id="${nota.id}"><span>${nota.assinatura}</span></div>`;
        appendHtml(html, group_key);
      }
    });
  }
}

function configuracoes() {
  let html;
  
  for (let i = 1; i < 10; i++) {
    html = `<div class="form-check form-switch col-6 col-sm-4 col-md-3"><label class="form-check-label" for="conf_check">${i}⁰ Oitava</label><input class="form-check-input" id="check_keys_${i}" type="checkbox" role="switch" data-bs-toggle="collapse" data-bs-target="#keys_${i}" aria-expanded="false" aria-controls="keys_${i}"></div>`;
    appendHtml(html, qs("#check_keys"));
  }
  qs("#check_keys_4").click();
  qs("#check_keys_5").click();
  
  ["sine", "square", "sawtooth", "triangle"].forEach(function(e) {
    html = `<div class="form-check"><input class="form-check-input" type="radio" name="radio_type" id="radio_type_${e}" data-value="${e}"><label class="form-check-label" for="radio_type_${e}">${e}</label></div>`;
    appendHtml(html, qs("#radio_types"));
  });
  qs("#radio_type_sine").click();
}

function tela() {
  inicio();
  gera_notas();
  teclado();
  configuracoes();
  
  qsa(".key").forEach(function(key) {
    key.onmousedown = function() { handleDown(key); }
    key.onmouseup = function() { handleUp(key); }
    // key.onmouseleave = function() { handleUp(key); }
    key.ontouchstart = function() { handleDown(key); }
    key.ontouchend = function() { handleUp(key); }
  });
}

function ger_osc(type, frequency, gain) {
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.value = gain;
}

function handleDown(key) {
  if (!key) return;
  
  let gain = qs("#range_gain").value / 100;
  
  let type = qs('input[name="radio_type"]:checked').dataset.value;
  let nota = notas[`oitava_${key.dataset.oitava}`][key.dataset.id];
  ger_osc(type, nota.frequencia, gain);
  
  if (key.className.includes("black")) {
    key.classList.add("black_pressed");
    return
  }
  key.style.background = "#ddd";
}

function handleUp(key) {
  if (!key) return;
  
  // stp_osc();
  
  if (key.className.includes("black")) {
    key.classList.remove("black_pressed");
    return
  }
  key.style.background = "white";
}

// document.onkeydown = function(event) {
//   handleDown(qs(`.key[data-key=${event.key}]`));
// }

// document.onkeyup = function(event) {
//   handleUp(qs(`.key[data-key=${event.key}]`));
// }

afterLoad(function() {
  tela();
  // appendHtml(`<div class="btn btn-primary mt-4" onclick="teste();">Teste</div>`);
});


  // noteOff();
  // noteOn(nota.frequencia);
  // gen_osc(nota.frequencia, 10);

// function teste() {
//   let audioCtx = new(AudioContext || webkitAudioContext)();
//   // var gai = audioCtx.createGain();
//   // gai.connect(audioCtx.destination);
//   let osc = audioCtx.createOscillator();
//   // osc.connect(gai);
//   osc.type = "sine";
//   osc.frequency.value = 440;
//   osc.connect(audioCtx.destination);
//   osc.start();
//   osc.stop(audioCtx.currentTime + 2);
// }

// const adsr = {
//   attack: 0.2,
//   decay: 0, 
//   sustain: 1, 
//   realease: 0.3, 
//   max_time: 2
// };

// function aux_osc(frq, dtn) {
//   let osc = audioCtx.createOscillator();
//   osc.type = "sine";
//   osc.frequency.value = frq;
//   osc.detune.value = dtn;
//   osc.connect(audioCtx.destination);
//   osc.start();
//   return osc;
// }

// var oscs = [];
// function gen_osc(frq, dtn) {
//   oscs[0] = aux_osc(frq, 0);
//   // oscs[1] = aux_osc(frq, dtn);
//   // oscs[2] = aux_osc(frq, -dtn);
// }

// function stp_osc() {
//   if (oscs[0]) {
//     oscs[0].stop();
//     oscs[0].disconnect();
//   }
//   // oscs[1].stop();
//   // oscs[1].disconnect();
//   // oscs[2].stop();
//   // oscs[2].disconnect();
// }

// function noteOn(frq) {
//   let now = audioCtx.currentTime;
//   let atk = adsr.attack * adsr.max_time;
//   let aet = now + atk;
//   let ded = adsr.decay * adsr.max_time;

//   gainNode.gain.cancelScheduledValues(now);
//   let osc = audioCtx.createOscillator();
//   osc.frequency.value = frq;
//   osc.connect(gainNode);

//   gainNode.gain.setValueAtTime(0, now);
//   gainNode.gain.linearRampToValueAtTime(1, aet);
//   gainNode.gain.setTargetAtTime(adsr.sustain, aet, ded);
// }

// function noteOff() {
//   let now = audioCtx.currentTime;
//   let rld = adsr.realease * adsr.max_time;
//   let ret = now + rld;

//   gainNode.gain.cancelScheduledValues(now);
//   gainNode.gain.setValueAtTime(gainNode.gain.value, now);
//   gainNode.gain.linearRampToValueAtTime(0, ret);
// }