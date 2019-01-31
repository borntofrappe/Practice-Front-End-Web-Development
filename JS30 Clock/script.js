/* utility function
taking as input the type of clock's hand (hours, minutes, seconds) and the hand's own value
the type to account for the different ranges (hours 0-11, minutes 0-59)

return the degrees to match the time in rotation
mapping the range to [0-360]
*/
const timeToDegrees = (hand, value) => (hand === 'hours' ? `${value * 30 + 180}deg` : `${value * 6 + 180}deg`);


// COLOR THEME LOGIC
// target the button to toggle between color patterns
const toggleButton = document.querySelector('button');

// initialize two variables to 1. keep track of the color theme and 1. to detail the actual colors
// ! be sure to match the property name with the custom CSS property
// bg for --color-bg, seconds for --color-seconds and so forth

let themeColor = 'dark';
const theme = {
  dark: {
    bg: ['#120922'],
    seconds: ['#ffde71'],
    minutes: ['#f3b93c'],
    hours: ['#f1a100'],
    clock: ['#412577'],
    clockd: ['#2d1562'],
    clockl: ['#6F4EC3'],
  },
  light: {
    bg: ['#f3eaca'],
    seconds: ['#6F4EC3'],
    minutes: ['#2d1562'],
    hours: ['#412577'],
    clock: ['#f1a100'],
    clockd: ['#f3b93c'],
    clockl: ['#ffde71'],
  }
};

// on click toggle between the two values (to use the variable directly in the function)
// loop through the theme colors and apply the appropriate value to the matching custom property
function toggleTheme() {
  // update the button's text before changing the theme color, to describe how it toggles the opposite theme
  toggleButton.querySelector('span').textContent = themeColor;

  themeColor = themeColor === 'light' ? 'dark' : 'light';
  /* Object.entries being an array of arrays
  [property, value],
  [property, value],
  ...
  */
  Object.entries(theme[themeColor]).forEach(entry => document.documentElement.style.setProperty(`--color-${entry[0]}`, entry[1]));
}
toggleButton.addEventListener('click', toggleTheme);


// ACTUAL CLOCK LOGIC
// function called every second to update the rotation of the clock's hands
function updateTime() {
  // retrieve the current values for the seconds, minutes and hours
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // create an object nesting the three values
  const time = {
    hours,
    minutes,
    seconds
  };

  // loop through the object's entries and update the rotation of the matching hands with the appropriate values
  Object.entries(time).forEach((entry) => {
    // destructure the property and value in two variables
    const [property, value] = entry;

    // target the div with the class matching the object's property
    const hand = document.querySelector(`div.${property}`);

    // add a transition in every instance except when the value hits 0 (to avoid the glitchy transition back to 0 degrees)
    if (value === 0) {
      hand.style.transition = 'none';
    } else {
      hand.style.transition = 'all 0.1s cubic-bezier(.19,.51,.56,1.8)';
    }

    // apply the rotation according to the value and the utility function
    hand.style.transform = `translate(-50%) rotate(${timeToDegrees(property, value)})`;
  });
}

// immediately call the function to show the current time
updateTime();
// set up an interval to update the UI every second
setInterval(updateTime, 1000);
