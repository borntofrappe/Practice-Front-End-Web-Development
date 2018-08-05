// target the element in which to display the key pressed and the buttons responsible for the key press itself
const display = document.querySelector(".app .app__support .support--display");
const buttons = document.querySelectorAll(".app .app__main .main--button");

// loop through the nodelist of buttons and add an event listener for a click event
buttons.forEach(button => button.addEventListener("click", handleClick));


/* create a function which takes as argument the click event
BEHAVIOR: 
  - retrieve the data attribute of each button 
  - display the value in the data attribute in the display element, through a separate function
*/
function handleClick(e) {
  let dataButton = e.target.getAttribute("data-button");
  displayValue(dataButton);
}


// listen for a keydown event on the entire window
window.addEventListener("keydown", handleKey);

/* create a function which takes as argument the keydown event
BEHAVIOR:
  - retrieve the keyCode of the event, as the letter matching the ASCII code (in lower case)
  - add the focus and active transitions for the same duration of the focus and active pseudo selectors (as to emulate the button press)
  - display the value, if it matches one of the nine selected letters
*/
function handleKey(e) {
  let keyCode = String.fromCharCode(e.keyCode).toLowerCase();
  
  buttons.forEach(button => {
    let attribute = button.getAttribute("data-button");
    if(attribute === keyCode) {
      button.classList.add("focus", "active");
      let timeoutID = setTimeout(() => {
        button.classList.remove("focus", "active");
        clearTimeout(timeoutID);
      }, 200); 
    }
  });
  switch(keyCode) {
    case 'q':
    case 'w':
    case 'e':
    case 'a':
    case 's':
    case 'd':
    case 'z':
    case 'x':
    case 'c':
      displayValue(keyCode);
      break;
    default: 
      displayValue("");
      break;
  }
}


// create a function which shows in the display element the value passed as argument
function displayValue(value) {
  display.textContent = value;
}