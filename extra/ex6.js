const charactersContainer$$ = document.querySelector('[data-function="characters"]');
const arenaContainer$$ = document.querySelector('[data-function="arena"]');
const newGameBtn$$ = document.querySelector('[data-function="new-game"]');
let chosenChar = [];

const callApi = async () => {
    const characters = await fetch(`http://localhost:3000/characters`);
    const charactersJson = await characters.json();
    printCharacters(charactersJson);
}
callApi();

const printCharacters = characters => {
    for (const character of characters) {
        const div$$ = document.createElement('div');
        const img$$ = document.createElement('img');
        const h2$$ = document.createElement('h2');
        const btn$$ = document.createElement('button');
        img$$.setAttribute('src', character.avatar);
        h2$$.textContent = character.name;
        btn$$.textContent = 'Delete';
        div$$.appendChild(img$$);
        div$$.appendChild(h2$$);
        div$$.appendChild(btn$$);
        charactersContainer$$.appendChild(div$$);
        btn$$.addEventListener('click', (e) => {deleteChar(character)});
        img$$.addEventListener('click', () => chooseChar(character, characters))
    }
}

const chooseChar = (character, characters) => {
    chosenChar.push(character.name)
    if (chosenChar.length === 2) {
        const fightBtn$$ = document.createElement('button');
        fightBtn$$.textContent = 'Fight!';
        document.body.insertBefore(fightBtn$$, arenaContainer$$);
        fightBtn$$.addEventListener('click', () => fight(characters));
        fightBtn$$.classList.add('btn-fight')
    }
}

let result = 0;

const fight = (characters) => {
    const firstChar = characters.find(character => character.name.includes(chosenChar[0]));
    const secChar = characters.find(character => character.name.includes(chosenChar[1]));
    while (firstChar.vitality > 0 || secChar.vitality > 0) {
        rollDice(firstChar);
        result -= secChar.defense;

        const newResult$$ = document.createElement('p');
        newResult$$.innerHTML = `El daño real que hace ${firstChar.name} es ahora ${result}`;
        arenaContainer$$.appendChild(newResult$$);

        secChar.vitality -= result;
        
        const p$$ = document.createElement('p');
        arenaContainer$$.appendChild(p$$);
        p$$.innerHTML = `La vitalidad de ${secChar.name} es ahora ${secChar.vitality}`

        if (secChar.vitality <= 0) {
            const win$$ = document.createElement('h3');
            win$$.innerHTML = `${secChar.name} is dead`;
            arenaContainer$$.appendChild(win$$)
            break;
        }
        result= 0;
        rollDice(secChar);
        result -= firstChar.defense;

        const newResult2$$ = document.createElement('p');
        newResult2$$.innerHTML = `El daño real que hace ${secChar.name} es ahora ${result}`;
        arenaContainer$$.appendChild(newResult2$$)
        firstChar.vitality -= result;

        const p2$$ = document.createElement('p');
        arenaContainer$$.appendChild(p2$$);
        p2$$.innerHTML = `La vitalidad de ${firstChar.name} es ahora ${firstChar.vitality}`

        if (firstChar.vitality <= 0) {
            const win$$ = document.createElement('h3');
            win$$.innerHTML = `${firstChar.name} is dead`;
            arenaContainer$$.appendChild(win$$)
            break;
        }
        result = 0;
    }
}

const rollDice = (firstChar) => {
    for (const damage of firstChar.damage) {
        let indexFirst = damage.indexOf('d');
        let firstNum = damage.substring(0, indexFirst);
        let num = damage.substring(indexFirst + 1);
       
        const p1$$ = document.createElement('p');
        arenaContainer$$.appendChild(p1$$);
        p1$$.innerHTML = `${firstChar.name} lanza un dado de ${num} caras ${firstNum} veces`;
        
        for (let i = 0; i < firstNum; i++) {
            let pain = Math.floor(Math.random() * num) + 1; 
            if (pain === firstChar.critic) {
                pain *= 2;

                const p2$$ = document.createElement('p');
                arenaContainer$$.appendChild(p2$$);
                p2$$.innerHTML = `${firstChar.name} ha duplicado su daño`
            }
            result += pain;

            const p3$$ = document.createElement('p');
            arenaContainer$$.appendChild(p3$$);
            p3$$.innerHTML = `${firstChar.name} hace un daño total de ${result}`    
        }
    }
}

const form = document.querySelector('form');


const newGame = () => {
    charactersContainer$$.innerHTML = '';
    arenaContainer$$.innerHTML = '';
    result = 0;
    chosenChar = [];
    callApi();
}

newGameBtn$$.addEventListener('click', newGame)

const getData = e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form).entries())
    data.defense = Number(data.defense)
    data.critic = Number(data.critic)
    data.vitality = Number(data.vitality)
    data.damage = data.damage.split(',');
    console.log(data);

    fetch('http://localhost:3000/characters', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => console.log(res));
}
form.addEventListener('submit', getData);

const deleteChar = (character) => {
    fetch(`http://localhost:3000/characters/${character.id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res));
}