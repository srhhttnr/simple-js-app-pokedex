// IIFE around array with Pokemon List
let pokemonRepository = (function () {
    let pokemonList = [
      { name: "Bulbasaur", height: 0.7, type: ["grass", "poison"] },
      { name: "Squirtle", height: 0.5, type: ["water"] },
      { name: "Jigglypuff", height: 0.5, type: ["fairy", "normal"] },
      { name: "Eevee", height: 0.5, type: ["normal"] },
      { name: "Pikachu", height: 0.4, type: ["electric"] },
    ]
  
    // function to return list of pokemon
    function getAll() {
      return pokemonList;
    }

    // function that adds pokemon to the array
    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    return {
      getAll: getAll,
      add: add,
    }
})();
  
// print all pokemon in the list
document.write(pokemonRepository.getAll());