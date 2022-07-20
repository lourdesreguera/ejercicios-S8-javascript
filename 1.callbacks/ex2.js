// const userAnwsers = [];

// function confirmExample(description){
//     return confirm(description)
// }

// function promptExample(description){
//     return prompt(description)
// }

// function father(callback){
//     userAnwsers.push(callback());
// }

// father((description) => confirmExample('hola'));
// father((description) => promptExample('hola'));
// console.log(userAnwsers)

const userAnwsers = [];

function confirmExample(description){
    return confirm(description)
}

function promptExample(description){
    return prompt(description)
}

function father(description, callback){
    userAnwsers.push(callback(description));
}

father('hola', confirmExample);
father('hola', promptExample);
console.log(userAnwsers)