// target the form element and the unordered list
const form = document.querySelector('form');
const ul = document.querySelector('ul');


function retrieveItems() {
  const items = JSON.parse(localStorage.getItem('items'));
  return items || [];
}
function populateList(items, list) {
  // {
  //   text: 'Hello',
  //   options: ['undone', 'wip', 'done']
  //   value: ''
  // }

  if (items) {
    list.innerHTML = items.map((item, index) => `
    <li>
      <p>${item.text}</p>
      ${item.options.map(option => `
        <div class="options"><input type="radio" name="option-${index}" value=${option} ${option === item.value && 'checked'} /><label class="option"></label></div>
      `)}

      <button id="delete">
        <svg><use href="#delete-icon" /></svg>
      </button>
    </li>
    `);
    localStorage.setItem('items', JSON.stringify(items));
  }
}

populateList(retrieveItems(), ul);


// function adding the text input to the array and calling the function to update the UI
function handleSubmit(e) {
  // prevent the default behavior which refreshes the page
  e.preventDefault();
  const items = retrieveItems();

  // find the text element of the nested input
  const input = e.target.querySelector('input[type="text"]');
  const { value: text } = input;

  // if something is included in the input, add the text to the items array and call the populate method
  if (text) {
    items.push({
      text,
      options: ['undone', 'wip', 'done'],
      value: ''
    });
    populateList(items, ul);
  }
  // applied on a form, the reset() method allows to clear any input element
  // ! in order to use this and have it refer to the element, you need a non-arrow function
  this.reset();
}

// listen for a submit event on the form, at which point call a funtion to take the text input and display it in the unordered list
form.addEventListener('submit', handleSubmit);


const handleClick = (e) => {
  // if the target of the click is a button#delete, remove the list item from the unordered list
  // if the target is a label.option, check the nested input element
  const { target } = e;
  let items = retrieveItems();

  if (target.getAttribute('id') === 'delete') {
    const listItem = target.parentElement;
    const listItems = ul.querySelectorAll('li');
    const listItemPosition = [...listItems].indexOf(listItem);
    items = [...items.slice(0, listItemPosition), ...items.slice(listItemPosition + 1)];
    populateList(items, ul);
  }

  if (target.classList.contains('option')) {
    const input = target.parentElement.querySelector('input');
    const isChecked = input.checked;
    input.checked = !isChecked;
    const { value } = input;

    const listItem = target.parentElement.parentElement;
    const listItems = ul.querySelectorAll('li');
    const listItemPosition = [...listItems].indexOf(listItem);
    items[listItemPosition].value = value;
    populateList(items, ul);
  }
};

// listen for a click event on the unorered list, at which point call a function which handles a click on the radio input/button element
ul.addEventListener('click', handleClick);
