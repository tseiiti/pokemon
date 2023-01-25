# Jogo para identificar personagem
git clone git@github.com:tseiiti/pokemon.git
git checkout test
ruby -run -ehttpd . -p 8000
http://localhost:8000/piano.html
git add .; git commit -m "reduzi getTime"; git pull; git push; git status;

pendencias:
# tela com dados do pok
# active botões de navegação header.html

https://stackoverflow.com/questions/11179780/javascript-and-web-services-wsdl

https://stackoverflow.com/questions/124269/simplest-soap-example
https://stackoverflow.com/questions/17604071/parse-xml-using-javascript




// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function play1() {
//   const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
//   const oscillator = audioCtx.createOscillator();
//   const gainNode = audioCtx.createGain();
//   const tempo = 100;
  
//   oscillator.connect(gainNode);
//   gainNode.connect(audioCtx.destination);
  
//   // oscillator.type = "square";
//   oscillator.detune.value = 100;
//   oscillator.start(0);
  
//   const initialVol = 0.1;
//   gainNode.gain.value = initialVol;
//   gainNode.gain.minValue = initialVol;
//   gainNode.gain.maxValue = initialVol;

//   for(let i = 0; i < notes.length; i++) {
//     let frequency = notes[i][0];
//     let duration = 1000 * 256 / (notes[i][1] * tempo);
//     cc(frequency + " - " + duration);
    
//     oscillator.frequency.value = frequency;
//     // gainNode.gain.value = 0.5;
//     // gainNode.connect(audioCtx.destination);
    
//     await sleep(duration);
//     // gainNode.disconnect(audioCtx.destination);
//   }
//   gainNode.disconnect(audioCtx.destination);
// }