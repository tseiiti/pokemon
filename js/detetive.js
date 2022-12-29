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

var gam_arr = [
  ["0", "0", "0", "0", "0", "0", "0", "0"], 
  ["0", "0", "0", "0", "0", "0", "0", "0"], 
  ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]];

function togBtn() {
  let i = this.dataset.mty;
  let j = this.dataset.mid;
  let dsg = gam_arr[i][j];
  
  if (dsg == "1") {
    this.classList.replace("btn-outline-secondary", "btn-outline-dark");
    this.style.backgroundColor = this.dataset.mcolor;
    this.readOnly = false;
    this.classList.remove("fw-bold");
    this.nextElementSibling.disabled = true;
    dsg = "0";
  } else if (dsg == "0") {
    this.classList.replace("btn-outline-dark", "btn-outline-secondary");
    this.style.backgroundColor = "#C0C0C0";
    this.readOnly = true;
    this.nextElementSibling.disabled = false;
    dsg = "1";
  }
  gam_arr[i][j] = dsg;
  setSession("gam_arr", encode(gam_arr));
  totTit();
}

function togMarca() {
  let e = this.previousElementSibling;
  let i = e.dataset.mty;
  let j = e.dataset.mid;
  let dsg = gam_arr[i][j];
  if (e.classList.contains("fw-bold")) {
    this.classList.replace("btn-secondary", "btn-outline-secondary");
    e.classList.remove("fw-bold");
    e.style.backgroundColor = "#C0C0C0";
    dsg = "1";
  } else {
    this.classList.replace("btn-outline-secondary", "btn-secondary");
    e.classList.add("fw-bold");
    e.style.backgroundColor = "#A9A9A9";
    dsg = "2";
  }
  gam_arr[i][j] = dsg;
  setSession("gam_arr", encode(gam_arr));
}

function genBtn() {
  let html = "";
  for (let i = 0; i < bts.length; i++) {
    for (let j = 0; j < bts[i].length; j++) {
      if (j == 0) {
        html += `<h1 class="det">${bts[i][j].des}</h1><div class="row mx-3 mb-5">`;
      } else {
        let cls = "secondary";
        let red = ` readonly="readonly"`;
        let dis = `class="btn btn-outline-secondary marca"`;
        let bgc = "#C0C0C0";
        if (gam_arr[i][j - 1] == "2") {
          cls = "secondary fw-bold";
          dis = `class="btn btn-secondary marca"`;
          bgc = "#A9A9A9";
        } else if (gam_arr[i][j - 1] != "1") {
          cls = "dark";
          dis = `class="btn btn-outline-secondary marca" disabled="disabled"`;
          red = "";
          bgc = bts[i][j].col;
        }
        html += `<div class="btn-group my-1 col-12 col-md-4" role="group">`;
        html += `<button class="btn btn-outline-${cls} text-truncate detetive det${i}" data-mcolor="${bts[i][j].col}" data-mty="${i}" data-mid="${j - 1}"${red} style="background-color: ${bgc};">${bts[i][j].des}</button>`;
        html += `<button type="button" ${dis} width="40px" style="width: 40px; max-width: 40px;">*</button>`;
        html += `</div>`;
      }
    }
    html += `</div>`;
  }
  qs("#div_sus").innerHTML = html;
  totTit();
  
  qsa("button.detetive").forEach(function(e) {
    e.onclick = togBtn;
  });
  
  qsa("button.marca").forEach(function(e) {
    e.onclick = togMarca;
  });
}

function totTit() {
  let es = qsa("h1.det");
  for (let i = 0; i < es.length; i++) {
    let sl = gam_arr[i].filter(x => x != "0").length;
    let tl = bts[i].length - 1;
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
      gam_arr = [
        ["0", "0", "0", "0", "0", "0", "0", "0"], 
        ["0", "0", "0", "0", "0", "0", "0", "0"], 
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]];
      genBtn();
    }
  }
});
