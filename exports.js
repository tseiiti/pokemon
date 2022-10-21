function querySelectorAll(arg) {
  return document.querySelectorAll(arg);
}

function loadComponent() {
  querySelectorAll(".component").forEach(function(e) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.status == 200) {
        e.parentElement.innerHTML = xhr.responseText;
      }
    }
    xhr.open("GET", e.getAttribute("data-component"), true);
    xhr.send();
  });
}

function random(vlr) {
  return Math.floor(Math.random() * (vlr + 1))
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export { querySelectorAll, loadComponent, random, randomBetween, setCookie, getCookie }