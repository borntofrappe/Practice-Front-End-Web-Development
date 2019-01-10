// target the form element and the unordered list
const form = document.querySelector('form');
const ul = document.querySelector('ul');
let initialItems = JSON.parse(localStorage.getItem('items')) || ['item'];

function populateList(items, list) {
  list.innerHTML = items.map(item => `<li>${item}<svg><use href="#delete-icon"/></svg></li>`);
  localStorage.setItem('items', JSON.stringify(items));
}

populateList(initialItems, ul);

function handleSubmit(e) {
  // prevent the default behavior which refreshes the page
  e.preventDefault();

  // find the text element of the nested input
  const input = e.target.querySelector('input[type="text"]');
  const { value } = input;

  // if something is included in the input, add the text to the items array and call the populate method
  if (value) {
    initialItems.push(value);
    populateList(initialItems, ul);
  }
  // applied on a form, the reset() method allows to clear any input element
  // ! in order to use this and have it refer to the element, you need a non-arrow function
  this.reset();
}

// listen for a submit event on the form, at which point call a funtion to take the text input and display it in the unordered list
form.addEventListener('submit', handleSubmit);


const handleClick = (e) => {
  // if the target of the click is a list item, remove said list item from the unordered list
  const { target } = e;
  const { tagName } = target;

  if (tagName === 'LI') {
    // remove the list item according to its position
    const listItems = ul.querySelectorAll('li');
    const listItemPosition = [...listItems].indexOf(target);
    initialItems = [...initialItems.slice(0, listItemPosition), ...initialItems.slice(listItemPosition + 1)];
    populateList(initialItems, ul);
  }
};

// listen for a click event on the unorered list, at which point call a function to remove the selected list item
ul.addEventListener('click', handleClick);
