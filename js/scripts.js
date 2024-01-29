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
          console.log(pokemon);
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
        // add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }   
  
    let modalContainer = document.querySelector('#modal-container');

    // function that opens modal and displays details of pokemon
    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        // event listener that closes the modal when the user clicks anywhere off the modal
        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });

        // event listener that closes the modal when the escape key is pressed
        window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
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
    
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = `Image of ${pokemon.name}`;

        let heightElement = document.createElement('p');
        heightElement = `Height: ${pokemon.height} m`;

        let typesElement = document.createElement('p');
        typesElement = `Types: ${pokemon.types}`;
      
        // append elements to modal content
        modalContent.appendChild(closeModalButton);
        modalContent.appendChild(nameElement);
        modalContent.appendChild(imageElement);
        modalContent.appendChild(heightElement);
        modalContent.appendChild(typesElement);

        // append modal content to modal container
        modalContainer.appendChild(modal);
    
        modalContainer.classList.add('is-visible');
      });
    }

    // function that closes the modal
    function closeModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    };

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