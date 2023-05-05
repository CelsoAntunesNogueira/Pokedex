const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__type');

const fomr = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;



const fetchPokemon = async (pokemon) => { /* Precisou colocar o async pois o comando await só funciona com função asincrona  */

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}
const renderPokemon = async (pokemon) => { /*Chegando aqui pega as informações do site para colocar na pokedex */

    pokemonName.innerHTML = 'Loading .. ';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; /*caminho dos gifs dos pokemon */
        input.value = '';
        searchPokemon = data.id;

        /*Tipos do Pokemon */
        const pokemonType = data.types.map(type => type.type.name);        
        const Litipos = document.querySelector('#tipos');

        pokemonType.forEach(tipo =>{
            const itLista= document.createElement('li');
            itLista.textContent = tipo;
            Litipos.appendChild(itLista);
            
        });

        

            const cortipo = ["normal","grass","poison","fire","rock","ice","eletric","water","ghost","ground","flying","bug","dragon","fairy","steel","psychic","dark","fighting"]
            const colors = {
                normal: "#A8A878",
                fire: "#F08030",
                water: "#6890F0",
                electric: "#F8D030",
                grass: "#78C850",
                ice: "#98D8D8",
                fighting: "#C03028",
                poison: "#A040A0",
                ground: "#E0C068",
                flying: "#A890F0",
                psychic: "#F85888",
                bug: "#A8B820",
                rock: "#B8A038",
                ghost: "#705898",
                dragon: "#7038F8",
                dark: "#705848",
                steel: "#B8B8D0",
                fairy: "#EE99AC"};

       

        const pokemonTypes = data.types.map(type => type.type.name);   /*Aqui extraí todos os tipos de pokemon da api*/
        const mudacor = document.querySelectorAll('#tipos li'); /*aqui selecionou geral da */
        
        mudacor.forEach((li, index) => {  /*Nessa parte faz uma varredura e muda a cor de fundo de cada tipo  */
          const type = pokemonTypes[index];
          li.textContent = type;
          li.style.backgroundColor = colors[type];
        });
        
                         
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found!';
        pokemonNumber.innerHTML = '';
    }
}
fomr.addEventListener('submit', (Event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());/* Deixando tudo minusculo pois o site da erro com maiusculo*/
    var tipos = document.getElementById("tipos");
    tipos.innerHTML = "";
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        var tipos = document.getElementById("tipos");
        tipos.innerHTML = " ";
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    var tipos = document.getElementById("tipos");
    tipos.innerHTML = "";
});




renderPokemon(searchPokemon);


