// import {*} as u from "/js/utils.js";
// import {*} as g from "/js/game.js";

var user, pok_id = 0, elm_fnd = [];
userSession();

// 1 muito fácil 5 opções
// 2 fácil com inicio e fim
// 3 médio forca
// 4 difícil digitar
// 5 muito difícil imagem cortada

elm_fnd[1] = ["Muito Fácil", "/comp/game_very_easy.html", "#div_val_nam", ".form-check-input:checked", 1];
elm_fnd[2] = ["Fácil", "/comp/game_easy.html", "#div_val_nam", ".form-check-input:checked", 2];
elm_fnd[3] = ["Médio", "/comp/game_medium.html", "#div_val_nam", ".form-check-input:checked", 3];
elm_fnd[4] = ["Difícil", "/comp/game_hard.html", "#div_val_nam", "#txt_val_nam", 5];
elm_fnd[5] = ["Muito Difícil", "/comp/game_very_hard.html", "#div_val_nam", ".form-check-input:checked", 8];

function userSession() {
  user = getUser();
  if (!user) {
    if (!pok_id) alert("Quem é você? Demorou tanto que o sistema te esqueceu...");
    history.pushState(null, document.title, location.href);
    location.replace("/login.html");
  }
}

function userCard() {
  qs("h4.card-header").innerText = user.name;
  qs("h5.card-title").innerText = "Total de " + user.score + " pontos";
  qs("h6.card-subtitle.mb-2.text-muted").innerText = "último acesso: " + getTime(user.update_at, "long");
  let games = user.games.sort((a, b) => b.create_at - a.create_at).slice(0, 30);
  let html = "";

  games.forEach(function(g) {
    html += `
      <tr>
        <td>${getTime(g.update_at)}</td>
        <td>${elm_fnd[g.level][0].toLowerCase()}</td>
        <td${g.answer.length > 10 ? ' title="' + g.answer + '"' : ""}>
          ${g.answer.substring(0, 10)}${g.answer.length > 10 ? "..." : ""}
        </td>
        <td>${g.score == 0 ? "errou" : g.score}</td>
      </tr>`
  });
  qs("#history_tbody").innerHTML = html;
}

function levelChange() {
  user.level = this.value;
  updateUser(user);
  render(qs("#level_inputs"), "game_ready.html");
  qs("#button_levels button.btn-primary").className = "btn btn-outline-primary";
  this.className = "btn btn-primary";
}

function getPoke() {
  pok_id = randomBetween(1, 905);
  let img = qs("#poke_image");
  // img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pok_id.toString().padStart(3, "0")}.png`;
  img.src = `/img/pokes/${pok_id.toString().padStart(3, "0")}.png`;
  img.alt = "créditos da imagem a pokemon.com";
  updateUser(user.addGame(user.level, pok_id, "", 0));
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
    qs(elm_fnd[user.level][3]).value = "";
  } else if (user.level == 5) {
    //
  }
  
  qs("#btn_val_nam").addEventListener("click", valName);
}

function valName() {
  let ale_elm = qs(elm_fnd[user.level][2]);
  let ans_elm = qs(elm_fnd[user.level][3]);
  
  let i = user.games.length - 1;
  let g = user.games[i];
  
  if ((new Date()).getTime() - g.create_at < 30000) {
    g.answer = ans_elm.value;
    g.score = score;
    user.games[i] = g;
    updateUser(user);
  }
  
  userSession();
  let score = 0;
  if (!ans_elm.value) {
    bsAlert("Mas nem respondeu o nome ainda?", "warning", ale_elm);
  } else if (ans_elm.value.trim().toLowerCase() == pokes[pok_id]) {
    bsAlert("Você acertou, parabéns!", "success", ale_elm);
    score = elm_fnd[user.level][3];
  } else {
    let msg = "Acho que você errrrooooooooooooou!!! O nome do personagem era \""
    msg += pokes[pok_id][0].toUpperCase() + pokes[pok_id].substring(1) + "\"";
    bsAlert(msg, "danger", ale_elm);
  }
  
  userCard();
  setTimeout(function() {
    levelGen();
  }, 3000);
}

function startGame() {
  render(qs("#level_inputs"), elm_fnd[user.level][1], levelGen);
}

afterLoad(function() {
  qs("#btn_val_nam").addEventListener("click", startGame);

  qsa("#button_levels button").forEach(function(e) {
    e.addEventListener("click", levelChange);
    e.innerText = elm_fnd[e.value][0];
  });
  qs(`[name=button_level_${user.level}]`).className = "btn btn-primary";

  userCard();
});