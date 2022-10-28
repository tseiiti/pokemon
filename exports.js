function querySelector(arg) {
  return document.querySelector(arg);
}

function querySelectorAll(arg) {
  return document.querySelectorAll(arg);
}

const event = new Event("onLoadComponent");
var compLen = 0;
function loadComponent(elm, url) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      elm.innerHTML = xhr.responseText;
      compLen++;
      if (compLen === querySelectorAll("[data-component]").length) {
        compLen = 0;
        document.body.dispatchEvent(event);
      }
    }
  }
  xhr.open("GET", url, true);
  xhr.send();
}

function loadComponentAll() {
  querySelectorAll("[data-component]").forEach(function(e) {
    loadComponent(e, e.getAttribute("data-component"));
  });
}

function setCookie(cname, cvalue) {
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let dcookie = decodeURIComponent(document.cookie);
  let ca = dcookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function encode(object) {
  return JSON.stringify(Object.entries(object));
}

function decode(string, T) {
  const object = new T();
  JSON.parse(string).map(([key, value]) => (object[key] = value));
  return object;
}

// class Serializer{
//   constructor(types) {
//     this.types = types;
//   }

//   serialize(obj) {
//     let idx = this.types.findIndex((e) => {
//       return e.name == obj.constructor.name
//     });
//     if (idx == -1)
//       throw "type  '" + obj.constructor.name + "' not initialized";
//     return JSON.stringify([idx, Object.entries(obj)]);
//   }

//   deserialize(json) {
//     let arr = JSON.parse(json);
//     let obj = new this.types[arr[0]]();
//     arr[1].map(e => { obj[e[0]] = e[1]; });
//     return obj;
//   }
// }

function bsAlert(message, type, ele) {
  let html = `<div class="alert alert-${ type } alert-dismissible" role="alert"><div>${ message }</div><button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
  let div = document.createElement("div");
  div.innerHTML = html;
  ele.before(div);
  setTimeout(function() { div.remove(); }, 5000);
}

function random(vlr) {
  return Math.floor(Math.random() * (vlr + 1));
}

function randomBetween(min, max) {
  return random(max - min) + min;
}

// export { 
//   querySelector, 
//   querySelectorAll, 
//   loadComponent, 
//   loadComponentAll, 
//   setCookie, 
//   getCookie, 
//   encode, 
//   decode, 
//   bsAlert, 
//   random, 
//   randomBetween
// };



// user = new User("teste")
// user.addGame(1, 1, "teste", 0)
// user.addGame(1, 1, "teste1", 1)
// // e = encode(user)
// // // '[["name","teste"],["games",[{"level":1,"pok_id":1,"answer":"teste","score":0},{"level":1,"pok_id":1,"answer":"teste1","score":1}]]]'
// // d = decode(e, User)
// // d.games[1]
// // user.games[1]

// ser = new Serializer([User])
// e = ser.serialize(user)
// d = ser.deserialize(e)


// var active = element.querySelector('.active');
// var prev = active.previousElementSibling;
// var next = active.nextElementSibling;