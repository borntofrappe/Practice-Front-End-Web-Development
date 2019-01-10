// target the form element and the unordered list
const form = document.querySelector('form');
const ul = document.querySelector('ul');

const handleSubmit = (e) => {
  // prevent the default behavior which refreshes the page
  e.preventDefault();

  // find the text element of the nested input
  const input = e.target.querySelector('input[type="text"]');
  const { value } = input;

  // if something is included in the input, display it in the unordered list
  if (value) {
    // beside the text, add an icon through the specified svg element
    const icon = '<svg><use href="#delete-icon" /></svg>';
    const li = `<li>${value}${icon}</li>`;
    ul.innerHTML += li;
    input.value = '';
  }
};

// listen for a submit event on the form, at which point call a funtion to take the text input and display it in the unordered list
form.addEventListener('submit', handleSubmit);


const handleClick = (e) => {
  // if the target of the click is a list item, remove said list item from the unordered list
  const { target } = e;
  const { tagName } = target;
  if (tagName === 'LI') {
    // remove the selected list item by selecting all list items in the unordered list, filter the selected one out and re-render the unordered list
    const listItems = ul.querySelectorAll('li');
    const listItemsFilter = [...listItems].filter(listItem => listItem !== target);
    // you can retrieve the HTML structure of the list items using the outerHTML method
    ul.innerHTML = listItemsFilter.map(listItem => listItem.outerHTML).join('');
  }
};

// listen for a click event on the unorered list, at which point call a function to remove the selected list item
ul.addEventListener('click', handleClick);
