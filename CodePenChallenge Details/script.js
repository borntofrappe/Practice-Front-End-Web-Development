// target all answers in the HTML document
const answers = document.querySelectorAll(".container .question .answers .answer");

// target the h1 header in which to include the results of the quiz
const headerResult = document.querySelector(".result");

// listen for a click event on each answer, at which point reveal the correct answer for the connected question
answers.forEach(answer => answer.addEventListener("click", revealAnswer));

// initialize two variables to keep track of 1) the number of answers given and 1) the number of correct answers
let counterAnswers = 0;
let counterCorrectAnswers = 0;

// declare a function to reveal the correct answer, count the number of correct answers and show a result once all questions are answered
function revealAnswer(e) {
    // consider the parent element of the clicked answer
    let parentElement = e.target.parentElement;
    // target, inside of the parent element, the correct answer
    let correctAnswer = parentElement.querySelector(".correct-answer");

    // if the correct element is not already revealed
    if(!correctAnswer.classList.contains("reveal-correct-answer")) {
        // add a class to the correct answer, visually informing the user of the right choice
        correctAnswer.classList.add("reveal-correct-answer");
        // if the chosen answer was the correct one, increment the correct answer's counter
        if(e.target == correctAnswer) {
            counterCorrectAnswers++;
        } 
        // else change the background color of the chosen answer
        else {
            e.target.classList.add("reveal-chosen-answer");
        }
    }

    // consider all answers of the chosen question and remove the event listener from all them, to avoid firing the function twice on the same question
    let answers = parentElement.querySelectorAll(".answer");
    answers.forEach(answer => {
        answer.removeEventListener("click", revealAnswer);
        answer.style.cursor = "default";
    });

    // increment the counter keeping track of the number of questions answered
    counterAnswers++;

    // once all questions are answered, call a function to display the result
    if(counterAnswers == 5) {
        displayResult(counterCorrectAnswers);
    }

}

// declare a function which takes as argument the number of correct answers and displays a message tailored to said number
function displayResult(number) {
    // initialize a string which includes a comment, tailored to how many correct answers were given
    let comment = '';
        switch(number) {
            case 5:
                comment = "😎";
                break;
            case 4:
            case 3:
                comment = "😉";
                break;
            case 2:
            case 1:
                comment = "😏";
                break;
                break;
            case 0:
                comment = "😶";
                break;
        }
        // include in the main header the result and the comment
        headerResult.textContent = `${number} Correct Answers ${comment}`;
}