// IIFE around array with Pokemon List
let pokemonRepository = (function () {
    let pokemonList = [
      { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
      { name: 'Squirtle', height: 0.5, type: ['water'] },
      { name: 'Jigglypuff', height: 0.5, type: ['fairy', 'normal'] },
      { name: 'Eevee', height: 0.5, type: ['normal'] },
      { name: 'Pikachu', height: 0.4, type: ['electric'] },
    ]

    // pokemon API
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    
    // function that adds pokemon to the array
    function add(pokemon) {
      if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
      } else {
        console.log('pokemon is not correct');
      }
    }

    // function to return list of pokemon
    function getAll() {
      return pokemonList;
    }

    // function that loads each pokemon from the pokemon API
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

    // function that loads details of pokemon
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    // function that prints the pokemon object to the console
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }

    // function that adds event listener to pokemon button
    function addEventListenerToPokemonButton(button, pokemon) {
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
    }

    // function that adds a list item to the list of pokemon and displays them as buttons, when clicked showDetails() runs
    function addListItem(pokemon) {
      let ulOfPokemon = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      listItem.classList.add('pokemon-list-item');

      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');

      ulOfPokemon.appendChild(listItem);
      listItem.appendChild(button);

      addEventListenerToPokemonButton(button, pokemon);
    }

    // return statements
    return {
      getAll : getAll,
      add : add,
      showDetails : showDetails,
      addListItem : addListItem,
      loadList : loadList,
      loadDetails : loadDetails,
    };
})();
  
pokemonRepository.add({
  name: 'Pidgey', height: 0.3, type: ['flying', 'normal']
});

// print all pokemon in the list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});