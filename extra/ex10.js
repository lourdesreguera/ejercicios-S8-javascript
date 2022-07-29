const getCharacters = async () => {
    const characters = await fetch(`http://localhost:3000/characters?_page=1&_limit=5`);
    const charactersJson = await characters.json();
    printCharacters(charactersJson);
}
getCharacters();

let i = 1;

const printCharacters = charactersJson => {
    i++;
    for (const character of charactersJson) {
        const characterContainer$$ = document.createElement('div');
        characterContainer$$.innerHTML = `
            <img src=${character.image}>
            <h3>${character.name}</h3>
        `
        document.body.appendChild(characterContainer$$)
    }
    const button$$ = document.createElement('button');
    button$$.innerHTML = 'Cargar más'; 
    document.body.appendChild(button$$);
    button$$.addEventListener('click', () => loadMore(i));

    if (i === 5) {
        button$$.remove()   
    } 
}

const loadMore = (i) => {
    const getNewCharacters = async () => {
        const newcharacters = await fetch(`http://localhost:3000/characters?_page=${i}&_limit=5`);
        const newcharactersJson = await newcharacters.json();
        printCharacters(newcharactersJson);
    }
    getNewCharacters();      
}
