// const numbersList = [];

// function sum(a, b){
//     return a + b;
// }

// function substract(a, b){
//     return a - b;
// }

// function father(a, b, callback){
//     numbersList.push(callback(a, b));
// }

// father(5, 4, sum);
// father(2, 1, substract);
// father(2, 9, sum);
// console.log(numbersList);


const numbersList = [];

function sum(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function father(callback){
    numbersList.push(callback());
}

father((a, b) => sum(2, 4));
father((a, b) =>substract(2, 1));
father((a, b) => sum (9, 2));
console.log(numbersList);
