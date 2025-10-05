const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        answers: ["Java", "C", "Python", "JavaScript"],
        correct: "JavaScript"
    },
    {
        question: "Who is the founder of Microsoft?",
        answers: ["Elon Musk", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
        correct: "Bill Gates"
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const timerElement = document.getElementById("time-left");
const scoreElement = document.getElementById("score-value");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 30;
    nextButton.style.display = "none";
    restartButton.style.display = "none";
    showQuestion();
    startTimer();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer, currentQuestion.correct));
        answerButtons.appendChild(button);
    });
}
function resetState() {
    answerButtons.innerHTML = "";
}

function selectAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        scoreElement.innerText = score;
    }
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    questionElement.innerText = 'Quiz Finished! Your score: ${score}/${questions.length}';
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";
    restartButton.style.display = "block";
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
