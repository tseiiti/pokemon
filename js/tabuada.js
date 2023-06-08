
var point, exp, n1, n2, inter;

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
  qs("#n1").value = "";
  qs("#n2").value = "";
  qs("#nr").value = "";
  qs("#point").innerHTML = `Total de ${point} pontos`;
  
  n1 = randomBetween(2, 9);
  n2 = randomBetween(1, 10);
  exp = (new Date()).getTime() + 21 * 1000;

  let html = `${ntot(n1)} vezes ${ntot(n2)}`;
  html = `<h1 class="">${capF(html)}</h1>`;
  html += `<h2 id="time_left">${getTime(exp - (new Date()).getTime() - 100, "min")}</h2>`;
  qs("#div_teste").innerHTML = html;
  qs("#div_result").innerHTML = "";

  clearInterval(inter);
  inter = setInterval(function() {
    let ms = exp - (new Date()).getTime();
    if (ms <= 0) {
      clearInterval(inter);
      ms = 0;
    }
    if (qs("#time_left")) qs("#time_left").innerText = getTime(ms, "min");
  }, 1000);
  
  point -= 1;
  qs("#btn_val_nam").innerText = "Validar";
  qs("#btn_val_nam").onclick = function() {
    gameResult();
  }
}

function gameResult() {
  clearInterval(inter);
  let msg = "";
  let typ = "danger";
  if ((new Date()).getTime() > exp) {
    msg = "Você foi mais rápido que uma lesma... Mas não deu tempo";
  } else if (qs("#n1").value != n1) {
    msg = `Mas será que não sabe o que é "${ntot(n1)}"?`;
  } else if (qs("#n2").value != n2) {
    msg = `Mas será que não sabe o que é "${ntot(n2)}"?`;
  } else if (qs("#nr").value != n1 * n2) {
    msg = `Erroooooou!`;
  } else if (qs("#nr").value == n1 * n2) {
    msg = `Acertou!`;
    typ = "success";
    point += 2;
  }
  setCookieY("tabuada", point);

  let html = `<div class="alert alert-dismissible alert-${typ} m-3" id="div_alert" role="alert">${msg}`;
  html += '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
  html += '</div>';
  qs("#div_result").innerHTML = html;
  
  qs("#btn_val_nam").innerText = "Próximo";
  qs("#btn_val_nam").onclick = function() {
    getNumbers();
  }
}

afterLoad(function() {
  point = getCookie("tabuada");
  if (!point) point = 0;
  getNumbers();
  
  qs("#n1").oninput = function() {
    if (qs("#n1").value == n1)
      qs("#n2").focus();
  }
  qs("#n2").oninput = function() {
    if (qs("#n2").value == n2)
      qs("#nr").focus();
  }
  
});
