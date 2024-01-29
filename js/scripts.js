// IIFE around array with Pokemon List
let pokemonRepository = (function () {
    // empty array for pokemon to be added into as objects
    let pokemonList = [];

    // pokemon API URL
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    
    // function that adds pokemon to the array
    function add(pokemon) {
      if (
        typeof pokemon === 'object' &&
        "name" in pokemon 
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log('pokemon is not correct');
      }
    }

    // function to return list of pokemon
    function getAll() {
      return pokemonList;
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

      // add event listener to button
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
    }

    // function that shows loading message while fetching data
    let loader = document.querySelector('#loader');
    loader.innertext = "loading";

    function showLoadingMessage () {
      loader.classList.add("display");
      console.log(loader);
    }

    // function that hides loading message after data is fetched
    function hideLoadingMessage () {
      loader.classList.remove("display");
    }

    // function that loads each pokemon from the pokemon API
    function loadList() {
      showLoadingMessage()
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        hideLoadingMessage()
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {
        hideLoadingMessage()
        console.error(e);
      })
    }

    // function that loads details of pokemon
    function loadDetails(item) {
      showLoadingMessage()
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        hideLoadingMessage()
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        hideLoadingMessage()
        console.error(e);
      });
    }

    // function that prints the pokemon object to the console
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
      });
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
  
//pokemonRepository.add({name: 'Pidgey', height: 0.3, type: ['flying', 'normal']});

// print all pokemon in the list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});