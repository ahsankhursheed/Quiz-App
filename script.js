// List of Questions & Answers

const questions = [
    {
        question: 'Which is the largest animal in the world?',
        answers: [
            {text: 'Shark', correct: false},
            {text: 'Blue Whale', correct: true},
            {text: 'Elephant', correct: false},
            {text: 'Giraffe', correct: false}
        ]
    },

    {
        question: 'Which is the smallest country in the world?',
        answers: [
            {text: 'Vatican City', correct: true},
            {text: 'Bhutan', correct: false},
            {text: 'Nepal', correct: false},
            {text: 'Sri Lanka', correct: false}
        ]
    },

    {
        question: 'Which is the largest desert in the world?',
        answers: [
            {text: 'Kalahari', correct: false},
            {text: 'Gobi', correct: false},
            {text: 'Sahara', correct: false},
            {text: 'Antarctica', correct: true}
        ]
    },

    {
        question: 'Which is the smallest continent in the world?',
        answers: [
            {text: 'Asia', correct: false},
            {text: 'Australia', correct: true},
            {text: 'Arctic', correct: false},
            {text: 'Africa', correct: false}
        ]
    }
]

// DOM Grabbers

const displayQuestion = document.querySelector('#question')
const answerBtn = document.querySelector('#answer-buttons') 
const nextBtn = document.querySelector('.next-btn') 
const backBtn = document.querySelector('.back-btn') 
const timer = document.querySelector('.timer')


// Variables

let currentQuestionIndex = 0;
let score = 0;
let intervalId
let startBtn
let totalTime

// Methods

function playQuiz() {
    resetState()
    currentQuestionIndex = 0;
    score= 0;
    startBtn = document.createElement('button')
    startBtn.innerHTML = 'START QUIZ'
    startBtn.classList.add('next-btn')
    displayQuestion.appendChild(startBtn)
    startBtn.addEventListener('click', function(){
        showQuestion()
        remainTime()
    })
}

playQuiz()

function remainTime(){
    timer.style.display = "block";
    totalTime = 15 // seconds
    timer.innerHTML = `<img class ='timerIcon' src="./timer.png" height="25px" width="25px"> Remaining Time: ${totalTime}<span id ='second'>s</span>`
    timer.classList.remove('timeUp')
    intervalId = setInterval(function(){
        if (totalTime > 0){
            totalTime--
            timer.innerHTML = `<img class ='timerIcon' src="./timer.png" height="25px" width="25px" > Remaining Time: ${totalTime}<span id ='second'>s</span>`
        } else {
            showScore()
            timer.innerHTML = `<img class = 'timerIcon' src="./timer.png" height="25px" width="25px"> TIMES UP!`;
            timer.classList.add('timeUp')
            timer.style.display = 'block';
        }
    },1000)
    
}

function resetState(){
    nextBtn.style.display = "none";
    backBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }
}

function showQuestion() {
    resetState()
    let questionNo = currentQuestionIndex + 1
    let currentQuestion = questions[currentQuestionIndex]
    displayQuestion.innerHTML = `${questionNo})  ${currentQuestion.question}`

    
    currentQuestion.answers.forEach(answer => {
        let addAns = document.createElement('button')
        addAns.innerHTML = answer.text
        addAns.classList.add('btn')
        answerBtn.appendChild(addAns)

        if(answer.correct) {
            addAns.dataset.correct = answer.correct
        }
        
        addAns.addEventListener('click', selectAnswer)
    }
    )
}


function replayQuiz() {
    playQuiz()
    startBtn.innerHTML = "RESTART QUIZ"    
}


function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect){
        selectedBtn.classList.add('correct');
        score++
    } else {
        selectedBtn.classList.add('incorrect')    
    }

    Array.from(answerBtn.children).forEach(btn =>{
        if(btn.dataset.correct === "true"){
            btn.classList.add('correct')
        }
        btn.disabled = true
    })  
    nextBtn.innerHTML = "NEXT"
    nextBtn.style.display = 'block';
}

function showScore(){
    resetState();
    displayQuestion.innerHTML = `You scored ${score} out of ${questions.length}! <br>`
    timer.style.display = 'block'
    timer.innerHTML = `<img class ='timerIcon' src="./timer.png" height="25px" width="25px"> Remaining Time: ${totalTime}<span id ='second'>s</span>`
    nextBtn.style.display = "block";
    nextBtn.innerHTML = "Play Again"
    clearInterval(intervalId)
    replayQuiz()
}

function handleNextBtn(){
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length){
        showQuestion()
    } else {
        showScore()
    }
}

nextBtn.addEventListener('click', ()=>{
        if (currentQuestionIndex < questions.length){
            handleNextBtn()
        } 
        else {
            replayQuiz()
        }
    })
