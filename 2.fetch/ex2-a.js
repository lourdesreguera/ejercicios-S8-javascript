const baseUrl = 'https://api.nationalize.io?name=';

const btn$$ = document.querySelector('button');
const input$$ = document.querySelector('input');

const search = () => fetch(baseUrl + input$$.value).then(res => res.json()).then(data => console.log(data));

btn$$.addEventListener('click', search);