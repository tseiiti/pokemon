
function cc(text, replace = false) {
  if (text) {
    let html = "";
    if (!replace) html = qs("#div_console").innerHTML;
    qs("#div_console").innerHTML = "<p class=\"p-0 m-0\">" + getTime(new Date(), "mill") + " => " + text + "</p>" + html;
  }
}

function btnTeste() {
  is = qsa("input[name=val_num]");
  cc("", true)
  is.forEach(function(e) {
    cc(e.value);
  });
}

qs("#btn_teste").addEventListener("click", btnTeste);

// garante somente 1 numero
is = qsa("input[name=val_num]");
is.forEach(function(e) {
  e.oninput = function() {
    this.value = this.value.substr(-1);
  }
});


function celula(html) {
  html += `<div class="col-4 border p-0">`;
  
  // respostas
  // html += `<div class="">`;
  for(let i = 0; i < 9; i++) {
    html += `<label class="numbers_left" style="background-color: #ddd; width: 6px; line-height: 10px; font-size: 7px;">${i + 1}</label>`;
    // if ((i + 1) % 3 == 0 && i < 8) html += `</div><div class="">`;
  }
  // html += `</div>`;
  
  // input numero da celula
  // html += `<div class="row">`;
  html += `<input name="val_num" type="number" style="width: 20px; text-align:center;">`;
  // html += `</div>`;
  html += `</div>`;
  
  return html;
}

function tabela(html) {
  html += `<div class="col-4 border border-primary"><div class="row">`;
  for(let i = 0; i < 9; i++) {
    html = celula(html);
    if ((i + 1) % 3 == 0 && i < 8) html += `</div><div class="row">`;
  }
  html += `</div></div>`;
  
  return html;
}


let html = "";

html += `<div class="row">`;
for(let i = 0; i < 9; i++) {
  html = tabela(html);
  if ((i + 1) % 3 == 0 && i < 8) html += `</div><div class="row">`;
}
html += `</div></div>`;

alert(html)

qs("#div_teste").innerHTML = html;