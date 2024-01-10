let pokemonList = [
    {name: 'Bulbasaur', height: .7, type: ['grass', 'poison']},
    {name: 'Squirtle', height: .5, type: ['water']},
    {name: 'Jigglypuff', height: .5, type: ['fairy', 'normal']},
    {name: 'Eevee', height: .5, type: ['normal']},
    {name: 'Pikachu', height: .4, type: ['electric']}
];

for (let i = 0; i < pokemonList.length; i++){
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}m)`);

    if (pokemonList[i].height > .5){
        document.write(`~~Wow that's a big Pokemon!~~` + "<br>");
    } else if (pokemonList[i].height < .5){
        document.write(`~~Wow that's a small Pokemon!~~` + "<br>");
    } else {
        document.write("<br>");
    }

}