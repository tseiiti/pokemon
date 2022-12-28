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

var gam_arr = [[], [], []];

function togBtn() {
  let i = this.dataset.mty;
  let j = this.dataset.mid;
  let dsg = gam_arr[i][j];
  
  if (dsg == "2") {
    let resp = confirm("Deseja desmarcar esse botão?");
    if (resp) {
      let str = this.innerText;
      this.innerText = str.replace(" *", "");
      this.style.backgroundColor = this.dataset.mcolor;
      this.classList.replace("btn-outline-secondary", "btn-outline-dark");
      this.readOnly = false;
      dsg = "";
    }
  } else if (dsg == "1") {
    let resp = confirm("Deseja marcar esse botão?");
    if (resp) {
      this.innerText += " *";
      this.classList.replace("btn-outline-secondary", "btn-outline-dark");
      dsg = "2";
    }
  } else {
    this.classList.replace("btn-outline-dark", "btn-outline-secondary");
    this.readOnly = true;
    this.style.backgroundColor = "#A9A9A9";
    dsg = "1";
  }
  gam_arr[i][j] = dsg;
  setSession("gam_arr", encode(gam_arr));
  totals();
}

function genBtn() {
  let html = "";
  for (let i = 0; i < bts.length; i++) {
    for (let j = 0; j < bts[i].length; j++) {
      if (j == 0) {
        html += `<h1 class="detetive">${bts[i][j].des}</h1><div class="row mx-3 mb-5">`;
      } else {
        let cls = "secondary";
        let red = ` readonly="readonly"`;
        let bgc = "#A9A9A9";
        let dsc = "";
        if (gam_arr[i][j - 1] == "2") {
          cls = "dark";
          dsc = " *";
        } else if (gam_arr[i][j - 1] != "1") {
          cls = "dark";
          red = "";
          bgc = bts[i][j].col;
        }
        html += `<button class="btn btn-outline-${cls} my-1 col-12 col-md-4 detetive det${i}" data-mcolor="${bts[i][j].col}" data-mty="${i}" data-mid="${j - 1}"${red} style="background-color: ${bgc};">${bts[i][j].des}${dsc}</button>`;
      }
    }
    html += `</div>`;
  }
  qs("#div_sus").innerHTML = html;
  totals();
  
  qsa("button.detetive").forEach(function(e) {
    e.onclick = togBtn;
  });
}

function totals() {
  let es = qsa("h1.detetive");
  for (let i = 0; i < es.length; i++) {
    let sl = gam_arr[i].filter(x => x != "").length;
    let tl = bts[i].length;
    let x = `${bts[i][0].des} ${sl}/${tl}`;
    es[i].innerText = `${bts[i][0].des} ${sl}/${tl}`;
  }
}

afterLoad(function() {
  let s = getSession("gam_arr");
  if (s) gam_arr = decode(s, Array);
  genBtn();
  
  qs("#btn_redefinir").onclick = function() {
    let resp = confirm("Deseja redefinir o jogo?");
    if (resp) {
      delSession("gam_arr");
      gam_arr = [[], [], []];
      genBtn();
    }
  }
});
