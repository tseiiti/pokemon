// import {*} as u from "/js/utils.js";
// import {*} as g from "/js/game.js";

// ab("version: 0.1.5", "footer");

var user, pok_id, last_game, timer;
userCheck();

function userCheck() {
  user = getSession("user");
  if (!user) {
    if (pok_id) alert("Quem é você? Demorou tanto que o sistema te esqueceu...");
    history.pushState(null, document.title, location.href);
    location.replace("/login.html");
  } else {
    user = decodeUser(user);
  }
}

function userCard() {
  qs("h4.card-header").innerText = user.name;
  qs("h5.card-title").innerText = "Total de " + user.score() + " pontos";
  qs("h6.card-subtitle.mb-2.text-muted").innerText = "último acesso: " + getTime(user.update_at, "long");
  
  // log games
  let games = user.games.sort((a, b) => b.create_at - a.create_at).slice(0, 30);
  let html = "";
  games.forEach(function(g) {
    html += `
      <tr>
        <td>${getTime(g.update_at)}</td>
        <td>${getLevel(g.level).til.toLowerCase()}</td>
        <td${g.answer.length > 10 ? ' title="' + g.answer + '"' : ""}>
          ${g.answer.substring(0, 10)}${g.answer.length > 10 ? "..." : ""}
        </td>
        <td>${!g.answer ? "-" : g.score == 0 ? "errou" : g.score}</td>
      </tr>`
  });
  qs("#tbody_logs").innerHTML = html;
}

function levelChange() {
  clearInterval(timer);
  
  if (this.value) {
    user.level = this.value;
    updateUser(user);
  }

  endGame();
  userCard();

  qs("#div_btn_level button.btn-primary").className = "btn btn-outline-primary"
  qs(`[name=button_level_${user.level}]`).className = "btn btn-primary";
}

function getPoke() {
  pok_id = randomBetween(1, 905);
  let img = qs("#poke_image");
  img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pok_id.toString().padStart(3, "0")}.png`;
  // img.src = `/img/pokes/${pok_id.toString().padStart(3, "0")}.png`;
  img.alt = "créditos da imagem a pokemon.com";
  
  last_game = new Game(user.level, pok_id, "", 0);
  user.games.push(last_game);
  updateUser(user);
  
  let exp = last_game.create_at + getLevel().tim * 1000;
  clearInterval(timer);
  timer = setInterval(function() {
    let ms = exp - (new Date()).getTime();
    if (ms <= 0) {
      clearInterval(timer);
      ms = 0;
    }
    if (qs("#time_left")) qs("#time_left").innerText = getTime(ms, "min");
  }, 1000);
}

function gameVeryEasy() {
    let ids = [];
    while(ids.length < 4) {
      let id = randomBetween(1, 905);
      if (id == pok_id || ids.includes(id)) continue;
      ids.push(id);
    }
    ids.splice(random(4), 0, pok_id);
    let html = "";
    ids.forEach(function(id) {
      let val = pokes[id][0].toUpperCase() + pokes[id].substring(1);
      html += '<div class="form-check">';
      html += `<input class="form-check-input" id="radio-${id}" type="radio" name="rad_val_nam" value="${val}">`;
      html += `<label class="form-check-label" for="radio-${id}">${val}</label>`;
      html += '</div>';
    });

    qs("#div_val_nam").innerHTML = html;
}

function gameEasy() {
    let str = pokes[pok_id];
    let ids = [];
    if (str.length < 3) {
      ids = [0, 1];
    } else {
      while(ids.length < Math.floor(str.length / 2)) {
        let i = randomBetween(0, str.length - 1);
        if (!ids.includes(i)) ids.push(i);
      }
    }
    let html = "";
    for (let i = 0; i < str.length; i++) {
      let c = str[i];
      if (i == 0) c = c.toUpperCase();
      if (ids.includes(i))
        html += `<input class="empty" name="txt_val_nam" type="text" style="width: 20px; text-align:center;">`;
      else
        html += `<label class="mx-1" name="txt_val_nam" for="txt_val_nam">${c}</label>`;
    }
    qs("#div_val_nam").innerHTML = html;
    
    qsa("input.empty").forEach(function(e) {
      e.oninput = function() {
        if (this.value) {
          this.value = this.value.substr(-1);
          this.className = "not_empty";
          qs("input.empty").focus();
        } else {
          this.className = "empty";
        }
      }
    });
}

function gameMedium() {alert(3)}

function gameHard() {
  qs("#txt_val_nam").value = "";
}

function gameVeryHard() {alert(5)}

function levelGen() {
  getPoke();

  if (user.level == 1) {
    gameVeryEasy();
  } else if (user.level == 2) {
    gameEasy();
  } else if (user.level == 3) {
    gameMedium();
  } else if (user.level == 4) {
    gameHard();
  } else if (user.level == 5) {
    gameVeryHard();
  }
  
  qs("#btn_val_nam").onclick = valName;
}

function valName() {
  clearInterval(timer);
  let msg; let typ;
  let g = user.games.pop();
  
  if (user.level == 1) {
    let e = qs(".form-check-input:checked");
    if (e) g.answer = e.value;
  } else if (user.level == 2) {
    let v = "";
    qsa("[name=txt_val_nam]").forEach(function(e) {
      if (e.value) v += e.value;
      if (e.innerText) v += e.innerText;
    });
    g.answer = v;
  } else if (user.level == 3) {
    //
  } else if (user.level == 4) {
    g.answer = qs("#txt_val_nam").value;
  } else if (user.level == 5) {
    //
  }
  
  if ((new Date()).getTime() - g.create_at > getLevel().tim * 1000) {
    typ = "secondary";
    msg = "Você foi mais rápido que uma lesma... Mas acho que não foi a tempo";
    g.answer = "";
  } else if (!g.answer) {
    msg = "Mas nem respondeu o nome ainda?";
    typ = "warning";
  } else if (g.answer.trim().toLowerCase() == pokes[pok_id]) {
    typ = "success";
    msg = "Você acertou, parabéns!";
    g.score = getLevel().sco;
  } else {
    typ = "danger";
    msg = "Acho que você errrrooooooooooooou!!! O nome do personagem era \"";
    msg += pokes[pok_id][0].toUpperCase() + pokes[pok_id].substring(1) + "\"";
  }
  updateUser(user.games.push(g));
  userCard();

  render(qs("#div_comp_game"), "/comp/game_result.html", function() {
    qs("#div_alert").className += ` alert-${typ}`;
    qs("#div_alert").innerText = msg;
    qs("#p_fw_lighter").innerText = "Vamos jogar novamente?";
    qs("#btn_end_game").onclick = endGame;
    qs("#btn_start_game").onclick = startGame;
  });
}

function startGame() {
  render(qs("#div_comp_game"), getLevel().url, levelGen);
}

function endGame() {
  render(qs("#div_comp_game"), "/comp/game_ready.html", function() {
    qs("h5.text-muted").innerText = getLevel().til;
    qs("p.fw-lighter").innerText = getLevel().dsc;
    qs("#btn_start_game").onclick = startGame;
  });
}

afterLoad(function() {
  // botões level
  qsa("#div_btn_level button").forEach(function(e) {
    e.onclick = levelChange;
    e.innerText = getLevel(e.value).til;
  });
  qs(`[name=button_level_${user.level}]`).className = "btn btn-primary";

  userCard();
  endGame();
  
  qs("nav a.link-login").innerText = "Sair";
  qs("span.version").innerText = "version: 0.2.2";
});
