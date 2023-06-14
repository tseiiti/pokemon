
var hist, exp, tmp, err, eve, n1, n2, inter;

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

function gameForm() {
  let html = `${ntot(n1)} vezes ${ntot(n2)}`;
  html = `<h1 class="p-0 m-0">${capF(html)}</h1>`;
  html += `<h2 id="time_left">${getTime(exp - (new Date()).getTime() - 100, "min")}</h2>`;
  qs("#div_teste").innerHTML = html;
  qs("#div_result").innerHTML = "";
  qs("#n1").focus();

  formButton(1);
}

function formButton() {
  qs("form button").innerText = (eve == 1 ? "Validar" : "Próximo");
  qs("form").onsubmit = function() {
    if (eve == 1) gameResult();
    else getNumbers();
    return false;
  }
}

function gameTimer() {
  clearInterval(inter);
  inter = setInterval(function() {
    let ms = exp - (new Date()).getTime();
    if (qs("#time_left")) {
      if (ms <= 0) ms = 0;
      qs("#time_left").innerText = getTime(ms, "min");
    }
    if (ms <= 0)
      gameResult();
  }, 1000);
}

function gameHistory() {
  let his = [...hist];
  let pnts = his.shift();
  let html = "";
  his.sort((a, b) => b.split("&")[0] - a.split("&")[0]).forEach(function(e) {
    let f = e.split("&");
    let d = new Date(+f[2]);
    let s = pLeft(d.getSeconds());
    let l = pLeft(d.getMilliseconds(), 3);
    html += `<tr>
      <td>${getTime(+f[0])}</td>
      <td>${f[1]}</td>
      <td>${s}:${l}</td>
      <td>${f[3]}</td>
      </tr>`;
  });
  qs("#hist").innerHTML = html;
  qs("#pnts").innerHTML = `Total de ${pnts} pontos`;
}

function gameAlert(typ, msg) {
  let html = `<div class="alert alert-dismissible alert-${typ} m-3" id="div_alert" role="alert">${msg}`;
  html += '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
  html += '</div>';
  qs("#div_result").innerHTML = html;
}

function updateHist() {
  let txt = (new Date()).getTime();
  txt += `&${qs("#n1").value ? qs("#n1").value : n1}`;
  txt += `${qs("#n1").value != n1 ? '*' : ''}`;
  txt += `x${qs("#n2").value ? qs("#n2").value : n2}`;
  txt += `${qs("#n2").value != n2 ? '*' : ''}`;
  txt += `=${qs("#nr").value}&${tmp}&${err}`
  
  hist.push(txt);
  setCookieY("hist", hist.toString());
}

function getNumbers() {
  eve = 1;
  tmp = '';

  qs("#n1").value = "";
  qs("#n2").value = "";
  qs("#nr").value = "";
  
  n1 = randomBetween(4, 9);
  n2 = randomBetween(2, 9);
  exp = (new Date()).getTime() + 16 * 1000;
  err = "sessão expirada";
  hist[0] -= 3;

  updateHist();
  gameForm();
  gameTimer();
}

function gameResult() {
  clearInterval(inter);
  eve = 2;
  tmp = (new Date()).getTime() - (exp - 16 * 1000);

  let msg = "";
  let typ = "danger";
  err = "";
  if ((new Date()).getTime() > exp) {
    msg = "Você foi mais rápido que uma lesma... Mas parece que não deu tempo.";
    err = "tempo expirado";
  } else if (qs("#n1").value != n1) {
    msg = `Mas será que não sabe o que é "${ntot(n1)}"? Daaaarrrrr`;
    err = "1° número inválido";
  } else if (qs("#n2").value != n2) {
    msg = `Mas será que não sabe o que é "${ntot(n2)}"? Daaaarrrrr`;
    err = "2° número inválido";
  } else if (qs("#nr").value != n1 * n2) {
    msg = `Erroooooou!`;
    err = "multiplicação incorreta";
  } else if (qs("#nr").value == n1 * n2) {
    msg = `Acertou!`;
    typ = "success";
    hist[0] += 4;
  }
  
  if (hist[0] == 100 && typ == "success") {
    msg = `Parabéns! Você chegou no nível azul claro! Quando fizer 1000 pontos chegará no nível azul escuro.`;
    typ = "info";
  }
  
  hist.pop();
  updateHist();
  gameHistory();
  gameAlert(typ, msg);
  formButton();
}

afterLoad(function() {
  hist = getCookie("hist") || "0";
  hist = hist.split(',');
  gameHistory();
  
  qs("#n1").oninput = function() {
    if (qs("#n1").value == n1)
      qs("#n2").focus();
  }
  qs("#n2").oninput = function() {
    if (qs("#n2").value == n2)
      qs("#nr").focus();
  }
});
