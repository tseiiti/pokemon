function celula(html, id_t, id_c, id_y, id_x) {
  html += `<div class="col-4 border p-0">`;
  
  // respostas
  html += `<div style="line-height: 10px; font-size: 9px;">`;
  for(let i = 0; i < 9; i++) {
    html += `<label class="numbers_left tabela_${id_t} celula_${id_c} linha_${id_y} coluna_${id_x} label_${i + 1}" style="line-height: 10px; font-size: 9px; width: 7px;" data-color="" data-value="${i + 1}">${i + 1}</label>`;
    // if ((i + 1) % 3 == 0 && i < 8) html += `</div><div>`;
  }
  html += `</div>`;
  
  // input numero da celula
  html += `<input class="tabela_${id_t} linha_${id_y} coluna_${id_x} celula_${id_c}" name="val_num" type="number" data-celula="${id_c}" style="height: 20px; width: 20px; text-align:center;">`;
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
  let html = "";
  
  // gera grid
  html += `<div class="row">`;
  for(let i = 0; i < 9; i++) {
    html = tabela(html, i);
    if ((i + 1) % 3 == 0 && i < 8) html += `</div><div class="row">`;
  }
  html += `</div></div>`;
  
  // alert(html)
  qs("#div_teste").innerHTML = html;
}

function oneNumber() {
  // garante somente 1 numero
  is = qsa("input[name=val_num]");
  is.forEach(function(e) {
    e.oninput = function() {
      this.value = this.value.substr(-1);
    }
    e.addEventListener("change", btnTeste2);
  });
}

function cc(text, replace = false, tlog = true) {
  if (text) {
    let html = "";
    let t = "";
    if (!replace) html = qs("#div_console").innerHTML;
    if (tlog) t = getTime(new Date(), "mill") + " => ";
    qs("#div_console").innerHTML = "<p cla6ss=\"p-0 m-0\">" + t + text + "</p>" + html;
  }
}

function btnTeste1() {
  is = qsa("input[name=val_num]");
  let t = "[";
  is.forEach(function(e) {
    if (e.value) {
      let cl = e.className.split(" ");
      t += `[${cl[0].substr(-1)}, ${cl[3].substr(-1)}, ${e.value}], `;
    }
  });
  t += "]";
  cc(t, true, false);
}

function btnTeste2() {
  qsa(".numbers_left").forEach(function(e) {
    e.style.visibility = "visible";
    e.dataset.color = "";
    e.style.backgroundColor = "";
  });

  qsa("input[name=val_num]").forEach(function(e) {
    if (e.value && e.value > 0) {
      let cl = e.className.split(" ");
      
      // apaga label da celula preechida
      qsa(`label.${cl[0]}.${cl[3]}`).forEach(function(f) {
        f.style.visibility = "hidden";
      });
      
      // apaga label repetida da tabela, linha e coluna
      cl.slice(0, 3).forEach(function(c) {
        qsa(`label.${c}.label_${e.value}`).forEach(function(f) {
          f.style.visibility = "hidden";
        });
      });
    }
  });
  
  qsa(".numbers_left").forEach(function(e) {
    if (e.style.visibility == "visible") {
      let color = "#abf7b1";
      let cl = e.className.split(" ");
      
      // verifica se nao eh unico
      qsa(`label.${cl[1]}.${cl[2]}`).forEach(function(f) {
        if (f.style.visibility == "visible" && e.className != f.className) {
          color = "#ddd";
          return;
        }
      });
      
      if (color == "#ddd") {
        // verifica se nao eh recomendavel
        qsa(`label.${cl[1]}.${cl[5]}`).forEach(function(f) {
          if (f.style.visibility == "visible" && e.className != f.className) {
            color = "";
            return;
          }
        });
      }
      
      e.dataset.color = color;
      e.style.backgroundColor = color;
    }
  });
}

function btnTeste3() {
  let executou = false;
  qsa(".numbers_left").forEach(function(e) {
    let color = true;
    let cl = e.className.split(" ");
    
    if (e.style.visibility == "visible" && e.dataset.color != "") {
      let f = qs(`input.${cl[1]}.${cl[2]}`);
      f.value = e.dataset.value;
      f.parentElement.className += " border-warning";
      e.style.visibility = "hidden";
      executou = true;
    }
  });
  
  if (executou) {
    btnTeste2();
    btnTeste3();
  }
}

function btnTeste4() {
  qsa("input[name=val_num]").forEach(function(e) {
    if (e.value && e.value > 0) {
      let cl = e.className.split(" ");
      cl.slice(0, 3).forEach(function(c) {
        qsa(`input.${c}`).forEach(function(f) {
          if (e.className != f.className && e.value == f.value) {
            e.parentElement.className += " text-bg-danger";
            f.parentElement.className += " text-bg-danger";
          }
        });
      });
    }
  });
}


afterLoad(function() {
  grid();
  oneNumber();
  
  qs("#btn_teste_1").addEventListener("click", btnTeste1);
  qs("#btn_teste_2").addEventListener("click", btnTeste2);
  qs("#btn_teste_3").addEventListener("click", btnTeste3);
  qs("#btn_teste_4").addEventListener("click", btnTeste4);
  
  
  // let x = [[1, 4, 3], [1, 6, 8], [1, 7, 5], [1, 8, 9], [3, 1, 5], [3, 4, 1], [3, 6, 7], [3, 7, 6], [3, 8, 8], [3, 9, 4], [4, 3, 1], [4, 4, 6], [4, 7, 4], [5, 1, 8], [5, 2, 4], [5, 6, 5], [5, 8, 3], [6, 3, 3], [6, 6, 8], [6, 8, 1], [7, 2, 4], [8, 7, 7], [8, 8, 2], [8, 9, 9], [9, 1, 7], [9, 3, 1], [9, 5, 6], [9, 6, 9], [9, 8, 4],];
  
  // x.forEach(function(a) {
  //   qs(`input.tabela_${a[0]}.celula_${a[1]}`).value = a[2];
  // });
  
  btnTeste2();
});