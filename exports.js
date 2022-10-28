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

function random(vlr) {
  return Math.floor(Math.random() * (vlr + 1));
}

function randomBetween(min, max) {
  return random(max - min) + min;
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
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
