window.onload = function(e){
    "use strict";
    const totalPokemons = 150;

    /**
     * @description gera a URL para acessar os dados da API dos Pokemons
     * @param number id 
     * @return string
     */
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

    /**
     * @description retorna uma promise com os dados dos 150 Pokemons originais
     * @return Promise
     */
    const generatePokemonPromises = () => Array(150).fill().map((element, index) => 
        fetch(getPokemonUrl(index + 1))
            .then(response => response.json()));

    /**
     * @description converte os dados do array de Pokemons em uma string com todos os <li> usados na página
     * @param array pokemons 
     * @return string
     */
    const generateHTML = pokemons =>
        pokemons.reduce((accumulator, { name, id, types, sprites }) => {
            const elementTypes = types.map(typeInfo => typeInfo.type.name)
            let sprite = sprites.front_shiny
            if (sprite === '' || sprite === null) {
                sprite = sprites.front_default
            }

            accumulator += `<li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${name}" data-asset="${sprites.front_shiny}" src="${sprites.front_shiny}">
                <h2 class="card-title">${id}. ${name}</h2>
                <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            </li>`;
            return accumulator;
        }, '');

    /**
     * @description insere as tags <li> no frontend
     * @param string pokemons 
     */
    const insertPokemonsIntoPage = pokemons => {
        const ul = document.querySelector('ul[data-js="pokedex"].pokedex');
        ul.innerHTML = pokemons;
    }

    Promise.all(generatePokemonPromises())
        .then(generateHTML)
        .then(insertPokemonsIntoPage);
}