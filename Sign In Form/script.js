// target the form element
const form = document.querySelector('form');

// on submit prevent the default action of the browser
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // apply the class which includes the animation
  this.classList.add('error');
  // after the animation is complete remove the class itself
  // ! by using an arrow function the second _this_ refers to the exact element represented by the first _this_
  this.addEventListener('animationend', () => this.classList.remove('error'));
});