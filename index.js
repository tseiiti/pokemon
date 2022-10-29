// import { qs, loadComponentAll, setCookie, getCookie, encode, decode, bsAlert, randomBetween } from "./exports.js";

let user = sessionStorage.getItem("user");
if (!user) window.location.replace("login.html");

class Game {
  constructor(level, pok_id, answer, score) {
    this.level = level;
    this.pok_id = pok_id;
    this.answer = answer;
    this.score = score;
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.games = [];
  }

  addGame(level, pok_id, answer, score) {
    this.games.push(new Game(level, pok_id, answer, score));
  }
}

function addUser(user) {
  let users = getCookie("users");
  users = decode(users, Array);
  users.push(encode(user));
  c(encode(users));
}

function decodeUsers() {
  let users = decode(getCookie("users"), Array);
  for (let i = 0; i < users.length; i++) {
    users[i] = decode(users[i], User);
    for (let j = 0; j < users[i].games.length; j++) {
      users[i].games[j] = decode(encode(users[i].games[j]), Game);
    }
  }
  return users;
}

function getImageUrlByName(pok_id) {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ pok_id.toString().padStart(3, "0") }.png`;
}

function buttonValidateName() {
  let txt = qs("#text_validate_name").value;
  if (!txt) {
    bsAlert("Mas nem preencheu o nome???", "warning");
  } else if (txt === pokes[pok_id]) {
    bsAlert("Você acertou, parabéns!", "success");
  } else {
    bsAlert("Acho que você errrrooooooooooooou!!!", "danger");
  }
}

var pok_id = randomBetween(1, 905);

document.body.addEventListener("onLoadComponent", function(event) {
  
  // (new bootstrap.Modal('#modal_static')).show();
  
  // let users = getCookie("users");
  // if (users == "") {
  //   window.location.replace("http://www.w3schools.com");
  //   setCookie("users", "[]");
  //   qs("#modal_body").innerHTML = '<input class="form-control" id="usr_name" type="text" placeholder="Escreva seu nome">';
  // } else {
  //   users = decode(users, User);
  //   qs("#modal_body select").innerHTML += '<option value="4">Four</option>';
  // }
  // qs("#button_modal_enter").addEventListener("click", buttonLoginEnter);
  
  
  
  let img = qs("#poke_image");
  img.src = getImageUrlByName(pok_id);
  img.alt = "Imagem selecionada";
});

loadComponentAll();
