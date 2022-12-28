const bts = [
  [
    {
      des: "Suspeitos"
    }, {
      des: "Sargento - Bigode",
      col: "#FFFF33"
    }, {
      des: "Florista - Dona Branca",
      col: "#FEFCFF"
    }, {
      des: "Chefe de Cozinha - Tony Gourmet",
      col: "#B87333"
    }, {
      des: "Mordomo - James",
      col: "#16E2F5"
    }, {
      des: "Médica - Dona Violeta",
      col: "#F535AA"
    }, {
      des: "Dançarina - Srta. Rosa",
      col: "#FF2400"
    }, {
      des: "Coveiro - Sérgio Soturno",
      col: "#52595D"
    }, {
      des: "Advogado - Sr. Marinho",
      col: "#16F529"
    }
  ], [
    {
      des: "Armas"
    }, {
      des: "Espingarda",
      col: "#FFFF33"
    }, {
      des: "Pá",
      col: "#FEFCFF"
    }, {
      des: "Pé de Cabra",
      col: "#B87333"
    }, {
      des: "Tesoura",
      col: "#16E2F5"
    }, {
      des: "Arma Química",
      col: "#F535AA"
    }, {
      des: "Veneno",
      col: "#FF2400"
    }, {
      des: "Soco Inglês",
      col: "#52595D"
    }, {
      des: "Faca",
      col: "#16F529"
    }
  ], [
    {
      des: "Locais"
    }, {
      des: "Prefeitura",
      col: "#FFFF33"
    }, {
      des: "Restaurante",
      col: "#FEFCFF"
    }, {
      des: "Floricultura",
      col: "#B87333"
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
      col: "#FFA500"
    }, {
      des: "Banco",
      col: "#FAAFBA"
    }, {
      des: "Estação de Trem",
      col: "#B041FF"
    }
  ]
];
  
function togBtn() {
  if (this.readOnly != true) {
    this.classList.replace("btn-outline-dark", "btn-outline-secondary");
    this.readOnly = true;
    this.style.backgroundColor = "#A9A9A9";
  } else {
    this.readOnly = false;
    this.style.backgroundColor = this.dataset.mcolor;
  }
}

function genBtn() {
  let html = "";
  for (let i = 0; i < bts.length; i++) {
    for (let j = 0; j < bts[i].length; j++) {
      if (j == 0)
      html += `<h1>${bts[i][j].des}</h1><div class="row mx-3 mb-5">`;
      else
      html += `<button class="btn btn-outline-dark my-1 col-12 col-md-4 detetive" data-mcolor="${bts[i][j].col}" style="background-color: ${bts[i][j].col};">${bts[i][j].des}</button>`;
    }
    html += `</div>`;
  }
  qs("#div_sus").innerHTML = html;
  
  qsa("button.detetive").forEach(function(e) {
    e.onclick = togBtn;
  });
}

afterLoad(function() {
  genBtn();
  qs("#btn_redefinir").onclick = genBtn;
});
