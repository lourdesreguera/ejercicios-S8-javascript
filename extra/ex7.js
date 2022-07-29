const form = document.querySelector('form');
form.addEventListener('submit', getData);

const getData = e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form).entries())
    data.defense = Number(data.defense)
    data.critic = Number(data.critic)
    data.vatality = Number(data.vitality)
    data.damage = data.damage.split(',');
}