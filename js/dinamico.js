const exec = () => {
  try {
    let ret = eval(qs('#text_input').value)
    if (ret) qs('#div_output').innerHTML = ret
  } catch (error) {}
}

const log = (text, replace = false) => {
  let div = qs("#div_log")
  let html = replace ? "" : div.innerHTML
  div.innerHTML = `<p class="p-0 m-1"> > ${text}</p>${html}`
  div.scrollTo(0, 0);
}

const auto_exec_change = () => {
  if (qs('#auto_exec').checked) {
    qs('#text_input').oninput = exec
  } else {
    qs('#text_input').oninput = undefined
  }
}

const input_clear = () => {
  qs('#text_input').value = ''
  qs('#div_output').innerHTML = ''
}

const log_clear = () => {
  qs('#div_log').innerHTML = ''
}



afterLoad(function() {});
