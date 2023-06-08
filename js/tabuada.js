
var point, his, exp, n1, n2, inter;

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

function gameTimer() {
  clearInterval(inter);
  inter = setInterval(function() {
    let ms = exp - (new Date()).getTime();
    if (ms < 0) {
      gameResult();
    }
    if (qs("#time_left")) qs("#time_left").innerText = getTime(ms, "min");
  }, 1000);
}

function gameForm() {
  let html = `${ntot(n1)} vezes ${ntot(n2)}`;
  html = `<h1 class="">${capF(html)}</h1>`;
  html += `<h2 id="time_left">${getTime(exp - (new Date()).getTime() - 100, "min")}</h2>`;
  qs("#div_teste").innerHTML = html;
  qs("#div_result").innerHTML = "";
  qs("#n1").focus();

  formButton(1);
}

function formButton(type) {
  qs("form button").innerText = (type == 1 ? "Validar" : "Próximo");
  qs("form").onsubmit = function() {
    if (type == 1) gameResult();
    else getNumbers();
    return false;
  }
}

function gameHistory() {
  qs("#his").innerHTML = "";
  his.sort((a, b) => b.split("&")[0] - a.split("&")[0]).forEach(function(e) {
    qs("#his").innerHTML += e.split("&")[1] + "<br>";
  });
}


function gameAlert(typ, msg) {
  let html = `<div class="alert alert-dismissible alert-${typ} m-3" id="div_alert" role="alert">${msg}`;
  html += '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
  html += '</div>';
  qs("#div_result").innerHTML = html;
}

function getNumbers() {
  qs("#n1").value = "";
  qs("#n2").value = "";
  qs("#nr").value = "";
  qs("#point").innerHTML = `Total de ${point} pontos`;
  
  n1 = randomBetween(2, 9);
  n2 = randomBetween(1, 10);
  exp = (new Date()).getTime() + 31 * 1000;
  point -= 1;

  setCookieY("point", point);
  setCookieY("ult_his", `${his.length + 1}|${(new Date()).getTime()}&${n1}x${n2}= erro tipo - 5`);

  gameForm();
  gameTimer();
  gameHistory();
}

function gameResult() {
  clearInterval(inter);

  let msg = "";
  let typ = "danger";
  let err = "";
  if ((new Date()).getTime() > exp) {
    msg = "Você foi mais rápido que uma lesma... Mas parece que não deu tempo.";
    err = " - erro tipo 1";
  } else if (qs("#n1").value != n1) {
    msg = `Mas será que não sabe o que é "${ntot(n1)}"? Daaaarrrrr`;
    err = " - erro tipo 2";
  } else if (qs("#n2").value != n2) {
    msg = `Mas será que não sabe o que é "${ntot(n2)}"? Daaaarrrrr`;
    err = " - erro tipo 3";
  } else if (qs("#nr").value != n1 * n2) {
    msg = `Erroooooou!`;
    err = " - erro tipo 4";
  } else if (qs("#nr").value == n1 * n2) {
    msg = `Acertou!`;
    typ = "success";
    point += 2;
  }

  setCookieY("point", point);
  his.push(`${(new Date()).getTime()}&${qs("#n1").value}x${qs("#n2").value}=${qs("#nr").value}${err}`);
  setCookieY("his", encode(his));

  gameAlert(typ, msg);
  gameHistory();
  formButton(2);
}

afterLoad(function() {
  point = getCookie("point");
  if (!point) point = 0;
  
  his = getCookie("his");
  if (!his) his = "[]";
  his = decode(his, Array);
  let ult_his = getCookie("ult_his");
  ult_his = ult_his.split("|");
  if (his.length < ult_his[0]) {
    his.push(ult_his[1]);
    setCookieY("his", encode(his));
  }
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
