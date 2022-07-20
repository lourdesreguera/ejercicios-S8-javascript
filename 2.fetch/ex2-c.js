const baseUrl = 'https://api.nationalize.io?name=';

const btn$$ = document.querySelector('button');
const input$$ = document.querySelector('input');

const search = () => {
    fetch(baseUrl + input$$.value)
        .then(res => res.json())
        .then(data => print(data))
};

const print = (data) => {
    const p$$ = document.createElement('p');
    const btn2$$ = document.createElement('button');
    btn2$$.textContent = 'Borrar';
    
    let text = `El nombre ${data.name} tiene`;

    for (const country of data.country) {
        const per = Math.floor(country.probability * 100);
        text += ` un ${per} porciento de ser de ${country.country_id}`
    }
    
    p$$.textContent = text; 

    btn2$$.addEventListener('click', () => {
        p$$.remove();
        btn2$$.remove();
    })

    document.body.appendChild(p$$);
    document.body.appendChild(btn2$$);
}


btn$$.addEventListener('click', search);