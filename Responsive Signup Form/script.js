

// include arbitrary regex for the different input elements
const regex = {
  name: /[a-z]{4,}/i,
  email: /^[a-zA-Z]*\w{1,20}@\w{1,10}\.\w{2,3}$/,
  surname: /[a-z0-9]{5,}/i,
  password: /[a-z0-9]{7,}/i,
}

// target all the input elements, and separately the checkbox and the submit element
const inputElements = document.querySelectorAll("input");
const checkbox = document.querySelector("input[type='checkbox']");
const submit = document.querySelector("input[type='submit']");

/*
listen to the following events on the input elements 
- focus, to move the label atop the respective input element
- focusout, to revert said movement
- keyup, to keep track of the input value and match it against the regex 
- change, to handle the final condition enabling the submit button (checking if all input elements are valid )
*/
inputElements.forEach(inputElement => inputElement.addEventListener("focus", moveLabel));
inputElements.forEach(inputElement => inputElement.addEventListener("focusout", moveLabelBack));
inputElements.forEach(inputElement => inputElement.addEventListener("keyup", handleKeyUp));
inputElements.forEach(inputElement => inputElement.addEventListener("change", handleChange));

// on focus include the .focus class to the connected label, if the input element has no text in it, 
function moveLabel(e) {
  let input = e.target;
  if(input.value === "") {
    let label = input.parentElement.querySelector("label");
    if(label) {
      label.classList.add("focus");
    }
  }
}
// on focusout remove the .focus class to the connected label, if the input element has still text in it, 
function moveLabelBack(e) {
  let input = e.target;
  if(input.value === "") {
    let label = input.parentElement.querySelector("label");
    if(label) {
      label.classList.remove("focus");
    }
  }
}

// when a key is hit in the input element, retrieve the precise target alongside its name attribute and vale
function handleKeyUp(e) {
  let target = e.target;
  let name = target.name;
  let value = target.value;

  
  let label = target.parentElement.querySelector("label");
  if(regex[name].test(value)) {
    label.classList.remove("failure");
    label.classList.add("success");
  }
  else {
    if(label.classList.contains("success")) {
      label.classList.remove("success");
      submit.classList.remove("success");
      label.classList.add("failure");
    }
  }
}

function handleChange(e) {
  
  if(checkbox.checked) {
    let labels = document.querySelectorAll("label");
    let some = true;

    labels.forEach(label => {
      if(!label.classList.contains("success")) {
        some = false;
      }
    });

    if(some) {
      submit.classList.add("success");
    }
  }
  else {
    submit.classList.remove("success");    
  }
}