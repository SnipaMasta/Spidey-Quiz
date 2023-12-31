const questions = [
    {
        question: "Who is Spider-Man behind the mask?",
        answers: [
            { text: "A. Bruce Banner", correct: false },
            { text: "B. Peter Piper", correct: false },
            { text: "C. Peter Frampton", correct: false },
            { text: "D. Peter Parker", correct: true },
        ]
    },
    {
        question: "What animal bit Spider-Man to grant him with his superpowers?",
        answers: [
            { text: "A. Cockroach", correct: false },
            { text: "B. Spider", correct: true },
            { text: "C. Mosquito", correct: false },
            { text: "D. Giraffe", correct: false },
        ]
    },
    {
        question: "Which dynamic duo created the character of Spider-Man?",
        answers: [
            { text: "A. Stanley Tucci & Steve Ditko", correct: false },
            { text: "B. Stan Lee & Steve Ditko", correct: true },
            { text: "C. Stanley Kubrick & Steve Ditko", correct: false },
            { text: "D. Stanley Yelnats & Steve Ditko", correct: false },

        ]
    },
    {
        question: "Which of these is NOT a Spider-Man villain?",
        answers: [
            { text: "A. Demon", correct: true },
            { text: "B. Sandman", correct: false },
            { text: "C. Venom", correct: false },
            { text: "D. Kraven", correct: false },
        ]
    },
    {
        question: "What year was the first issue of 'Amazing Spider-Man' released?",
        answers: [
            { text: "A. 1959", correct: false },
            { text: "B. 1966", correct: false },
            { text: "C. 1970", correct: false },
            { text: "D. 1963", correct: true },
        ]
    },
];

const quizAppear = document.querySelector(".quiz");
const spideyKnowledge = document.querySelector(".spidey-knowledge")
const startButton = document.querySelector(".start-button")
const questionBox = document.getElementById("question")

function showLeaderboard() {
    highscore.style.display= "block"
} 

function hideStart() {
    startButton.style.display = "none"
}

function hideSpidey() {
    spideyKnowledge.style.display = "none"
}

function hideQuiz() {
    quizAppear.style.display = "block"
}

var timeLeft = 30;

function updateTimer() {
    document.getElementById("timer").textContent = timeLeft + " seconds remaining";
}

function runTimer() {
    updateTimer();

    var timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            document.getElementById("timer").textContent = "You Lose! Refresh the page to try again.";
            resetState();
            questionBox.style.display = "none";
        } else {
            updateTimer();
        }
    }, 1000)
}

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");
const submitScore = document.getElementById("submit");
const username = document.getElementById("username");
const highscore = document.getElementById("highscoresList");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question!";
    showQuestion();
    timeLeft = timeLeft * 0 + 30
}

startQuiz()
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState() {
    username.style.display = "none";
    submitScore.style.display = "none";
    nextButton.style.display = "none";
    clearInterval(timeLeft);
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        timeLeft = timeLeft - 7;
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore() {
    timeLeft = timeLeft + 30;
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}
!`;
    username.style.display = "block";
    submitScore.style.display = "block";
    nextButton.innerHTML = "Try Again!";
    nextButton.style.display = "block"
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

var userName = document.getElementById("username");
var saveScoreBtn = document.getElementById("submit");
var finalScore = document.getElementById("question");
var mostRecentScore = localStorage.getItem("mostRecentScore");
var MaxHighScores  = 5;
finalScore.innerHTML = mostRecentScore;


username.addEventListener("keyup", () =>{
    console.log(userName.value);
    saveScoreBtn.disabled = !username.value;
})
saveHighScore = e => {
    e.preventDefault();

    var score = { 
        score: mostRecentScore,
        name: username.value
        
    };
    console.log(score);
    highScores.push(score);
    console.log(highScores);
    highScores.sort( (a,b) => b.score - a.score)
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
var highscoresList = document.getElementById("highscoresList");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

highScores.map(score => {
    console.log(`<li class="high-score">${score.name}-${score.score}</li>`);
})
.join("");

startQuiz();
