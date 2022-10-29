// import { qs, loadComponentAll, setCookie, getCookie, encode, decode, bsAlert, randomBetween } from "./utils.js";
function buttonSetUser() {
  let name = qs("#usr_name");
  if (name.value) {
    setUser(name.value);
    window.location.replace("index.html");
  } else {
    bsAlert("Acho que faltou alguma coisa... seu nome, hahaha", "danger", name);
  }
}

document.body.addEventListener("onLoadComponent", function(event) {
  let users = getCookie("users");
  if (!users) users = "[]";
  users = decode(users, Array);

  let html = "";
  users.forEach(function(e) {
    let user = decodeUser(e);
    html += `<option value="${ user.name }">${ user.name } (${ getTime(user.update_at) })</option>`;
  });
  qs("#usr_name_list").innerHTML += html;

  qs("#button_set_usr").addEventListener("click", buttonSetUser);
});

loadComponentAll();
