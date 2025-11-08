/**
 * Quiz Questions Array
 */
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlink and Text Markup Language",
            "High-Tech Mobile Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which of these is used for styling a webpage?",
        options: ["JavaScript", "Python", "SQL", "CSS"],
        answer: "CSS"
    },
    {
        question: "What is the primary function of JavaScript?",
        options: [
            "Managing database transactions",
            "Defining the webpage structure",
            "Adding interactivity and dynamic content",
            "Creating server-side applications"
        ],
        answer: "Adding interactivity and dynamic content"
    },
    {
        question: "In programming, what is a boolean data type?",
        options: [
            "A list of numbers",
            "A true or false value",
            "A sequence of characters",
            "A complex object structure"
        ],
        answer: "A true or false value"
    }
];

// --- Quiz State Variables ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// --- DOM Element References ---
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const scoreDisplayEl = document.getElementById('score-display');
const resultsModal = document.getElementById('results-modal');
const finalScoreEl = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

/**
 * Loads and displays the current question.
 */
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    answered = false;
    nextButton.disabled = true;

    // ✅ Correct template literal syntax
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionTextEl.textContent = currentQuestion.question;

    // Clear previous options
    optionsContainerEl.innerHTML = '';

    // Create option buttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-btn';
        button.setAttribute('data-option', option);

        button.addEventListener('click', () => {
            selectOption(button, option, currentQuestion.answer);
        });

        optionsContainerEl.appendChild(button);
    });
}

/**
 * Handles when user selects an option.
 */
function selectOption(button, selectedOption, correctAnswer) {
    if (answered) return; // Prevent double answering

    answered = true;
    nextButton.disabled = false;

    // Disable all buttons
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    // ✅ Check correctness and update score
    if (selectedOption === correctAnswer) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        // Highlight correct one
        allButtons.forEach(btn => {
            if (btn.getAttribute('data-option') === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // ✅ Update Scoreboard Immediately
    scoreDisplayEl.textContent = `Score: ${score}`;
}

/**
 * Next Question Button
 */
function nextQuestion() {
    if (!answered) return;
    currentQuestionIndex++;
    loadQuestion();
}

/**
 * Show Results Modal
 */
function showResults() {
    resultsModal.classList.remove('hidden');
    finalScoreEl.textContent = `${score} / ${questions.length}`;
}

/**
 * Restart Quiz
 */
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    scoreDisplayEl.textContent = `Score: 0`;
    resultsModal.classList.add('hidden');
    loadQuestion();
}

// --- Event Listeners ---
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

// --- Initialize on Load ---
document.addEventListener('DOMContentLoaded', loadQuestion);
