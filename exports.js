// querySelectorAll
function qsa(arg) {
  return document.querySelectorAll(arg);
}

// Load Component
function loacom() {
  qsa(".component").forEach(function(e) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.status == 200) {
        e.innerHTML = xhr.responseText;
      }
    }
    xhr.open("GET", e.getAttribute("data-component"), true);
    xhr.send();
  });
}

export { qsa, loacom }