function getImageUrlByName(pok_id){
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ pok_id.toString().padStart(3, '0') }.png`;
}

var pok_id = randomBetween(1, 905);

function pokeImageLoad() {
  let img = querySelector('#poke_image');
  if (img.alt) return false;
  
  img.src = getImageUrlByName(pok_id);
  img.alt = 'Imagem selecionada';
}

loadComponent('index_component', 'index_component.html');
