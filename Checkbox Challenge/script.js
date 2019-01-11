// initialize the section.checkboxes with a few items
let values = [
  {
    value: 'apples',
    isChecked: false
  },
  {
    value: 'oranges',
    isChecked: false
  },
  {
    value: 'peaches',
    isChecked: false
  },
  {
    value: 'apricots',
    isChecked: false
  },
  {
    value: 'nectarines',
    isChecked: false
  },
];
const formCheck = document.querySelector('form.checkboxes');
const tallyItems = document.querySelector('p.tally__items');

/* function receiving as input an array of items and rendering the following structure in a specified container
<div class="checkbox">
  <input type="checkbox" name="shopping" value="INSERT_VALUE_HERE" checked="INSERT_OTHER_VALUE_HERE" />
  <label for="shopping">INSERT_VALUE_HERE</label>
</div>

! by default use the formCheck

! in addition to populating the list, update the tally with the number of all checkboxes which are checked
*/

function populateCheckboxes(items, container = formCheck) {
  container.innerHTML = items.map(item => `
  <div class="checkbox">
    <input type="checkbox" name="shopping" value="${item.value}" ${item.isChecked && 'checked'} />
    <label for="shopping">${item.value}</label>
  </div>
  `).join('');

  const { length } = items;
  // tally refers to the number of items with a boolean set to true
  // use a reduce to quantify this value
  const tally = items.reduce((acc, curr) => (curr.isChecked ? acc + 1 : acc), 0);
  tallyItems.textContent = `${tally}/${length}`;
}

// immediately populate the container with the specified arbitrary values
populateCheckboxes(values, formCheck);


// FEATURE 1: possibility to add items
const formAdd = document.querySelector('form.add');

// function called when submitting the simple form
// prevent the default behavior, add existing text to the items array and populate the container
// ! as per FEATURE 3 which follows, the function is also called when submitting text in the remove field
// differentiate between the functionalities by determining the class of the form
function handleSubmit(e) {
  e.preventDefault();

  const { target } = e;
  const { value } = target.querySelector('input');

  if (!value) {
    // pre-emptively close the function if the value is an emptu string
    e.target.querySelector('input').setAttribute('placeholder', 'Write something first :P');
  } else {
    // otherwise check the class list to either add or remove the item identified by the value
    if (target.classList.contains('add')) {
      values.push(({
        value: value.toLowerCase(),
        isChecked: false
      }));
      e.target.querySelector('input').setAttribute('placeholder', 'Avocadoes');
    } else {
      // filter out the elements matching the value
      // this allows to erase more values with the same text
      values = values.filter(singleValue => singleValue.value !== value);
    }
    populateCheckboxes(values);
  }
  this.reset();
}

formAdd.addEventListener('submit', handleSubmit);

// FEATURE 2: possobility to check multiple checkboxes
// initialize two variables to
// 1. keep track of the index of the last checked checkbox
// ! set it by default to 0, to check from the top
let lastCheckbox = 0;
// 1. keep track of whether or not the shift key is being pressed
let isShift = false;
const shift = 16;

// first, for the boolean, toggle it according to the key being pressed
window.addEventListener('keydown', e => (e.keyCode === shift ? isShift = true : isShift = false));
window.addEventListener('keyup', () => isShift = false);

// the idea is to attach an event listener to all checkboxes and depending on the booleans value check as many as there are between the index of the last checked checkbox and the current one
// ! as checkboxes might be added later attach the event listener to the parent form element

function handleInput(e) {
  e.preventDefault();
  // find all input elements of type checkbox
  const { target } = e;
  const checkboxes = formCheck.querySelectorAll('input[type="checkbox"]');
  const index = [...checkboxes].indexOf(target);

  // find the value of the current checkbox, as to give its opposite to the checkbox(es)
  const isChecked = !values[index].isChecked;

  if (isShift) {
    // if shift is being being pressed, refer to the lastCheckbox value, check all the checkboxes between the two values
    const [min, max] = [index, lastCheckbox].sort((a, b) => (a > b ? 1 : -1));
    values.forEach((value, i) => {
      if (i >= min && i <= max) {
        value.isChecked = isChecked;
      }
    });
  } else {
    // if shift is not being pressed, simply update the value of the specified element
    values[index].isChecked = isChecked;
  }
  // update the last checkbox with the new one
  lastCheckbox = index;
  // repopulate the form
  populateCheckboxes(values);
}

formCheck.addEventListener('input', handleInput);

// FEATURE 3 (afterthought): possibility to remove an item by writing its value
const formRemove = document.querySelector('form.remove');
// the feature is implemented always through the handle submit, by first evaluating the class of the form
formRemove.addEventListener('submit', handleSubmit);
