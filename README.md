# Jogo para identificar personagem
git clone git@github.com:tseiiti/pokemon.git
git checkout test
ruby -run -ehttpd . -p 8000
git add .; git commit -m "reduzi getTime"; git pull; git push; git status;

pendencias:
# tela com dados do pok
# active botões de navegação header.html

https://stackoverflow.com/questions/11179780/javascript-and-web-services-wsdl

https://stackoverflow.com/questions/124269/simplest-soap-example
https://stackoverflow.com/questions/17604071/parse-xml-using-javascript



	

// // create web audio api context
// var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

// function playNote(frequency, duration) {
//   // create Oscillator node
//   var oscillator = audioCtx.createOscillator();

//   oscillator.type = 'square';
//   oscillator.frequency.value = frequency; // value in hertz
//   oscillator.connect(audioCtx.destination);
//   oscillator.start();

//   setTimeout(
//     function() {
//       oscillator.stop();
//       playMelody();
//     }, duration);
// }

// function playMelody() {
//   if (notes.length > 0) {
//     note = notes.pop();
//     playNote(note[0], 1000 * 256 / (note[1] * tempo));
//   }
// }

// notes = [
//   [659, 4],
//   [659, 4],
//   [659, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4],
//   [0, 4],
//   [987, 4],
//   [987, 4],
//   [987, 4],
//   [1046, 8],
//   [0, 16],
//   [783, 16],
//   [622, 4],
//   [523, 8],
//   [0, 16],
//   [783, 16],
//   [659, 4]
// ];

// notes.reverse();
// tempo = 100;

// playMelody();