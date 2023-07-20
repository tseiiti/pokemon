var hist;

function celula(html, id_t, id_c, id_y, id_x) {
  html += `<div class="col-4 border p-0">`;
  
  // respostas
  html += `<div style="line-height: 10px; font-size: 9px;">`;
  for(let i = 0; i < 9; i++) {
    html += `<label class="numbers_left tabela_${id_t} celula_${id_c} linha_${id_y} coluna_${id_x} label_${i + 1} visible bg-white" style="line-height: 10px; font-size: 9px; width: 7px;" data-value="${i + 1}">${i + 1}</label>`;
  }
  html += `</div>`;
  
  // input numero da celula
  html += `<input class="inp_txt tabela_${id_t} celula_${id_c} linha_${id_y} coluna_${id_x}" type="number" style="height: 20px; width: 20px; text-align:center;">`;
  html += `</div>`;
  
  return html;
}

function tabela(html, id_t) {
  html += `<div class="col-4 border border-secondary"><div class="row">`;
  for(let i = 0; i < 9; i++) {
    let id_y = Math.floor(id_t / 3) * 3 + 1 + Math.floor(i / 3);
    let id_x = (i % 3) + 1 + (id_t % 3) * 3;
    
    html = celula(html, id_t + 1, i + 1, id_y, id_x);
    
    if ((i + 1) % 3 == 0 && i < 8) html += `</div><div class="row">`;
  }
  html += `</div></div>`;
  
  return html;
}

function grid() {
  hist = getCookie("sudoku_hist") || "";
  hist = hist.split(',');
  
  let html = "";
  
  // gera grid
  html += `<div class="row">`;
  for(let i = 0; i < 9; i++) {
    html = tabela(html, i);
    if ((i + 1) % 3 == 0 && i < 8) html += `</div><div class="row">`;
  }
  html += `</div></div>`;
  qs("#div_grid").innerHTML = html;
  
  digitar();
  historico();
  
  html = "";
  // html += `<button class="btn btn-primary m-1" type="button" onclick="salvar();">Salvar</button>`;
  html += `<button class="btn btn-primary m-1" type="button" onclick="recarregar();">Recarregar</button>`;
  html += `<button class="btn btn-primary m-1" type="button" onclick="apagar();">Apagar</button>`;
  html += `<button class="btn btn-primary m-1" type="button" onclick="auto();">Auto</button>`;
  html += `<button class="btn btn-primary m-1" type="button" onclick="desfazer();">Desfazer</button>`;
  // html += `<button class="btn btn-primary m-1" type="button" onclick="teste();">Teste</button>`;
  qs("#div_btn").innerHTML = html;
}

function digitar() {
  qsa(".inp_txt").forEach(function(e) {
    e.oninput = function() {
      // garante somente 1 numero
      this.value = this.value.substr(-1);
      verifica(this);
    }
  });
}

function verifica(elem) {
  if (elem) {
    let cl = elem.classList;
    let txt = (new Date()).getTime();
    txt += `&${cl[1]}&${cl[2]}&${elem.value}`;
    hist.push(txt);
    setCookieY("sudoku_hist", hist.toString());
  }
  
  // desfaz verificações anteriores
  qsa("label.invisible, label.bg-info").forEach(function(e) {
    changeClass(e, "invisible", "visible");
    changeClass(e, "bg-info", "bg-white");
  });

  ocultar();
  mesmo();
  recomendaveis();
  corrige();
  historico();
}

function ocultar() {
  qsa(".inp_txt").forEach(function(e) {
    if (e.value && e.value > 0) {
      let cl = e.classList;
      
      // oculta labels da celula
      qsa(`label.${cl[1]}.${cl[2]}.visible`).forEach(function(f) {
        changeClass(f, "visible", "invisible");
      });
      
      // oculta label repetida da tabela, linha e coluna
      [cl[1], cl[3], cl[4]].forEach(function(c) {
        qsa(`label.${c}.label_${e.value}`).forEach(function(f) {
          changeClass(f, "visible", "invisible");
        });
      });
    }
  });
}

