const audioCtx = new(AudioContext || webkitAudioContext)();
const adsr = { typ: 0, atk: 0, dec: 0, sus: 0, sai: 0, bas: 0, vol: 0, frq: 0, now: 0 };
const notas = {};
const gos = [];

function gera_notas() {
  let letra = ["A", "A", "B", "C", "C", "D", "D", "E", "F", "F", "G", "G"];
  let cnt = 2 ** (1 / 12);
  let bas = 27;
  
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 12; j++) {
      let oit = j < 3 ? i : i + 1;
      if (oit > 0 && oit < 10) {
        let id = j < 3 ? j + 9 : j - 3;
        let sus = [1, 4, 6, 9, 11].includes(j) ? "#" : "";
        let frq = cnt ** j * bas * 2 ** i;
        let key = `O${oit}L${letra[j]}${sus}`;
        notas[key] = {
          key: key, 
          sus: sus, 
          ass: `${letra[j]}${oit}`, 
          frq: frq, 
          go: null
        };
      }
    }
  }
}

function painel() {
  let html = `<div class="row m-0 items"></div>`;
  let items = appendHtml(html, qs("#panel"));
  
  ["now", "frq"].forEach(function(k) {
    html = `<div class="col-6"><p class="m-0 p-0" id="item_${k}">${k.toUpperCase()}: ${adsr[k]}</p></div>`;
    appendHtml(html, items);
  });
}

function teclado() {
  let letra = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  let group_key;
  let keyboard = qs(".keyboard");
  let html;
  
  for (let i = 1; i < 10; i++) {
    html = `<section class="col-12 col-sm-6 col-md-4 col-lg-3 collapse keys" id="keys_${i}"></section>`;
    let keys = appendHtml(html, keyboard);
    
    letra.forEach(function(k) {
      let nota = notas[`O${i}L${k}`]
      if (nota.sus == "#") {
        html = `<div class="key black" data-key="${nota.key}"></div>`;
        appendHtml(html, group_key, true);
      } else {
        html = `<div class="group_key"></div>`;
        group_key = appendHtml(html, keys);
        html = `<div class="key white" data-key="${nota.key}"><span>${nota.ass}</span></div>`;
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
    html = `<div class="form-check radio_type"><input class="form-check-input" type="radio" name="radio_type" id="radio_type_${e}" data-value="${e}"><label class="form-check-label" for="radio_type_${e}">${e}</label></div>`;
    appendHtml(html, qs("#radio_types"));
    qs(`#radio_type_${e}`).onclick = function() { conf_onchange(); }
  });
  
  qsa(".form-range").forEach(function(e) {
    e.onchange = function() { conf_onchange(); }
  });
  
  qs("#radio_type_sine").click();
  createGO();
  createGO();
  createGO();
}

function conf_onchange() {
  let radio_type = qs('input[name="radio_type"]:checked');
  adsr.typ = radio_type.dataset.value;
  adsr.atk = qs("#range_atk").value;
  adsr.dec = qs("#range_dec").value;
  adsr.sus = qs("#range_sus").value;
  adsr.sai = qs("#range_sai").value;
  adsr.bas = qs("#range_bas").value;
  adsr.vol = qs("#range_vol").value;
  
  // Object.keys(adsr).forEach(function(k) {
  //   qs(`#item_${k}`).innerText = `${k}: ${adsr[k]}`;
  // });
}

function eventos() {
  qsa(".key").forEach(function(e) {
    e.onmousedown = function() { handleDown(e); }
    e.onmouseup = function() { handleUp(e); } 
    e.onmouseleave = function() { handleUp(e); }
    // e.ontouchstart = function() { handleDown(e); }
    // e.ontouchend = function() { handleUp(e); }
  });
  
  qsa(".form-range").forEach(function(e) {
    e.oninput = function() {
      let f = qs(`label[for="${e.id}"]`);
      f.innerText = `${f.dataset.value} ${Number(e.value).toFixed(1)}`;
    }
    e.oninput();
  });
}

function animation(timestamp) {
  for (let i = 0; i < gos.length; i++) {
    let vlr = gos[i].gainNode.gain.value * 100;
    qs(`#item_go${i}`).innerText = `GOS: ${vlr.toFixed(2)}`;
  }
  
  requestAnimationFrame(animation);
}

function tela() {
  gera_notas();
  painel();
  teclado();
  configuracoes();
  eventos();
  requestAnimationFrame(animation);
  // custom_console();
}

function createGO() {
  let html = `<div class="col-6"><p class="m-0 p-0" id="item_go${gos.length}">GOS: 0</p></div>`;
  appendHtml(html, qs("div.items"));
  
  let gainNode = audioCtx.createGain();
  let oscillator = audioCtx.createOscillator();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.value = 0;
  oscillator.detune.value = 0;
  oscillator.start(0);

  gos.push({
    oscillator: oscillator, 
    gainNode: gainNode
  });
  
  return gos.slice(-1);
}

function handleDown(key) {
  let nota = notas[key.dataset.key];
  let go = gos.find(e => e.gainNode.gain.value == 0);
  if (!go) go = createGO();

  if (!nota.frq) return;
  if (!go.oscillator) return;
  if (!go.gainNode) return;
  
  noteOn(nota.frq, go.oscillator, go.gainNode);
  nota.go = go;
  adsr.frq = nota.frq;
  
  ["now", "frq"].forEach(function(k) {
    let v = Math.floor(adsr[k] * 1000) / 1000;
    qs(`#item_${k}`).innerText = `${k.toUpperCase()}: ${v}`;
  });
  
  if (key.className.includes("black")) {
    key.classList.add("black_pressed");
    return
  }
  key.style.background = "#ddd";
}

function handleUp(key) {
  let nota = notas[key.dataset.key];
  if (!nota.go) return;
  
  noteOff(nota.go.gainNode);
  
  if (key.className.includes("black")) {
    key.classList.remove("black_pressed");
    return
  }
  key.style.background = "white";
}

function noteOn(frequency, oscillator, gainNode) {
  adsr.now = audioCtx.currentTime;
  oscillator.type = adsr.typ;
  oscillator.frequency.value = frequency;
  
  let aet = adsr.now + (adsr.atk * adsr.bas);
  let ded = adsr.dec * adsr.bas;
  
  gainNode.gain.cancelScheduledValues(adsr.now);
  gainNode.gain.setValueAtTime(0, adsr.now);
  gainNode.gain.linearRampToValueAtTime(adsr.vol, aet);
  gainNode.gain.setTargetAtTime(adsr.sus, aet, ded);
}

function noteOff(gainNode) {
  adsr.now = audioCtx.currentTime;
  
  let ret = adsr.now + adsr.sai * adsr.bas;
  
  gainNode.gain.cancelScheduledValues(adsr.now);
  gainNode.gain.setValueAtTime(gainNode.gain.value, adsr.now);
  gainNode.gain.linearRampToValueAtTime(0, ret);
}

afterLoad(function() {
  tela();
});
