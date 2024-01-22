// IIFE around array with Pokemon List
let pokemonRepository = (function () {
    let pokemonList = [
      { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
      { name: 'Squirtle', height: 0.5, type: ['water'] },
      { name: 'Jigglypuff', height: 0.5, type: ['fairy', 'normal'] },
      { name: 'Eevee', height: 0.5, type: ['normal'] },
      { name: 'Pikachu', height: 0.4, type: ['electric'] },
    ]
    
    // function that adds pokemon to the array
    function add(pokemon) {
      if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
      }
    }

    // function to return list of pokemon
    function getAll() {
      return pokemonList;
    }

    // function that prints the pokemon object to the console
    function showDetails(pokemon) {
      console.log(pokemon);
    }

    // function that adds a list item to the list of pokemon and displays them as buttons, when clicked showDetails() runs
    function addListItem(pokemon) {
      let ulOfPokemon = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      ulOfPokemon.appendChild(listItem);

      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listItem.appendChild(button);

      button.addEventListener('click', showDetails);
    }

    return {
      getAll : getAll,
      add : add,
      showDetails : showDetails,
      addListItem : addListItem,
    };
})();
  
pokemonRepository.add({
  name: 'Pidgey', height: 0.3, type: ['flying', 'normal']
});

// print all pokemon in the list
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});