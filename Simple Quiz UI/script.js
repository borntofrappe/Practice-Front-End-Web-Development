// target any list item and the container nesting the "answer"
const answers = document.querySelectorAll('.question--answers li');
const answerContainer = document.querySelector('.app__answer');

// create a function to show the answer container and detail the pressed value in the strong element
function showAnswer(e) {
  const { target } = e;

  answerContainer.querySelector('strong').textContent = target.textContent;
  answerContainer.classList.remove('hidden');
}

// on click remove the class .hidden from the container
// moreover select the <strong> element and include the value of the clicked item
answers.forEach(answer => answer.addEventListener('click', showAnswer));
