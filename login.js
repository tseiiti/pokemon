// import { querySelector, loadComponentAll, setCookie, getCookie, encode, decode, bsAlert, randomBetween } from "./exports.js";

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

function buttonLoginEnter() {
  let name = querySelector("#usr_name");
  if (name.value) {
    user = new User(name.value);

    setCookie("users", encode(user));

    let e = querySelector("#modal_static button");
    e.setAttribute("data-bs-dismiss", "modal");
    e.click();
  } else {
    bsAlert("Acho que faltou alguma coisa... seu nome, hahaha", "danger", name);
  }
}

document.body.addEventListener("onLoadComponent", function(event) {
  
  const modal = new bootstrap.Modal('#modal_static');
  modal.show();
  
  let users = getCookie("users");
  if (users == "") {
    setCookie("users", "[]");
    querySelector("#modal_body").innerHTML = '<input class="form-control" id="usr_name" type="text" placeholder="Escreva seu nome">';
  } else {
    users = decode(users, User);
    querySelector("#modal_body select").innerHTML += '<option value="4">Four</option>';
  }
  querySelector("#button_modal_enter").addEventListener("click", buttonLoginEnter);

  let img = querySelector("#poke_image");
  img.src = getImageUrlByName(pok_id);
  img.alt = "Imagem selecionada";
});

loadComponentAll();
