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

  render(qs("#div_comp_game"), "/comp/game_ready.html", function() {
    qs("#btn_start_game").addEventListener("click", startGame);
  });

  qs("#div_btn_level button.btn-primary").className = "btn btn-outline-primary"
  qs(`[name=button_level_${user.level}]`).className = "btn btn-primary";
  
  userCard();
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

function levelGen() {
  getPoke();

  if (user.level == 1) {
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
  } else if (user.level == 2) {
    //
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
  
  let ale_elm = qs(getLevel().elm[0]);
  let ans_elm = qs(getLevel().elm[1]);
  
  let i = user.games.length - 1;
  let g = user.games[i];
  
  let res; let msg; let tip;
  if ((new Date()).getTime() - g.create_at > getLevel().tim * 1000) {
    res = "t";
    msg = "Você foi mais rápido que uma lesma...";
    tip = "danger";
  } else if (!ans_elm || !ans_elm.value) {
    res = "b";
    msg = "Mas nem respondeu o nome ainda?";
    tip = "warning";
  } else if (ans_elm.value.trim().toLowerCase() == pokes[pok_id]) {
    res = "c";
    msg = "Você acertou, parabéns!";
    tip = "success";
    
    g.answer = ans_elm.value;
    g.score = getLevel().sco;
    user.games[i] = g;
    updateUser(user);
  } else {
    res = "e";
    msg = "Acho que você errrrooooooooooooou!!! O nome do personagem era \"";
    msg += pokes[pok_id][0].toUpperCase() + pokes[pok_id].substring(1) + "\"";
    tip = "danger";
    
    g.answer = ans_elm.value;
    user.games[i] = g;
    updateUser(user);
  }
  
  userCard();
  // setTimeout(function() {
  //   levelGen();
  // }, 3000);
  
  render(qs("#div_comp_game"), "/comp/game_result.html", function() {
    alert(tip);
    qs("#btn_start_game").addEventListener("click", startGame);
  });
}

function startGame() {
  render(qs("#div_comp_game"), getLevel().url, levelGen);
}

afterLoad(function() {
  // botoes level
  qsa("#div_btn_level button").forEach(function(e) {
    e.addEventListener("click", levelChange);
    e.innerText = getLevel(e.value).dsc;
  });
  qs(`[name=button_level_${user.level}]`).className = "btn btn-primary";

  userCard();
  qs("#btn_start_game").addEventListener("click", startGame);

  // botoes de navegacao
  qs("nav a.link-sair").addEventListener("click", function() {
    delSession("user");
    location.replace("login.html");
  });
});
