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

    // function that adds a list item to the pokemon array and displays them as buttons, when clicked showModal() runs
    function addListItem(pokemon) {
      let ulOfPokemon = document.querySelector('.pokemon-list');
      ulOfPokemon.classList.add('list-group');
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-item');

      ulOfPokemon.appendChild(listItem);

      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button', 'btn-primary', 'btn');
      button.setAttribute('data-target', '#modal');
      button.setAttribute('data-toggle', 'modal');

      listItem.appendChild(button);

      // add event listener to button that shows modal when button is clicked
      button.addEventListener('click', function() {
        showModal(pokemon);
      });
    };

    // function that loads each pokemon from the pokemon API
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name : item.name,
            detailsUrl : item.url
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
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      }).catch(function (e) {
        console.error(e);
      });
    }; 

    let modalContainer = document.querySelector('.modal');

    // function that shows modal and displays details of pokemon
    function showModal(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        // event listener that hides the modal when the user clicks anywhere off the modal
        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });

        // event listener that hides the modal when the escape key is pressed
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
          }
        });
    
        // assign variables to modal elements in html file
        let modalContent = document.querySelector('.modal-content');
        let modalHeader = document.querySelector('.modal-header');
        let modalTitle = document.querySelector('.modal-title');
        let modalBody = document.querySelector('.modal-body');
    
        // clear all existing modal content
        modalContainer.innerHTML = '';

        // add new modal content
        // create button to close modal
        let closeModalButton = document.querySelector('.close');
      
        // add elements to modal
        let nameElement = document.createElement('h1');
        nameElement.innerText = pokemon.name;
    
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = `Image of ${pokemon.name}`;

        let heightElement = document.createElement('p');
        heightElement.innerText = `Height: ${pokemon.height} m`;

        let weightElement = document.createAttribute('p');
        weightElement.innerText = `Weight: ${pokemon.weight} kg`;

        // function that reads the types of pokemon from the array fetched from api
        let pokemonTypes = [];

        pokemon.types.forEach(function (pokemon) {
          pokemonTypes.push(pokemon.type.name);
        });

        let typesElement = document.createElement('p');
        typesElement.innerText = `Type: ${pokemonTypes.join(', ')}`;

        // function that reads the abilities from the array fetched from api
        let pokemonAbilities = [];

        pokemon.abilities.forEach(function (pokemon) {
          pokemonAbilities.push(pokemon.ability.name);
        });

        let abilitiesElement = document.createElement('p');
        abilitiesElement.innerText = `Abilities: ${pokemonAbilities.join(', ')}`;
      
        // append elements to modal header/body
        modalTitle.appendChild(nameElement);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeModalButton);
        modalBody.appendChild(imageElement);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(weightElement);
        modalBody.appendChild(typesElement);
        modalBody.appendChild(abilitiesElement);

        //append modal header/body to modal content
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);

        // append modal content to modal
        modalContainer.appendChild(modalContent);
    
        modalContainer.classList.add('is-visible');
      });
    };

    // function that hides the modal
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    };

    // // function that gives you the previous pokemon in array
    // function previousPokemon(pokemon) {

    // };

    // // function that gives you the next pokemon in array
    // function nextPokemon(pokemon) {

    // };

    // return statements
    return {
      getAll : getAll,
      add : add,
      showModal : showModal,
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