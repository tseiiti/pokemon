// import {*} as u from "/js/utils.js";
// import {*} as g from "/js/game.js";

var user, pok_id, elm_fnd, levels = [""];
userSession();

function userSession() {
  user = getUser();
  if (!user) {
    history.pushState(null, document.title, location.href);
    location.replace("/login.html");
  }
  
  if (user.level == 1) {
    elm_fnd = ["/comp/game_very_easy.html", "#div_val_nam", ".form-check-input:checked"];
  } else if (user.level == 4) {
    elm_fnd = ["/comp/game_hard.html", "#div_val_nam", "#txt_val_nam"];
  }
}

function userCard() {
  qs("h4.card-header").innerText = user.name;
  qs("h5.card-title").innerText = "Total de " + user.score + " pontos";
  qs("h6.card-subtitle.mb-2.text-muted").innerText = "último acesso: " + getTime(user.update_at, "long");
  let games = user.games.sort((a, b) => b.create_at - a.create_at).slice(0, 30);
  let html = "";

  games.forEach(function(g) {
    html += '<tr>'
    html += `<td>${getTime(g.update_at)}</td>`
    html += `<td>${levels[g.level].toLowerCase()}</td>`
    html += `<td${g.answer.length > 10 ? ' title="' + g.answer + '"' : ""}>${g.answer.substring(0, 10)}${g.answer.length > 10 ? "..." : ""}</td>`
    html += `<td>${g.score == 0 ? "errou" : g.score}</td>`
    html += '</tr>'
  });
  qs("#history_tbody").innerHTML = html;
}

function getPoke() {
  pok_id = randomBetween(1, 905);
  let img = qs("#poke_image");
  // img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pok_id.toString().padStart(3, "0")}.png`;
  img.src = `/img/pokes/${pok_id.toString().padStart(3, "0")}.png`;
  img.alt = "créditos da imagem a pokemon.com";
}

function levelGen() {
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

    qs(elm_fnd[1]).innerHTML = html;
  } else if (user.level == 4) {
    //
  }
}

function valName() {
  let ale_elm = qs(elm_fnd[1]);
  let ans_elm = qs(elm_fnd[2]);
  
  userSession();
  let score = 0;
  if (!ans_elm.value) {
    bsAlert("Mas nem respondeu o nome ainda?", "warning", ale_elm);
  } else if (ans_elm.value.trim().toLowerCase() == pokes[pok_id]) {
    bsAlert("Você acertou, parabéns!", "success", ale_elm);
    score = 5;
  } else {
    bsAlert("Acho que você errrrooooooooooooou!!! O nome do personagem era \"" + pokes[pok_id][0].toUpperCase() + pokes[pok_id].substring(1) + "\"", "danger", ale_elm);
  }
  
  updateUser(user.addGame(user.level, pok_id, ans_elm.value, score));
  
  setTimeout(function() {
    userCard();
    if (ans_elm.value) {
      getPoke();
      ans_elm.value = "";
    }
    levelGen();
  }, 3000);
}

// 1 muito fácil 5 opções
// 2 fácil com inicio e fim
// 3 médio forca
// 4 difícil digitar
// 5 muito difícil imagem cortada

loadComponent(qs("#level_inputs"), elm_fnd[0]);

afterLoad(function() {
  qs("#btn_val_nam").addEventListener("click", valName);
  qsa("button.btn-outline-primary").forEach(function(e) {
    e.addEventListener("click", function() {
      user.level = e.value;
      updateUser(user);
      location.reload();
    });
    if (e.value == user.level) e.className = "btn btn-primary";
    levels.push(e.innerText);
  });

  userCard();
  // getPoke();
  // levelGen();
});