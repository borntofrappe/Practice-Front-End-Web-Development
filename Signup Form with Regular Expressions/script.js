// remove default behavior of the button, as the page ought to be purely aesthetical and focused on regex, not on submit functionalities
const button = document.querySelector("button");
button.addEventListener("click", (e) => e.preventDefault());


// define in an object the regular expressions for the different fields
const patterns = {
  // username: between 4 and 20 letters followed by 2 numbers
  username: /^[a-zA-Z]{4,20}[0-9]{2}$/,
  // email: beginning with a letter, following with between 1 and 20 characters before the @ sign, following with between 1 and 10 characters before the . sign and ending with two or three letters
  email: /^[a-zA-Z]\w{1,20}@\w{1,10}\.[a-zA-Z]{2,3}$/,
  // password: between 5 and 20 characters, pound sign and hyphen included
  password: /^[\w#-]{5,20}$/
}

// target all inputs
const inputs = document.querySelectorAll("input");

// listen a keyup event on the input elements, at which point trigger the regex function
inputs.forEach((input) => {
  input.addEventListener("keyup", checkRegularExpression);
});

// pass the event as argument to access information regarding the element and its value
function checkRegularExpression(event) {
  // event.target.value regards the content of the input element
  // event.target.id concerns the identifier of the element; it can be used to target the precise input to style
  let targetValue = event.target.value;
  let targetId = event.target.id;

  // test if the value in the input matches the regular expression for the respective input; store the Boolean in a variable
  let checkup = patterns[targetId].test(targetValue);
  
  // depending on the Boolean, add or remove the class of valid to the respective input element (just a green border)
  if(checkup) {
    let element = document.querySelector("#" + targetId);
    element.classList.add("valid");
  }
  else {
    let element = document.querySelector("#" + targetId);
    element.classList.remove("valid");
  }
}


  
