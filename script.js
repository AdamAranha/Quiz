// global variables
var countdownTimer
var countdownValue
var questionNum
var username
var highscore
var scoreList = []
var returnList

var questions = [
    {
        question: "What is the name of Harry Potter's owl?",
        answers: ["Hedwig", "Harold", "Henry"],
        correct: "Hedwig"
    },
    {
        question: "Which actor played the character Cedric Diggory?",
        answers: ["Daniel Radcliffe", "Elijah Wood", "Robert Pattinson"],
        correct: "Robert Pattinson"
    },
    {
        question: "Name Ron Weasley's pet rat.",
        answers: ["Squeekers", "Scabbers", "Fluffy"],
        correct: "Scabbers"
    },
    {
        question: "Name Luna Lovegood's father.",
        answers: ["Xander", "Atticus", "Xenophillius", "Constantine"],
        correct: "Xenophillius"
    },
    {
        question: "Which class has a different teacher every year?",
        answers: ["Potions", "Care of Magical Creatures", "Divination", "Defence Against the Dark Arts"],
        correct: "Defence Against the Dark Arts"
    }
]


function showNextQuestion() {
    var question = questions[questionNum]
    var questionEl = document.querySelector('#questionBox')
    // display question
    questionEl.innerHTML = `
      <div class="alert alert-secondary"><h3>${question.question}</h3>
      `
    // Creates a button for each answer
    for (var i = 0; i < question.answers.length; i++) {
        var answer = question.answers[i]
        questionEl.innerHTML += `
      <button onClick="selectAnswer(event,'${answer}')" class="btn btn-secondary btn-block">${answer}</button>
      `
    }
}

function selectAnswer(event, answer) {
    event.preventDefault()
    console.log(`question answer id: ${answer}`)
    if (answer === questions[questionNum].correct) {
        console.log(`good job! correct answer: ${answer}`)
    } else {
        console.log(`wrong answer mate, -10 points from Gryffindor`)
        timerDecreaseAndDisplay(10)
    }
    questionNum++
    // decide to show next question (if more), else end quiz
    if (questionNum < questions.length)
        showNextQuestion()
    else
        finishQuiz()
}

function timerDecreaseAndDisplay(byValue = 1) {
    // decrease by the value passed in, or if nothing, by 1
    countdownValue -= byValue
    document.querySelector('#countdown').textContent = countdownValue
    if (countdownValue < 1)
        finishQuiz()
}

function showPage(page) {
    // hide all pages
    hidePage('quizPage')
    hidePage('inputPage')
    hidePage('scorePage')
    // show selected page
    document.querySelector(`#${page}`).classList.remove('d-none')
}

function hidePage(hideThis) {
    // hides pages
    document.querySelector(`#${hideThis}`).classList.add('d-none')
}

function finishQuiz(event) {
    if (event) event.preventDefault()
    console.log(`finished`)
    // stop the countdown
    clearInterval(countdownTimer)
    // show score page
    showPage('inputPage')

    // display the name capture + leaderboard
    // ...
}


function submitScore(event) {
    event.preventDefault()
    console.log('Submit score starts here')
    //stores the scoreList in localStorage in a variable
    returnList = JSON.parse(localStorage.scoreList || '[]')
    //Sets the scorelist equal to what is in localStorage
    scoreList = returnList
    //Saves user name and score
    username = document.querySelector('#username').value
    highscore = countdownValue
    //Sets the display for the Score Page
    showPage('scorePage')
    hidePage('frame')
    //Stores username and highscore in an object
    var tempObject = {
        'userName': username,
        'highScore': highscore
    }
    //Adds object to scoreList array
    scoreList.push(tempObject)
    // Pushes updated scoreList array to localStorage
    localStorage.scoreList = JSON.stringify(scoreList)

    // For loop that prints out entire scoreList array to table on the page
    for (i = 0; i < returnList.length; i++) {
        document.querySelector('#highScores').innerHTML +=
            `
    <tr>
        <td>${returnList[i].userName}</td>
        <td>${returnList[i].highScore}</td>
    </tr>
    `


    }
}

// START: 
// - start timer
// - show questions
function startQuiz() {
    showPage('frame')
    hidePage('startButton')
    questionNum = 0
    countdownValue = 60
    countdownTimer = setInterval(timerDecreaseAndDisplay, 1000)
    // switch back to the quizPage
    showPage('quizPage')
    showNextQuestion()
}
