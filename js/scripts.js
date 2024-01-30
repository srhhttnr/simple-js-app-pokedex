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
    };

    // function to return list of pokemon
    function getAll() {
      return pokemonList;
    };

    // function that adds a list item to the pokemon array and displays them as buttons, when clicked openModal() runs
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
        openModal(pokemon);
      });
    };

    // function that loads each pokemon from the pokemon API
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: item.height,
            types: item.types
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    };

    // function that loads details of pokemon
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    };  
  
    let modalContainer = document.querySelector('#modal-container');

    // function that opens modal and displays details of pokemon
    function openModal(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        // event listener that closes the modal when the user clicks anywhere off the modal
        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            closeModal();
          }
        });

        // event listener that closes the modal when the escape key is pressed
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            closeModal();  
          }
        });
    
        // clear all existing modal content
        modalContainer.innerHTML = '';
    
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
    
        // add new modal content
        // create button to close modal
        let closeModalButton = document.createElement('button');
        closeModalButton.classList.add('modal-close');
        closeModalButton.innerText = 'close';
        closeModalButton.addEventListener('click', closeModal);
      
        // add elements to modal
        let nameElement = document.createElement('h1');
        nameElement.innerText = pokemon.name;
        nameElement.classList.add('name-modal-title')
    
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = `Image of ${pokemon.name}`;
        imageElement.classList.add('image-modal-content')

        let heightElement = document.createElement('p');
        heightElement.innerText = `Height: ${pokemon.height} m`;
        heightElement.classList.add('height-modal-content')

        // function that reads the types of pokemon from the array fetched from api
        let pokemonTypes = []

        pokemon.types.forEach(function (pokemon) {
          pokemonTypes = pokemon.types;
        });

        let typesElement = document.createElement('p');
        typesElement.innerText = `Type: ${pokemonTypes.name}`;
        typesElement.classList.add('types-modal-content')
      
        // append elements to modal content
        modalContent.appendChild(closeModalButton);
        modalContent.appendChild(nameElement);
        modalContent.appendChild(imageElement);
        modalContent.appendChild(heightElement);
        modalContent.appendChild(typesElement);

        // append modal content to modal container
        modalContainer.appendChild(modalContent);
    
        modalContainer.classList.add('is-visible');
      });
    };

    // function that closes the modal
    function closeModal() {
      modalContainer.classList.remove('is-visible');
    };

    // return statements
    return {
      getAll : getAll,
      add : add,
      openModal : openModal,
      addListItem : addListItem,
      loadList : loadList,
      loadDetails : loadDetails,
    };
})();
  
// print all pokemon in the list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});