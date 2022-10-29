// import { qs, loadComponentAll, setCookie, getCookie, encode, decode, bsAlert, randomBetween } from "./exports.js";

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

function addUser(encoded) {
  let users = getCookie("users");
  if (!users) users = "[]";
  users = decode(users, Array);
  users.push(encoded);
  setCookie("users", encode(users));
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

document.body.addEventListener("onLoadComponent", function(event) {
  let users = getCookie("users");
  if (users == "") {   
    qs("#button_set_usr").addEventListener("click", function() {
      let name = qs("#usr_name");
      if (name.value) {
        let user = encode(new User(name.value));
        setSession("user", user);
        addUser(user);
        window.location.replace("index.html");
      } else {
        bsAlert("Acho que faltou alguma coisa... seu nome, hahaha", "danger", name);
      }
    });
  } else {
    users = decode(users, User);
    qs("#modal_body select").innerHTML += '<option value="4">Four</option>';
  }

});

loadComponentAll();
