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
    this.score = 0;
    this.level = 4;
    this.create_at = (new Date()).getTime();
    this.update_at = (new Date()).getTime();
  }

  addGame(level, pok_id, answer, score) {
    this.games.push(new Game(level, pok_id, answer, score));
    this.score += score;
    this.update_at = (new Date()).getTime();
    return this;
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
      let encoded = encode(user);
      setSession("user", encoded);
      users[i] = encoded;
      break;
    }
  }
  
  setCookieY("users", encode(users));
}



// export {
//   Game, 
//   User, 
//   decodeUser, 
//   setUser, 
//   updateUser
// }
