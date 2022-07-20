const printData = (notes) => {
    notes.sort(function (a, b) {
        if (a.date < b.date) {
            return -1
        } else if (a.date < b.date) {
            return 1
        } else {
            return 0
        }
    })
    construir(notes);
}

const construir = (notes) => {
    for (const note of notes) {
        const div$$ = document.createElement('div');
        const btn$$ = document.createElement('button');

        btn$$.textContent = 'Remove';
        btn$$.addEventListener('click', () => div$$.remove());
        div$$.innerHTML = `
            <h3>${note.title}</h3>
            <h5>${note.date}</h5>
            <p>${note.description}</p>
        `;

        div$$.appendChild(btn$$)
        document.body.appendChild(div$$);
    }
}

fetch(`http://localhost:3000/diary`)
    .then(res => res.json())
    .then(printData)