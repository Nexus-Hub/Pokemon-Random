//https://www.serebii.net/pokemon/ Additional pokedex used to learn about pokemon.

navigator.geolocation.getCurrentPosition(weatherAPI);
const pokeAPIURL = 'https://pokeapi.co/api/v2/pokemon'

//Function that generates the random number used to render the pokemon
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Function that renders an icon and user temperature in the HTML
function weatherAPI(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    const key = "074bf85e3ae4d5af363f75b0eea1db6b";
    let weatherIcon = document.getElementById("weatherIcon");
    let weatherTemp = document.getElementById("weatherTemp");
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            let icon = data.weather[0].icon
            let iconURL = `http://openweathermap.org/img/w/${icon}.png`
            weatherIcon.setAttribute('src', iconURL)
            //Text showing degrees in °C
            weatherTemp.innerText = `IRL Temp: ${data.main.temp} °C`
        });
}

//Function that renders the type of pokemon in the HTML
 function insertPokemonTypes(type1, type2){
if (type2 == null) {
    const divPokemonTemp = document.getElementById("pokemon-type")
    divPokemonTemp.innerHTML = `The type of your pokemon is ${type1}.`
} else {
    const divPokemonTemp = document.getElementById("pokemon-type")
    divPokemonTemp.innerHTML = `The type of your pokemon is ${type1} and ${type2}.`
}
        
}        

//Function that searches for the pokémon image and inserts it into the HTML
 function insertIMG(sprite1, sprite2) {
    const divIMG = document.getElementById("pokemon-sprite")
    divIMG.innerHTML = `<img class="imgPoke" src="${sprite1}" onmouseover="hover(this, '${sprite2}');" onmouseout="hover(this, '${sprite1}')"/>`
}

//Function that brings the data from the pokemon api
async function generatePokemon(numPokedex) {
    try {
        const response = await fetch(`${pokeAPIURL}/${numPokedex}/`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

//Function that inserts the number into the HTML
function insertNumber(numPokedex) {
    const divNumero = document.getElementById("pokemon-number");
    divNumero.innerText = `PKMN #${numPokedex}`
}

//Function that inserts the name into the HTML
function insertName(pokeName) {
    const divNombre = document.getElementById("pokemon-name");
    divNombre.innerText = pokeName
}

//Function that changes the image to shiny when hovering the pokemon with the mouse
 function hover(sprite1, sprite2) {
    sprite1.src = sprite2
}

//Function that uses the HTML button to generate a new random pokemon
document.getElementById('newPokemonBtn').addEventListener('click', generateNewPokemon);
async function generateNewPokemon(){
    generatePokemon(randomNumber(1, 251)).then((pokemon) => {

        console.log(pokemon)

        insertName(pokemon.name);
        insertIMG(pokemon.sprites.front_default, pokemon.sprites.front_shiny);
        insertNumber(pokemon.id);

        if (pokemon.types.length <= 1) {
            console.log("Tipo 2 no existe")
            console.log(pokemon.types[0].type.name, null)
            insertPokemonTypes(pokemon.types[0].type.name, null)
        } else {
            console.log("Tipo 1 y Tipo 2 existen")
            console.log(pokemon.types[0].type.name, pokemon.types[1].type.name)
            insertPokemonTypes(pokemon.types[0].type.name, pokemon.types[1].type.name)
        }

        }
    );
}

//Function that generates the random pokemon when the page loads for the first time
generatePokemon(randomNumber(1, 251)).then((pokemon) => {

    console.log(pokemon)

    insertName(pokemon.name)
    insertIMG(pokemon.sprites.front_default, pokemon.sprites.front_shiny);
    insertNumber(pokemon.id);
    
    if (pokemon.types.length <= 1) {
        console.log("Tipo 2 no existe")
        console.log(pokemon.types[0].type.name, null)
        insertPokemonTypes(pokemon.types[0].type.name, null)
    } else {
        console.log("Tipo 1 y Tipo 2 existen")
        console.log(pokemon.types[0].type.name, pokemon.types[1].type.name)
        insertPokemonTypes(pokemon.types[0].type.name, pokemon.types[1].type.name)
    }

    }
);

