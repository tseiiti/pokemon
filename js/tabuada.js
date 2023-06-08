
var point = 0, exp, n1, n2, inter;

function ntot(n) {
  if (n == 1) {
    return 'um';
  } else if (n == 2) {
    return 'dois';
  } else if (n == 3) {
    return 'três';
  } else if (n == 4) {
    return 'quatro';
  } else if (n == 5) {
    return 'cinco';
  } else if (n == 6) {
    return 'seis';
  } else if (n == 7) {
    return 'sete';
  } else if (n == 8) {
    return 'oito';
  } else if (n == 9) {
    return 'nove';
  } else if (n == 10) {
    return 'dez';
  }
}

function getNumbers() {
  n1 = randomBetween(2, 9);
  n2 = randomBetween(1, 10);
  exp = (new Date()).getTime() + 31 * 1000;

  let html = `${ntot(n1)} vezes ${ntot(n2)}`;
  html = `<h1 class="">${capF(html)}</h1>`;
  html += `<h2 id="time_left">${getTime(exp - (new Date()).getTime() - 100, "min")}</h2>`;
  html += '<input type="text" style="height: 28px; width: 26px; text-align:center;">';
  html += '<label class="m-1">x</label>';
  html += '<input type="text" style="height: 28px; width: 26px; text-align:center;">';
  html += '<label class="m-1">=</label>';
  html += '<input type="text" style="height: 28px; width: 32px; text-align:center;">';
  qs("#div_teste").innerHTML = html;

  clearInterval(inter);
  inter = setInterval(function() {
    let ms = exp - (new Date()).getTime();
    if (ms <= 0) {
      clearInterval(inter);
      ms = 0;
    }
    if (qs("#time_left")) qs("#time_left").innerText = getTime(ms, "min");
  }, 1000);

  html = `<div class="alert alert-dismissible alert-secondary" id="div_alert" role="alert">`;
  html += '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
  html += 'teste';
  html += '</div>';
  qs("#div_result").innerHTML = html;
}

function gameResult() {
  clearInterval(inter);
  if ((new Date()).getTime() > exp) {
    msg = "Você foi mais rápido que uma lesma... Mas acho que não foi a tempo";
    typ = "secondary";
    qs("#div_alert").innerText = msg;

  } else {
  }  

  let html = `<div class="alert alert-dismissible alert-${typ}" id="div_alert" role="alert">`;
  html += '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
  html += 'teste';
  html += '</div>';
  qs("#div_result").innerHTML = html;
}

afterLoad(function() {
  getNumbers();

  qs("#btn_val_nam").onclick = function() {
    gameResult();
  }
});
