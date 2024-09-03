const questions = [
    {
        question: "Which Infinity Stone first made an appearance in the MCU?",
        answers: [
            {text:"Space Stone", correct: true},
            {text:"Reality Stone", correct: false},
            {text:"Power Stone", correct: false},
            {text:"Mind Stone", correct: false}
        ]
    },

    {
        question: "How many phases does the MCU have?",
        answers: [
            {text:"3", correct: false},
            {text:"4", correct: false},
            {text:"5", correct: true},
            {text:"6", correct: false}
        ]
    },

    {
        question: "Who is the first Avenger?",
        answers: [
            {text:"Thor", correct: false},
            {text:"Hulk", correct: false},
            {text:"Iron Man", correct: false},
            {text:"Captain America", correct: true}
        ]
    },

    {
        question: "How did Dr. Banner originally become the Hulk?",
        answers: [
            {text:"An X-Ray", correct: false},
            {text:"UV radiation", correct: false},
            {text:"He got angry", correct: false},
            {text:"Gamma Radiation", correct: true}
        ]
    },

    {
        question: "Where was the Black Widow raised?",
        answers: [
            {text:"The Hive", correct: false},
            {text:"The Red Room", correct: true},
            {text:"A suburban home", correct: false},
            {text:"The Web", correct: false}
        ]
    },

    {
        question: "What is the name of Thor's hammer?",
        answers: [
            {text:"Mjölnir", correct: true},
            {text:"Stormbreaker", correct: false},
            {text:"Jarnbjorn", correct: false},
            {text:"Bjorn", correct: false}
        ]
    },

    {
        question: "What six members made up the Avengers in the original film?",
        answers: [
            {text:"Thor, Captain America, Spider-Man, Ant-Man, Hawkeye, Iron Man", correct: false},
            {text:"Black Widow, Quicksilver, Scarlet Witch, Hulk, Thor, Ant-Man", correct: false},
            {text:"Hulk, Thor, Iron Man, Captain America, Black Widow, Hawkeye", correct: true},
            {text:"Iron Man, Hawkeye, Thor, Black Widow, Scarlet Witch, Captain America", correct: false}
        ]
    },

    {
        question: "What name does Thor use to access the ship in Thor: Ragnarok?",
        answers: [
            {text:"Strongest Avenger", correct: false},
            {text:"Pointbreak", correct: true},
            {text:"Thor, son of Odin", correct: false},
            {text:"God of Thunder", correct: false}
        ]
    },

    {
        question: "What country are the Maximoff twins from?",
        answers: [
            {text:"Wakanda", correct: false},
            {text:"The Unites States", correct: false},
            {text:"Sokovia", correct: true},
            {text:"New Asgard", correct: false}
        ]
    },

    {
        question: "What does Tony Stark have in his chest and why?",
        answers: [
            {text:"An arc reactor to keep toxic shrapnel from reaching his heart", correct: true},
            {text:"A glowing light because it looks cool", correct: false},
            {text:"An energy generator for the Iron Man suits", correct: false},
            {text:"An arc reactor to power the Iron Man suits", correct: false}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach( button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${(score/questions.length)*100}%! That's ${score} out of ${questions.length}.`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
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

startQuiz();