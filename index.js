// import { qs, loadComponentAll, setCookie, getCookie, encode, decode, bsAlert, randomBetween } from "./utils.js";

function getImageUrlByName(pok_id) {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ pok_id.toString().padStart(3, "0") }.png`;
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
}

var user = getSession("user");
if (!user) window.location.replace("login.html");
user = decodeUser(user);

var pok_id = randomBetween(1, 905);

document.body.addEventListener("onLoadComponent", function(event) {
  qs("h4.card-header").innerText = user.name;
  qs("h5.card-title").innerText = "Total de " + user.score + " pontos";
  qs("h6.card-subtitle.mb-2.text-muted").innerText = "último acesso: " + getTime(user.update_at, "long");
  let html = "";
  let games = user.games.sort((a, b) => b.create_at - a.create_at).slice(0, 3);
  games.forEach(function(g) {
    html += "level: difícil; resposta: \"" + g.answer + "\"; horário: " + getTime(g.create_at) + "<br />";
  });
  qs("p.card-text").innerHTML = html;

  let img = qs("#poke_image");
  img.src = getImageUrlByName(pok_id);
  img.alt = "Imagem selecionada";

  qs("#button_validate_name").addEventListener("click", buttonValidateName);
  enterPress("#button_validate_name");
});

loadComponentAll();
