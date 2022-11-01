// import { qs, loadComponentAll, setCookie, getSession, clearSession, bsAlert, getTime, enterPress, randomBetween } from "./utils.js";
// import { decodeUser, updateUser } from "./game.js";

var pok_id = null;
var user = null;

function userCard() {
  user = getSession("user");
  if (!user) {
    history.pushState(null, document.title, location.href);
    location.replace("login.html");
  }
  user = decodeUser(user);

  qs("h4.card-header").innerText = user.name;
  qs("h5.card-title").innerText = "Total de " + user.score + " pontos";
  qs("h6.card-subtitle.mb-2.text-muted").innerText = "último acesso: " + getTime(user.update_at, "long");
  let games = user.games.sort((a, b) => b.create_at - a.create_at).slice(0, 30);
  let html = "";
  // games.forEach(function(g) {
  //   html += "level: difícil; resposta: \"" + g.answer + "\"; horário: " + getTime(g.create_at) + "<br />";
  // });
  // qs("p.card-text").innerHTML = html;
  games.forEach(function(g) {
    html += '<tr>'
    html += `<td>${ getTime(g.update_at) }</td>`
    html += `<td>${ g.level == 4 ? 'difícil' : '' }</td>`
    html += `<td>${ g.answer.substring(0, 12) }${ g.answer.length > 12 ? "..." : "" }</td>`
    html += `<td>${ g.score == 0 ? "errou" : g.score }</td>`
    html += '</tr>'
  });
  qs("div.card-body table tbody").innerHTML = html;
}

function buttonValidateName() {
  let txt = qs("#text_validate_name");
  let score = 0;
  if (!txt.value) {
    bsAlert("Mas ainda nem preencheu o nome?", "warning", txt.parentElement);
  } else if (txt.value == pokes[pok_id]) {
    bsAlert("Você acertou, parabéns!", "success", txt.parentElement);
    score = 5;
  } else {
    bsAlert("Acho que você errrrooooooooooooou!!!", "danger", txt.parentElement);
  }
  
  updateUser(user.addGame(4, pok_id, txt.value, score));
  
  if (txt.value) {
    userCard();
    getPoke();
    txt.value = "";
  }
}

function getPoke() {
  pok_id = randomBetween(1, 905);
  let img = qs("#poke_image");
  img.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ pok_id.toString().padStart(3, "0") }.png`;
  img.alt = "créditos da imagem a pokemon.com";
}



afterLoad(function() {
  userCard();
  getPoke();

  qs("#button_validate_name").addEventListener("click", buttonValidateName);

  qs("a.nav-link.link-teste").addEventListener("click", function() {
    setCookie("users", "");
    clearSession();
    location.replace("login.html");
  });

  qs("a.nav-link.link-sair").addEventListener("click", function() {
    clearSession();
    location.replace("login.html");
  });
});