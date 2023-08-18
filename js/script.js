const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
//const pokemonErro = document.querySelector('.pokemon__error'); 

const formulario = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const buscaPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.ok){
        const data = await APIResponse.json();
        return data;
    } else {
        pokemonName.innerHTML = "Not a found";
        pokemonNumber.innerHTML = "X";
        input.value = '';
        pokemonImage.src = "./image/erro.png"
    }
}

const renderizarPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'carregando...';

    const data = await buscaPokemon(pokemon);

    if (data) {
        let name = data.name;
        let namePokemon = name.charAt(0).toUpperCase() + name.slice(1);
        pokemonName.innerHTML = namePokemon;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.front_default;
        //imgs animadas
        //versions['generation-v']['black-white'].animated.front_default;
        //if (pokemonImage.src == undefined){
          //  pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            
       // }
        input.value = '';

        searchPokemon = data.id;
    }
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    renderizarPokemon(input.value.toLowerCase());
});

renderizarPokemon(searchPokemon);

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--;
        renderizarPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon++;
    renderizarPokemon(searchPokemon);
});
