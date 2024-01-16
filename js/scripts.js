// array with various Pokemon, their height, and their type
let pokemonList = [
    {name: 'Bulbasaur', height: .7, type: ['grass', 'poison']},
    {name: 'Squirtle', height: .5, type: ['water']},
    {name: 'Jigglypuff', height: .5, type: ['fairy', 'normal']},
    {name: 'Eevee', height: .5, type: ['normal']},
    {name: 'Pikachu', height: .4, type: ['electric']}
];

//forEach loop that writes their name and details
pokemonList.forEach(function(pokemon) {
    document.write("<p>" + `${pokemon.name}; ${pokemon.height}m; ${pokemon.type}` + "</p>");
})

// for loop that writes their name and height
// for (let i = 0; i < pokemonList.length; i++){
//     document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}m)`);

//     if (pokemonList[i].height > .5){
//         document.write(`~~Wow that's a big Pokemon!~~` + "<br>");
//     } else if (pokemonList[i].height < .5){
//         document.write(`~~Wow that's a small Pokemon!~~` + "<br>");
//     } else {
//         document.write("<br>");
//     }
// }