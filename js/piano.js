function handleDown(key) {
  if (key.className.includes('black')) {
    key.classList.add('black_pressed');
    return
  }
  key.style.background = '#ddd';
}

function handleUp(key) {
  if (key.className.includes('black')) {
    key.classList.remove('black_pressed');
    return
  }
  key.style.background = 'white';
}

onkeydown = function(event) {
  handleDown(qs(`.key[data-key=${event.key}]`));
}

onkeyup = function(event) {
  handleUp(qs(`.key[data-key=${event.key}]`));
}

qsa('.key').forEach(function(key) {
  key.onmousedown = function() { handleDown(this); }
  key.onmouseup = function() { handleUp(this); }
  key.onmouseleave = function() { handleUp(this); }
  key.ontouchstart = function() { handleDown(this); }
  key.ontouchend = function() { handleUp(this); }
});

afterLoad(function() {
  // alert(1)
});
