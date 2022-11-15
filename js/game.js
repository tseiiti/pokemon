// import {*} as u from "/js/utils.js";

class Game {
  constructor(level, pok_id, answer, score) {
    this.level = level;
    this.pok_id = pok_id;
    this.answer = answer;
    this.score = score;
    this.create_at = (new Date()).getTime();
    this.update_at = (new Date()).getTime();
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.games = [];
    this.level = 4;
    this.create_at = (new Date()).getTime();
    this.update_at = (new Date()).getTime();
  }

  addGame(level, pok_id, answer, score) {
    this.games.push(new Game(level, pok_id, answer, score));
    this.update_at = (new Date()).getTime();
    return this;
  }

  score() {
    let s = 0;
    s = this.games.reduce((a, b) => {return a + b.score}, s);
    return s;
  }
}

// texto em User
function decodeUser(encoded) {
  let user = decode(encoded, User);
  user.games = user.games.map(game => decode(encode(game), Game));
  return user;
}

// array de textos de usuários
function getUserArray() {
  let users = getCookie("users");
  if (!users) users = "[]";
  return decode(users, Array);
}

// usuários do cookie
function getUsers() {
  let users = getUserArray()
  users = users.map(user => decodeUser(user));
  return users.sort((a, b) => b.update_at - a.update_at);
}

// cria ou procura usuário no cookie
function setUser(name) {
  let users = getUserArray();

  delSession("user");
  users.forEach(function(e) {
    let user = decodeUser(e);
    if (user.name == name) {
      setSession("user", e);
      return false;
    }
  });
  
  if (!getSession("user")) {
    setSession("user", encode(new User(name)));
    users.push(getSession("user"));
    setCookieY("users", encode(users));
  }
}

// usuário da sessão
function getUser() {
  let user = getSession("user");
  if (user) return decodeUser(user);
}

// atualiza usuário no cookie
function updateUser(user) {
  let users = getUserArray();

  for (let i = 0; i < users.length; i++) {
    if (decodeUser(users[i]).name == user.name) {
      user.update_at = (new Date()).getTime();
      let encoded = encode(user);
      setSession("user", encoded);
      users[i] = encoded;
      break;
    }
  }
  
  setCookieY("users", encode(users));
}

// function updateGame(user, game) {
//   user.games.findLast() = game;
// }

function getLevel(id = user.level) {
  return levels.find(function(e) {return e.id == id});
}

const levels = [
  {
    id: 1, 
    dsc: "Muito Fácil", 
    url: "/comp/game_very_easy.html", 
    sco: 1, 
    tim: 60, 
    elm: ["#div_val_nam", ".form-check-input:checked"]
  }, {
    id: 2, 
    dsc: "Fácil", 
    url: "/comp/game_easy.html", 
    sco: 2, 
    tim: 40, 
    elm: ["#div_val_nam", ""]
  }, {
    id: 3, 
    dsc: "Médio", 
    url: "/comp/game_medium.html", 
    sco: 3, 
    tim: 20, 
    elm: ["#div_val_nam", ""]
  }, {
    id: 4, 
    dsc: "Difícil", 
    url: "/comp/game_hard.html", 
    sco: 5, 
    tim: 15, 
    elm: ["#div_val_nam", "#txt_val_nam"]
  }, {
    id: 5, 
    dsc: "Muito Difícil", 
    url: "/comp/game_very_hard.html", 
    sco: 8, 
    tim: 10, 
    elm: ["#div_val_nam", ""]
  }
];

// 1 muito fácil 5 opções
// 2 fácil com inicio e fim
// 3 médio forca
// 4 difícil digitar
// 5 muito difícil imagem cortada

// export {
//   Game, 
//   User, 
//   decodeUser, 
//   setUser, 
//   updateUser
// }
