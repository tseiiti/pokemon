var notas, audioCtx, gainNode, oscillator, adsr = {
  ded: 0, 
  now: 0, 
  volume: 0, 
  type: 0, 
  max_time: 0, 
  frequency: 0, 
  attack: 0, 
  decay: 0, 
  sustain: 0, 
  realease: 0
};

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
  
  audioCtx.onstatechange = function () {
    cc(audioCtx.state);
  };
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

function painel() {
  Object.keys(adsr).forEach(function(k) {
    let html = `<div class="col-6"><p class="m-0 p-0" id="item_${k}">${adsr[k]}</p></div>`;
    appendHtml(html, qs(".items"));
  });
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
  
  qs("#check_panel").click();
  
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
  
  getValues({ oitava: 4, id: 0 });
}

function eventos() {
  qsa(".key").forEach(function(e) {
    e.onmousedown = function() { handleDown(e); }
    e.onmouseup = function() { handleUp(e); }
    // e.onmouseleave = function() { handleUp(e); }
    e.ontouchstart = function() { handleDown(e); }
    e.ontouchend = function() { handleUp(e); }
  });
  
  qsa(".form-range").forEach(function(e) {
    e.oninput = function() {
      let f = e.parentElement.previousElementSibling;
      f.innerText = `${f.dataset.value} ${e.value}`;
    }
    e.oninput();
  });
}

function tela() {
  inicio();
  gera_notas();
  painel();
  teclado();
  configuracoes();
  eventos();
}

function getValues(dataset) {
  let nota = notas[`oitava_${dataset.oitava}`][dataset.id];
  let radio_type = qs('input[name="radio_type"]:checked');
  
  adsr.now = Math.floor(audioCtx.currentTime * 1000) / 1000;
  adsr.volume = qs("#range_vol").value;
  adsr.type = radio_type.dataset.value;
  adsr.frequency = nota.frequencia.toFixed(2);
  adsr.attack = qs("#range_atk").value;
  adsr.decay = qs("#range_dec").value;
  adsr.sustain = qs("#range_sus").value;
  adsr.realease = qs("#range_rel").value;
  adsr.max_time = qs("#range_mxt").value;
  
  Object.keys(adsr).forEach(function(k) {
    qs(`#item_${k}`).innerText = `${k}: ${adsr[k]}`;
  });
}

function noteOn() {
  let aet = adsr.now + adsr.attack * adsr.max_time;
  let ded = adsr.decay * adsr.max_time;
  // let can = adsr.now > adsr.ded ? adsr.now : adsr.ded;
  
  // adsr.ded = Math.floor((aet + ded) * 1000) / 1000;
  
  oscillator.type = adsr.type;
  oscillator.frequency.value = adsr.frequency;

  // gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, aet);
  gainNode.gain.setTargetAtTime(adsr.sustain, aet, ded);
}

function noteOff() {
  let ret = adsr.now + adsr.realease * adsr.max_time;
  // let can = adsr.now > adsr.ded ? adsr.now : adsr.ded;
  
  // gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
  gainNode.gain.setValueAtTime(gainNode.gain.value, adsr.now);
  gainNode.gain.linearRampToValueAtTime(0, ret);
}

function handleDown(key) {
  if (!key) return;
  
  getValues(key.dataset);
  noteOn();
  
  if (key.className.includes("black")) {
    key.classList.add("black_pressed");
    return
  }
  key.style.background = "#ddd";
}

function handleUp(key) {
  if (!key) return;
  
  getValues(key.dataset);
  noteOff();
  
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
});


  // oscillator = audioCtx.createOscillator();
  // oscillator.connect(gainNode);
  // // oscillator.detune.value = 0;
  
  // oscillator.onended = function() {
  //   oscillator.disconnect(gainNode);
  // }
  // oscillator.start(0);
  
  
  // ger_osc(key.dataset);
// function ger_osc(dataset) {
//   let gain = qs("#range_gain").value / 100;
//   let type = qs('input[name="radio_type"]:checked').dataset.value;
//   let nota = notas[`oitava_${dataset.oitava}`][dataset.id];
  
//   oscillator.type = type;
//   oscillator.frequency.value = nota.frequencia;
//   gainNode.gain.value = gain;
  
//   qs("#item1").innerText = type;
//   qs("#item2").innerText = gain;
//   qs("#item3").innerText = nota.id + 1;
//   qs("#item4").innerText = nota.frequencia;
// }

  // appendHtml(`<div class="btn btn-primary mt-4" onclick="teste();">Teste</div>`);
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


  // stp_osc();
  // gen_osc(nota.frequencia, 10);
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