const startBtn$$ = document.querySelector('[data-function="start-game"]');
const numInput$$ = document.querySelector('[data-function="questions-number"]');
const gameBoard$$ = document.querySelector('[data-function="gameboard"]');
const checkGame$$ = document.querySelector('[data-function="check-game"]');
let numCorrects = 0;
let numNotCorrects = 0;

const newGame = () => {
    gameBoard$$.innerHTML = '';
    numCorrects = 0;
    numNotCorrects = 0;
    document.body.lastChild.remove();
}

const startGame = () => {
    newGame();

    fetch (`https://opentdb.com/api.php?amount=${numInput$$.value}`)
        .then (res => res.json())
        .then (questions => printQuestions(questions.results));
}

const printQuestions = questions => {

    for (const question of questions) {
        const questionContainer$$ = document.createElement('div');
        questionContainer$$.classList.add('questionContainer');
        questionContainer$$.innerHTML = `
            <h2>${question.question}</h2>
        `
        const answerCorrect$$ = document.createElement('p');
        answerCorrect$$.classList.add('answer');
        answerCorrect$$.innerHTML = question.correct_answer;


        for (const answer of question.incorrect_answers) {
            const answerNotCorrect$$ = document.createElement('p');
            answerNotCorrect$$.classList.add('answer');
            answerNotCorrect$$.innerHTML = answer;
            questionContainer$$.appendChild(answerNotCorrect$$);
            answerNotCorrect$$.addEventListener('click', () => checkAnswer(event, answerCorrect$$))
        }

        questionContainer$$.appendChild(answerCorrect$$)
        gameBoard$$.appendChild(questionContainer$$);

        answerCorrect$$.addEventListener('click', () => checkAnswer(event, answerCorrect$$));
        
    }    
}


const checkAnswer = (event, answerCorrect$$) => {
    if(event.target === answerCorrect$$) {
        numCorrects++
    }else {
        numNotCorrects++
    }
    
}

const showResult = (numCorrects, numNotCorrects) => {
    const resultP$$ = document.createElement('h3');
    resultP$$.classList.add('result');
    resultP$$.innerHTML = `Respuestas correctas: ${numCorrects}. Respuestas incorrectas: ${numNotCorrects}`
    document.body.appendChild(resultP$$)
}


checkGame$$.addEventListener('click', () => showResult(numCorrects, numNotCorrects));
startBtn$$.addEventListener('click', startGame);

