fetch('https://api.agify.io?name=michael')
    .then(res => res.json())
    .then(data => console.log(data));