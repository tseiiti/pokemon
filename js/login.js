// import {qs, afterLoad, bsAlert, getTime} from "/js/utils.js";
// import {setUser, getUsers, decodeUser} from "/js/game.js";

function buttonSetUser() {
  let name = qs("#usr_name");
  if (name.value) {
    setUser(name.value);
    location.replace("/index.html");
  } else {
    bsAlert("Acho que faltou alguma coisa... seu nome, hahaha", "danger", name);
  }
}

afterLoad(function() {
  let users = getUsers();

  let html = "";
  users.map(user => {
    html += `<option value="${user.name}">${user.name} (${getTime(user.update_at)})</option>`;
  });
  qs("#usr_name_list").innerHTML += html;

  qs("#button_set_usr").addEventListener("click", buttonSetUser);
});