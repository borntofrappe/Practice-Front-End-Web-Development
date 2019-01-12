// select all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// ! initialize a variable to keep track of the last checkbox being checked/unchecked
let lastCheckbox = [...checkboxes][0];

// function displaying the number of selected items in the list
// accepting as argument a node list of items, counting the number of elements which are checked and outputting the value in the selected paragraph
function tallyItems(items) {
  const itemsTally = document.querySelector('p.items__tally');
  const { length } = items;
  const tally = [...items].reduce((acc, curr) => {
    if (curr.checked) {
      return acc + 1;
    }
    return acc;
  }, 0);
  itemsTally.textContent = `${tally}/${length}`;
}
// immediately tally the existing checkboxes
tallyItems(checkboxes);

// function called in response to a click event on the checkboxes
function handleCheck(e) {
  // first divide: is the shift key being pressed
  // YES -> consider the last checkbox as to check multiple input elements
  // NO -> nothing particular, allowing for the default action of checking 1 element
  // IN BOTH CASES -> update lastCheckbox with the current element (this) and call the function to tally the items

  if (e.shiftKey) {
    // since we want to allow to uncheck multiple items (similarly to how you check multiple items), consider the value of the element being checked
    // ! this is the value as the click is occurs, so expect this value to be true for empty element being checked
    const isChecked = this.checked;
    // create a variable to set all the checkboxes between the last checkbox and the current one to the value specified by isChecked
    let inBetween = false;

    // loop through all checkboxes
    checkboxes.forEach((checkbox) => {
      // second divide: is the element the current element or the last selected one
      // toggle the boolean to have it true between the two values
      if (checkbox === this || checkbox === lastCheckbox) {
        inBetween = !inBetween;
      }
      // third divide: is the element between the specified checkboxes
      // set the value to isChecked
      if (inBetween) {
        checkbox.checked = isChecked;
      }

      // ! third divide: is the item the last checkbo and its value is true
      // this as to handle the fringe case of un-checking multiple elements from the bottom up, as the inBetween boolean would cut off the last element
      // set the value to isChecked (which is actually and always false)
      if (checkbox === lastCheckbox && lastCheckbox.checked) {
        checkbox.checked = isChecked;
      }
    });
  }

  lastCheckbox = this;
  tallyItems(checkboxes);
}

// call the handleCheck function whenever clicking on a checkbox
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
