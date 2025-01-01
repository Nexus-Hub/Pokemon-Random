const pokeAPIURL = 'https://pokeapi.co/api/v2/pokemon'

//Function that generates the random number
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Function that searches for the pokémon image and inserts it into the HTML
async function insertIMG(img1, img2, pokeName) {
    const divIMG = document.getElementById("img")
    divIMG.innerHTML = `<img class="imgPoke" src="${img1}" alt="${pokeName}" onmouseover="hover(this, '${img2}');" onmouseout="hover(this, '${img1}')"/>`
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
    const divNumero = document.getElementById("num");
    divNumero.innerText = `PKMN #${numPokedex}`
}

//Function that inserts the name into the HTML
function insertName(pokeName) {
    const divNombre = document.getElementById("name");
    divNombre.innerText = pokeName
}

//Feature that changes the image to pixel when hovering over it
async function hover(img, src) {
    img.src = src
}

//Function that returns the random pokemon based on the second argument (see generations @ https://www.serebii.net/pokemon/)
generatePokemon(randomNumber(1, 251)).then((pokemon) => {
    insertName(pokemon.name)
    insertIMG(pokemon.sprites.other.dream_world.front_default, pokemon.sprites.front_default, pokemon.name);
    insertNumber(pokemon.id);
});


