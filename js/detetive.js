function xxx() {
  if (this.readOnly != true) {
    this.classList.replace("btn-outline-dark", "btn-outline-secondary");
    this.readOnly = true;
    this.style.backgroundColor = "#A9A9A9";
  } else {
    // this.classList.replace("btn-outline-secondary", "btn-outline-dark");
    this.readOnly = false;
    this.style.backgroundColor = this.dataset.mcolor;
  }
}

afterLoad(function() {
  let sus = [{
    des: "Sargento - Bigode",
    col: "#FFFF33"
  }, {
    des: "Florista - Dona Branca",
    col: "#FEFCFF"
  }, {
    des: "Chefe de Cozinha - Tony Gourmet",
    col: "#804A00"
  }, {
    des: "Mordomo - James",
    col: "#1589FF"
  }, {
    des: "Médica - Dona Violeta",
    col: "#F535AA"
  }, {
    des: "Dançarina - Srta. Rosa",
    col: "#FD1C03"
  }, {
    des: "Coveiro - Sérgio Soturno",
    col: "#52595D"
  }, {
    des: "Advogado - Sr. Marinho",
    col: "#16F529"
  }];
  
  let arm = [{
    des: "Espingarda",
    col: "#FFFF33"
  }, {
    des: "Pá",
    col: "#FEFCFF"
  }, {
    des: "Pé de Cabra",
    col: "#804A00"
  }, {
    des: "Tesoura",
    col: "#1589FF"
  }, {
    des: "Arma Química",
    col: "#F535AA"
  }, {
    des: "Veneno",
    col: "#FD1C03"
  }, {
    des: "Soco Inglês",
    col: "#52595D"
  }, {
    des: "Faca",
    col: "#16F529"
  }];
  
  let loc = [{
    des: "Prefeitura",
    col: "#FFFF33"
  }, {
    des: "Restaurante",
    col: "#FEFCFF"
  }, {
    des: "Floricultura",
    col: "#804A00"
  }, {
    des: "Boate",
    col: "#1589FF"
  }, {
    des: "Hospital",
    col: "#F535AA"
  }, {
    des: "Mansão",
    col: "#FD1C03"
  }, {
    des: "Cemitério",
    col: "#52595D"
  }, {
    des: "Praça",
    col: "#16F529"
  }, {
    des: "Hotel",
    col: "#FD1C03"
  }, {
    des: "Banco",
    col: "#52595D"
  }, {
    des: "Estação de Trem",
    col: "#16F529"
  }];
  
  let html = "";
  
  html += `<h1 class="">Suspeitos</h1><div class="row mx-3">`;
  for (let i = 0; i < sus.length; i++) {
    html += `<button class="btn btn-outline-dark my-1 col-12 col-md-4 detetive" data-mcolor="${sus[i].col}" style="background-color: ${sus[i].col};">${sus[i].des}</button>`;
  }
  html += `</div>`;
  
  html += `<h1 class="mt-5">Armas</h1><div class="row mx-3">`;
  for (let i = 0; i < arm.length; i++) {
    html += `<button class="btn btn-outline-dark my-1 col-12 col-md-4 detetive" data-mcolor="${arm[i].col}" style="background-color: ${arm[i].col};">${arm[i].des}</button>`;
  }
  html += `</div>`;
  
  html += `<h1 class="mt-5">Locais</h1><div class="row mx-3">`;
  for (let i = 0; i < loc.length; i++) {
    html += `<button class="btn btn-outline-dark my-1 col-12 col-md-4 detetive" data-mcolor="${loc[i].col}" style="background-color: ${loc[i].col};">${loc[i].des}</button>`;
  }
  html += `</div>`;
  
  qs("#div_sus").innerHTML = html;
  
  qsa("button.detetive").forEach(function(e) {
    e.onclick = xxx;
  });
});
