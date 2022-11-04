const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')


let currentQuestion = {}
let acceptingAnswers = true
let score= 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is JSON?',
        choice1: 'A Software',
        choice2: 'A guy named Jason',
        choice3: 'JavaScript Object Notation',
        choice4: 'A third party API',
        answer: 3,
    },

    {
        question: 'What is a unix time-stamp?',
        choice1: 'A percentage of local data-space',
        choice2: 'A DOM function',
        choice3: 'A Git-hub repository',
        choice4: 'The # of seconds since January 1st, 1990',
        answer: 4,
    },
    {
        question: 'What is a Web API?',
        choice1: 'A Application Programming Interface',
        choice2: 'A Third Party API',
        choice3: 'A Website cotaining a list of APIs',
        choice4: 'A Javascript function',
        answer: 1,
    },
    {
        question: 'Which option below is not an Eventlistener?',
        choice1: 'Blur',
        choice2: 'Load',
        choice3: 'Dutchbros Coffee',
        choice4: 'Focus',
        answer: 3,
    },
    
    {
        question: 'What does prevent defualt browser mean?',
        choice1: 'Prevents CSS from loading on your browser',
        choice2: 'Prevents propagation',
        choice3: 'Prevents the webpage from reloading when',
        choice4: 'Prevents from changing the Window loaction when pressing on a link',
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
 
    })

    availableQuestions.splice(questionsIndex, 1 )

    acceptingAnswers = true
}


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)


    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score

}

startGame()
