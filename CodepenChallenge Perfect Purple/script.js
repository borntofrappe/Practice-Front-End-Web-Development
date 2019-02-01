// target the container in which to append the HTML elements
const app = document.querySelector('.app');

/* global variables
- blue and red, simply delaring the extremes of the hue range
- choices, describing the number of options to include in the panel
- duration, dicating the number of seconds in which the number of options is introduced
*/
const blue = 240;
const red = 360;
const choices = 20;
const duration = 1.5;

// utility function returning a random integer in a specified range
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min) + min);

/* object describing the modals' markup
the idea is to create HTML elements according to the property name and include the text as per the value
*/
const modals = {
  introduction: {
    h1: 'Bienvenue',
    p: 'There are a few solid options today.<br/>We hope you\'ll find something to your taste.',
    button: 'Choose'
  },
  result: {
    h2: 'Excellent choice',
    p: 'Here\'s your choice',
    div: '',
    button: 'New Round'
  }
};

// ! the script is actually more readable from the bottom up, but here we go

// function including one button for each hsl() code, in a wrapping container
function showSelection() {
  // create the wrapping container and add a heading
  const panel = document.createElement('div');
  panel.classList.add('app__choices');

  const heading = document.createElement('h2');
  heading.textContent = 'Palette';
  panel.appendChild(heading);

  // for as many choices are detailed in the respective variable add a button to the wrapping container
  for (let i = 0; i < choices; i += 1) {
    const button = document.createElement('button');
    button.classList.add('choices--choice');

    /*
    button displaying the hsl code and using the hsl code through the custom property
    - for the hue, a random color between blue and red
    - for saturation and lightness, a random value between arbitrary extremes
    */
    const hue = randomBetween(blue, red);
    const saturation = randomBetween(20, 100);
    const lightness = randomBetween(40, 80);

    button.textContent = `hsl(${hue},${saturation}%,${lightness}%)`;
    button.style.setProperty('--color-choice', `hsl(${hue},${saturation}%,${lightness}%)`);
    // stagger the introduction of each button according to the number of choices and total duration
    button.style.animationDelay = `${i * (duration / choices)}s`;
    // listen for a click event, at which point call the handleClick function
    button.addEventListener('click', handleClick);
    panel.appendChild(button);
  }

  // add the panel as a whole
  app.appendChild(panel);
}


/* function fired whenever clicking on a button element
the idea is to
- retrieve the text of the button (to differentiate between functionalities)
- animate the existing container out of sight
- remove the element and call a function to introduce a new container
*/
function handleClick() {
  const { textContent: selection } = this;
  const parentContainer = this.parentElement;
  parentContainer.style.animation = 'rollOut 0.4s ease-out forwards';
  parentContainer.addEventListener('animationend', () => {
    app.removeChild(parentContainer);

    if (selection === 'Choose') {
      // first modal --> call the function to show selection's panel
      showSelection();
    } else if (selection === 'New Round') {
      // second's modal --> call the function to show the first one
      injectMarkup(modals.introduction);
    } else {
      // otherwise (meaning selection's panel) --> show the second modal
      // ! show the modal **after** updating the custom property and the paragraph detailing the code
      app.style.setProperty('--color-choice', selection);
      modals.result.p = `Here's your <strong>${selection}</strong>`;
      injectMarkup(modals.result);
    }
  });
}

/* function called to display the modals
 receiving as input an object with property-value pairs and creating markup as follows
 <property>value</property>
*/
function injectMarkup(markup) {
  // in a wrapping container add the elements as specified by the property-value pairs
  const modal = document.createElement('div');
  modal.classList.add('app__modal');

  Object.entries(markup).forEach((entry) => {
    const [property, value] = entry;
    const element = document.createElement(property);

    // for the buttons, add an event listener referecing the encompassing handleClick function
    if (element.tagName === 'BUTTON') {
      element.addEventListener('click', handleClick);
    }

    element.innerHTML = value;
    modal.appendChild(element);
  });
  app.appendChild(modal);
}

// by default call the function to inject the markup making up the introductory modal's
injectMarkup(modals.introduction);
