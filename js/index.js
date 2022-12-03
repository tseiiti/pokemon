// import {*} as u from "/js/utils.js";
// import {*} as g from "/js/game.js";

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
        <td>${getLevel(g.level).dsc.toLowerCase()}</td>
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
  // img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pok_id.toString().padStart(3, "0")}.png`;
  img.src = `/img/pokes/${pok_id.toString().padStart(3, "0")}.png`;
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
    let html = `<label name="txt_val_nam" for="txt_val_nam" value="${str[0]}">${str[0]}</label>`;
    for (let i = 1; i < str.length - 1; i++) {
      html += `<input name="txt_val_nam" type="text" minlength="1" maxlength="1" size="1" pattern="{1}" style="width: 20px; text-align:center;">`;
    }
    html += `<label name="txt_val_nam" for="txt_val_nam" value="${str.substr(-1)}">${str.substr(-1)}</label>`;
    qs("#div_val_nam").innerHTML = html;
    c(str)
    //qsa("[name=txt_val_nam]").forEach(function(e) {c(e.value);});
}

function levelGen() {
  getPoke();

  if (user.level == 1) {
    gameVeryEasy();
  } else if (user.level == 2) {
    gameEasy();
  } else if (user.level == 3) {
    //
  } else if (user.level == 4) {
    qs(getLevel().elm[1]).value = "";
  } else if (user.level == 5) {
    //
  }
  
  qs("#btn_val_nam").addEventListener("click", valName);
}

function valName() {
  clearInterval(timer);
  let ans_elm = qs(getLevel().elm[1]);
  let g = user.games.pop();
  let msg; let typ;
  
  if ((new Date()).getTime() - g.create_at > getLevel().tim * 1000) {
    typ = "secondary";
    msg = "Você foi mais rápido que uma lesma... Acho que não foi a tempo";
  } else if (!ans_elm || !ans_elm.value) {
    msg = "Mas nem respondeu o nome ainda?";
    typ = "warning";
  } else if (ans_elm.value.trim().toLowerCase() == pokes[pok_id]) {
    typ = "success";
    msg = "Você acertou, parabéns!";
    
    g.answer = ans_elm.value;
    g.score = getLevel().sco;
  } else {
    typ = "danger";
    msg = "Acho que você errrrooooooooooooou!!! O nome do personagem era \"";
    msg += pokes[pok_id][0].toUpperCase() + pokes[pok_id].substring(1) + "\"";
    
    g.answer = ans_elm.value;
  }
  updateUser(user.games.push(g));
  userCard();

  render(qs("#div_comp_game"), "/comp/game_result.html", function() {
    qs("#div_alert").className += ` alert-${typ}`;
    qs("#div_alert").innerText = msg;
    qs("#p_fw_lighter").innerText = "Vamos jogar novamente?";
    qs("#btn_end_game").addEventListener("click", endGame);
    qs("#btn_start_game").addEventListener("click", startGame);
  });
}

function startGame() {
  render(qs("#div_comp_game"), getLevel().url, levelGen);
}

function endGame() {
  render(qs("#div_comp_game"), "/comp/game_ready.html", function() {
    qs("#btn_start_game").addEventListener("click", startGame);
  });
}

afterLoad(function() {
  // botoes level
  qsa("#div_btn_level button").forEach(function(e) {
    e.addEventListener("click", levelChange);
    e.innerText = getLevel(e.value).dsc;
  });
  qs(`[name=button_level_${user.level}]`).className = "btn btn-primary";

  userCard();
  endGame();
  
  // botoes de navegacao
  qs("nav a.link-sair").addEventListener("click", function() {
    delSession("user");
    location.replace("login.html");
  });
});
