import { getCookie, setCookie, getSession, setSession, encode, decode } from "./utils.js";

class Game {
  constructor(level, pok_id, answer, score) {
    this.level = level;
    this.pok_id = pok_id;
    this.answer = answer;
    this.score = score;
    this.create_at = (new Date()).getTime();
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.games = [];
    this.score = 0;
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

function decodeUser(encoded) {
  let user = decode(encoded, User);
  user.games = user.games.map((game) => decode(encode(game), Game));

  // for (let i = 0; i < user.games.length; i++) {
  //   user.games[i] = decode(encode(user.games[i]), Game);
  // }
  return user;
}

function setUser(name) {
  let users = getCookie("users");
  if (!users) users = "[]";
  users = decode(users, Array);

  users.forEach(function(e) {
    let user = decodeUser(e);
    if (user.name == name) {
      setSession("user", e);
      return user;
    }
  });
  
  setSession("user", encode(new User(name)));
  users.push(getSession("user"));
  setCookie("users", encode(users));
}

function updateUser(user) {
  let users = decode(getCookie("users"), Array);

  for (let i = 0; i < users.length; i++) {
    if (decodeUser(users[i]).name == user.name) {
      let encoded = encode(user);
      setSession("user", encoded);
      users[i] = encoded;
      break;
    }
  }
  
  setCookie("users", encode(users));
}



export {
  Game, 
  User, 
  decodeUser, 
  setUser, 
  updateUser
}