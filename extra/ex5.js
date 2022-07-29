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
        printAnswers(question, questionContainer$$);    
    }    
}

const printAnswers = (question, questionContainer$$) => {
    const answerArr = [question.correct_answer];
    
    for (const answer of question.incorrect_answers) {
        answerArr.push(answer)
    }

    shuffleArray(answerArr);

    for(let answer of answerArr) {
        const answer$$ = document.createElement('p');
        answer$$.innerHTML = answer;
        answer$$.classList.add('answer')
        questionContainer$$.appendChild(answer$$);
        answer$$.addEventListener('click', () => checkAnswer(event, question));
    }

    gameBoard$$.appendChild(questionContainer$$);
}

const shuffleArray = answerArr => {
    answerArr.sort(()=> Math.random() - 0.5);
}

const checkAnswer = (event, question) => {
    if(event.target.outerText === question.correct_answer) {
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

