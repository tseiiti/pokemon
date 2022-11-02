// import {qs, afterLoad, getSession, bsAlert, getTime, randomBetween} from "./utils.js";
// import {decodeUser, updateUser} from "./game.js";

var user = null;
var pok_id = null;
userSession();

function userSession() {
  user = getSession("user");
  if (!user) {
    history.pushState(null, document.title, location.href);
    location.replace("login.html");
  }
  user = decodeUser(user);
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
    html += `<td>${g.level == 4 ? 'difícil' : ''}</td>`
    html += `<td>${g.answer.substring(0, 10)}${g.answer.length > 10 ? "..." : ""}</td>`
    html += `<td>${g.score == 0 ? "errou" : g.score}</td>`
    html += '</tr>'
  });
  qs("div.card-body table tbody").innerHTML = html;
}

function getPoke() {
  pok_id = randomBetween(1, 905);
  let img = qs("#poke_image");
  // img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pok_id.toString().padStart(3, "0")}.png`;
  img.src = `/img/${pok_id.toString().padStart(3, "0")}.png`;
  img.alt = "créditos da imagem a pokemon.com";
}

function validateName(e) {
  userSession();
  let score = 0;
  if (!e.value) {
    bsAlert("Mas nem respondeu o nome ainda?", "warning", e.parentElement);
  } else if (e.value == pokes[pok_id]) {
    bsAlert("Você acertou, parabéns!", "success", e.parentElement);
    score = 5;
  } else {
    bsAlert("Acho que você errrrooooooooooooou!!!", "danger", e.parentElement);
  }
  
  updateUser(user.addGame(4, pok_id, e.value, score));
  
  if (e.value) {
    getPoke();
  }
  userCard();
  e.value = "";
}

function buttonValidateName() {
  if (user.level == 1) {
    validateName(qs('input:checked'));
  } else if (user.level == 4) {
    validateName(qs("#text_validate_name"));
  }
}


// 1 muito fácil 5 opções
// 2 fácil com inicio e fim
// 3 médio forca
// 4 difícil digitar
// 5 muito difícil imagem cortada

if (user.level == 1) {
  loadComponent(qs("div.component"), "very_easy.html");
} else if (user.level == 4) {
  loadComponent(qs("div.level"), "hard.html");
}

afterLoad(function() {
  userSession();
  userCard();
  getPoke();

  if (user.level == 1) {
    // loadComponent(qs("div.component"), "very_easy.html");
    let ids = [];
    while(ids.length < 4) {
      let id = randomBetween(1, 905);
      if (id == pok_id || ids.includes(id)) continue;
      ids.push(id);
    }
    ids.splice(random(4), 0, pok_id);
    let html = "";
    ids.forEach(function(id) {
      html += '<div class="form-check">';
      html += `<input class="form-check-input" id="radio-${id}" type="radio" value="${pokes[id]}">`;
      html += `<label class="form-check-label" for="radio-${id}">${pokes[id]}</label>`;
      html += '</div>';
    });

    qs("div.div_validate_name").innerHTML = html;
  } else if (user.level == 4) {
    // loadComponent(qs("div.component"), "hard.html");
  }

  qs("#button_validate_name").addEventListener("click", buttonValidateName);
  qsa("button.btn.btn-outline-primary").forEach(function(e) {
    e.addEventListener("click", function() {
      alert(e.value);
    });
  });
});