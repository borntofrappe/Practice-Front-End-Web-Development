// target the form element and the unordered list
const form = document.querySelector('form');
const ul = document.querySelector('ul');

// function retrieving the items from local state
const retrieveItems = () => JSON.parse(localStorage.getItem('itemsLocalStoragePractice'));
// function saving items into local storage
const saveItems = items => localStorage.setItem('itemsLocalStoragePractice', JSON.stringify(items));

// function populating the list
// called as the page loads and whenever an item is added/modified
function populateList(items, list) {
  /* items is an array of objects structured as follows
    {
      text: 'Hello',
      options: ['undone', 'wip', 'done']
      value: ''
    }
    the idea is to show
      the text in a paragraph
      the options inside of div containers nesting an input and label element
    using the value to remark which input is actually checked (the one matching in value, as in value='undone'")

    ! giving a **name** property equal to the index allows each set of radio elements to exclude between the three options, but to allow different options between groups
  */

  list.innerHTML = items.map((item, index) => `
    <li>
      <p>${item.text}</p>
      ${item.options.map(option => `
        <div class="options"><input type="radio" name="option-${index}" value=${option} ${option === item.value && 'checked'} /><label class="option"></label></div>
      `).join('')}

      <button id="delete">
        <svg><use href="#delete-icon" /></svg>
      </button>
    </li>
    `);

  // save the items into local storage
  saveItems(items);
}

// immediately call the function passing the items or an empty array if no items are readily available
populateList(retrieveItems() ? retrieveItems() : [], ul);


// function adding the text input to the array and calling the function to update the UI
function handleSubmit(e) {
  // prevent the default behavior which refreshes the page
  e.preventDefault();
  // retrieve the items from local storage
  const items = retrieveItems();

  // find the text element of the nested input and its value
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


// function modifying the UI and the items when clicking on the labels or the delete button
const handleClick = (e) => {
  // if the target of the click is a button#delete, remove the list item from the unordered list
  // if the target is a label.option, modify the selected item to show the selected input
  const { target } = e;
  // retrieve the items from local storage
  let items = retrieveItems();

  if (target.getAttribute('id') === 'delete') {
    // delete the list item which is parent to the button element
    const listItem = target.parentElement;
    const listItems = ul.querySelectorAll('li');
    const listItemPosition = [...listItems].indexOf(listItem);
    items = [...items.slice(0, listItemPosition), ...items.slice(listItemPosition + 1)];
    // re-populate the list
    populateList(items, ul);
  }

  if (target.classList.contains('option')) {
    // find the input connected to the label
    const input = target.parentElement.querySelector('input');
    // find the value property of the input (undone, wip, done)
    const { value } = input;

    // target the list item connected to the input+label
    const listItem = target.parentElement.parentElement;
    const listItems = ul.querySelectorAll('li');
    const listItemPosition = [...listItems].indexOf(listItem);
    // set the value of the selected item to match the value of the input
    items[listItemPosition].value = value;
    // re-populate the list
    populateList(items, ul);
  }
};

// listen for a click event on the unorered list, at which point call a function which handles a click on the radio input/button element
ul.addEventListener('click', handleClick);