function mesmo() {
  let se = new Set();
  // procura valores em mesma linha ou coluna
  qsa("label.visible").forEach(function(e) {
    let cl = e.classList;
    let same_lin = true;
    let same_col = true;
    
    qsa(`label.${cl[1]}.${cl[5]}.visible`).every(function(f) {
      if (cl[3] != f.classList[3]) same_lin = false;
      return same_lin;
    });
    
    qsa(`label.${cl[1]}.${cl[5]}.visible`).every(function(f) {
      if (cl[4] != f.classList[4]) same_col = false;
      return same_col;
    });
    
    if (same_lin)
      se.add(`${cl[1]} ${cl[3]} ${cl[5]}`);
    if (same_col)
      se.add(`${cl[1]} ${cl[4]} ${cl[5]}`);
  });
  
  // oculta de outras tabelas
  se.forEach(function(e) {
    let cl = e.split(" ");
    qsa(`label.${cl[1]}.${cl[2]}`).forEach(function(f) {
      if (cl[0] != f.classList[1])
        changeClass(f, "visible", "invisible");
    });
  });
}

function recomendaveis() {
  qsa("label.visible").forEach(function(e) {
    let cl = e.classList;
    let ls;
    
    ls = qsa(`label.${cl[1]}.${cl[2]}.visible`);
    if (ls.length == 1)
      changeClass(ls[0], "bg-white", "bg-info");
    
    ls = qsa(`label.${cl[1]}.${cl[5]}.visible`);
    if (ls.length == 1)
      changeClass(ls[0], "bg-white", "bg-info");
  });
}

function corrige() {
  qsa(".inp_txt").forEach(function(e) {
    e.parentElement.classList.remove("text-bg-danger");
  });

  qsa(".inp_txt").forEach(function(e) {
    if (e.value && e.value > 0) {
      let cl = e.classList;
      [cl[1], cl[3], cl[4]].forEach(function(c) {
        qsa(`input.${c}`).forEach(function(f) {
          if (e.className != f.className && e.value == f.value) {
            e.parentElement.classList.add("text-bg-danger");
            f.parentElement.classList.add("text-bg-danger");
          }
        });
      });
    }
  });
}

function historico() {
  let html = "";
  [...hist].sort((a, b) => b.split("&")[0] - a.split("&")[0]).forEach(function(e) {
    let f = e.split("&");
    if (f[1]) html += `<tr>
      <td>${getTime(+f[0])}</td>
      <td>${f[1]}</td>
      <td>${f[2]}</td>
      <td>${f[3]}</td>
      </tr>`;
  });
  qs("#hist").innerHTML = html;
}



function salvar() {
  let t = "[";
  qsa(".inp_txt").forEach(function(e) {
    if (e.value) {
      let cl = e.classList;
      t += `[${cl[1].substr(-1)},${cl[2].substr(-1)},${e.value}],`;
    }
  });
  t += "]";
  cc(t, true, false);
}

function auto() {
  let executou = false;
  qsa("label.bg-info").forEach(function(e) {
    let cl = e.classList;
    let f = qs(`input.${cl[3]}.${cl[4]}`);
    f.value = e.dataset.value;
    f.parentElement.classList.add("border-warning");
    executou = true;
  });
  
  if (executou) {
    verifica();
    auto();
  }
}

function recarregar() {
  [...hist].forEach(function(e) {
    let f = e.split("&");
    if (f[1]) qs(`input.${f[1]}.${f[2]}`).value = f[3];
  });
  verifica();
}

function apagar() {
  delCookie("sudoku_hist");
  grid();
}

function desfazer() {
  hist.pop();
  setCookieY("sudoku_hist", hist.toString());
  grid();
  recarregar();
}



function cc(text, replace = false, tlog = true) {
  if (text) {
    let html = "";
    let t = "";
    if (!replace) html = qs("#div_console").innerHTML;
    if (tlog) t = getTime(new Date(), "mill") + " => ";
    qs("#div_console").innerHTML = "<p class=\"p-0 m-0\">" + t + text + "</p>" + html;
  }
}



afterLoad(function() {
  grid();
  
  // let x = [[1, 4, 3], [1, 6, 8], [1, 7, 5], [1, 8, 9], [3, 1, 5], [3, 4, 1], [3, 6, 7], [3, 7, 6], [3, 8, 8], [3, 9, 4], [4, 3, 1], [4, 4, 6], [4, 7, 4], [5, 1, 8], [5, 2, 4], [5, 6, 5], [5, 8, 3], [6, 3, 3], [6, 6, 8], [6, 8, 1], [7, 2, 4], [8, 7, 7], [8, 8, 2], [8, 9, 9], [9, 1, 7], [9, 3, 1], [9, 5, 6], [9, 6, 9], [9, 8, 4],];
  
  // x.forEach(function(a) {
  //   qs(`input.tabela_${a[0]}.celula_${a[1]}`).value = a[2];
  // });
  
  verifica();
});
