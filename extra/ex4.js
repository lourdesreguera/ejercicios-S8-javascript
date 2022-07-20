const containerCharacters$$ = document.querySelector('[data-function="characters"]')
containerCharacters$$.classList.add('charactersGallery');
const divPlanets$$ = document.querySelector('[data-function="planets"]');
const search$$ = document.querySelector('[data-function="search"]');
search$$.innerHTML = `
    <label for='name'>Buscador</label>
    <input type="text" placeholder="Introduce el nombre del personaje" id='name'>
    `;


const printPlanet = planets => {
    divPlanets$$.classList.add('planetGallery');
    constructPlanets(planets);       
}

const constructPlanets = planets => {
    for (const planet of planets) {
        const divPlanet$$ = document.createElement('div');
        divPlanet$$.innerHTML = `
            <img src=${planet.image}>
            <h2>${planet.name}</h2>
        `
        divPlanets$$.appendChild(divPlanet$$);

        divPlanet$$.addEventListener('click', () => showCharacter(planet))
    } 
}

fetch(`http://localhost:3000/planets`)
    .then(res => res.json())
    .then(printPlanet);


const showCharacter = (planet) => {
    containerCharacters$$.innerHTML = '';
    const printCharacter = characters => {
        const divChar$$ = document.querySelector('[data-function="characters"]');
        for (const character of characters) {
            const charContainer$$ = document.createElement('div');
            charContainer$$.innerHTML = `
                <img src=${character.avatar}>
                <h3>${character.name}</h3>
            `
            divChar$$.appendChild(charContainer$$)
        }
    }

    fetch(`http://localhost:3000/characters?idPlanet=${planet.id}`)
        .then(res => res.json())
        .then(printCharacter)
}


const filterCharacter = (event) => {
    const showFilterCharacter = characteres => {
        const found = characteres.find(character => character.name === event.target.value)
        containerCharacters$$.innerHTML = `<div>
                <img src=${found.avatar}>
                <h3>${found.name}</h3>
            </div>` 
    } 
    fetch(`http://localhost:3000/characters`)
    .then(res => res.json())
    .then(showFilterCharacter);   
}


search$$.addEventListener('input', filterCharacter)    
