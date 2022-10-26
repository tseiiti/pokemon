// import { pokes, querySelector, loadComponent, randomBetween } from './exports.js';


function getImageUrlByName(pok_id){
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ pok_id.toString().padStart(3, '0') }.png`;
}

var pok_id = randomBetween(1, 905);

function pokeImageLoad() {
  let img = querySelector('#poke_image');
  if (!img.alt) {
    img.src = getImageUrlByName(pok_id);
    img.alt = 'Imagem selecionada';
    console.log(pok_id);
    console.log(pokes[pok_id]);
    console.log(getImageUrlByName(pok_id));
  }
}

loadComponent();
  



// let path = window.location.pathname;
// let page = path.split('/').pop();
// console.log( page );
// console.log( page.split('.').pop() );

// function getRootUrl(pok_name) {
//   if (pokes.includes(pok_name)) {
//     return 'https://www.pokemon.com/br/pokedex/' + pok_name;
//   }
// }

// console.log(pokes.indexOf('venusaur'));
