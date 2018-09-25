/*
target the elements making up the application
- the input elements determining the value of the day, month, year
- the button to "request" an instance of the date object, based on the input value
- the heading visualizing the date object, as the button is clicked
*/
const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");
const heading = document.querySelector("h2");

// add an event listener on the button, at which point include the instance of the date object in the heading
button.addEventListener("click", timeStamp);

// create a function to include random values in the input elements for the day, month and year, as the page is loaded (and potentially every time the button is pressed. This however makes for a less intuitive experience, even if entertaining)
// immediately call the function to populate the input elements with random values
randomInputValues();

function randomInputValues() {
  let randomInt = [];
  // include three random integers within intervals chosen for the different categories (as in day: [1-31], month: [1-12], year: [1000-2050])
  for(let i = 0; i < 3; i++) {
    let min = (i===2) ? 1000 : 1;
    let max = (i===0) ? 31 : (i===1) ? 12 : 2050;
    randomInt.push(Math.floor(Math.random() * (max - min))+min);
  }
  // update the input values with the newfound, random integers
  inputs.forEach((input, i) => input.value = randomInt[i]);
}

// create a function called in response to the button element being clicked
function timeStamp(e) {
  // store in an array the input values of the three input elements
  let inputValues = [];
  inputs.forEach((input) => inputValues.push(input.value));
  // console.log(inputValues);

  // create three variables out of the three items of the array (destructuring the first, second, third item in respective variables)
  let [day, month, year] = inputValues;
  // dedcrement the month value (as the date object in the year-month-day format accepts month values ranging from 0 to 11)
  month = month - 1;
  // console.log(day, month, year);

  // create an instance of the date object
  let date = new Date(year, month, day);

  // include the instance in the heading and visualize it changing its opacity
  heading.textContent = date;
  heading.style.opacity = 0.9;

  // potentially populate the input elements with new, random values
  // ! this makes for less intuitive user interaction, motivating the commented line (but it is useful for testing different values)
  // includeRandomValues();
}