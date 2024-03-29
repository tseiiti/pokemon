// import {*} as u from "/js/utils.js";
// import {*} as g from "/js/game.js"

// delSession("user");

function buttonSetUser() {
  let name = qs("#usr_name");
  if (name.value) {
    setUser(name.value);
    location.replace("/poke.html");
  } else {
    bsAlert("Acho que faltou alguma coisa... seu nome, hahaha", "danger", name);
  }
}

afterLoad(function() {
  // lista de usuarios
  let users = getUsers();
  let html = "";
  users.map(user => {
    html += `<option value="${user.name}">${user.name} (${getTime(user.update_at)})</option>`;
  });
  qs("#usr_name_list").innerHTML += html;

  qs("#button_set_usr").addEventListener("click", buttonSetUser);

  // // botoes de navegacao
  // qs("nav a.link-login").addEventListener("click", function() {
  //   clearCookies();
  //   location.reload();
  // });
});