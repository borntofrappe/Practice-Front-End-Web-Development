// target the heading and the light source
const text = document.querySelector('h1');
const sun = document.querySelector('.sun');
// create a boolean variable to move the light source and change the made up shadow only when the cursor is down on the light source itself
let isSunny = false;

// compute the measures for the text element and the light source
// he properties making up the shadow change according to the interplay between the coordinates of the cursor and these values
const textSizes = {
  x: text.offsetLeft,
  y: text.offsetTop,
  width: text.offsetWidth,
  height: text.offsetHeight
};

// ! x and y for the sun are updated with the position of the cursor
const sunSizes = {
  x: sun.offsetLeft,
  left: sun.offsetLeft,
  width: sun.offsetWidth,
  height: sun.offsetHeight
};

// to map the value retrieved from the mouse event to the desired interval, it is first necessary to describe the maximum value which the mouse event can adopt
// for the x and y coordinate, this is given by the distance from the center of the text to the left and top border
const maxX = textSizes.x + textSizes.width / 2;
const maxY = textSizes.y + textSizes.height / 2;


// when the cursor is down on the light source, add the class making up the simple infinite animation and switch the boolean to true
sun.addEventListener('mousedown', (e) => {
  e.preventDefault();
  sun.classList.add('dither');
  isSunny = true;
});
// when the cursor is up from the light source, remove the class and switch the boolean back to false
sun.addEventListener('mouseup', () => {
  sun.classList.remove('dither');
  isSunny = false;
});


// function mapping values according the maximum value and the desired range
// value can be anything up to value cap (and for the horizontal coordinate it goes between -valueCap to valueCap)
const map = (value, valueCap, min, max) => min + (max - min) / (valueCap * 2) * (value + valueCap);


// function called in response to the mousemove event in the entire window
function handleWindow(e) {
  // continue only if the cursor is moving the light source
  if (isSunny) {
    // update the position of the light source to match the position of the cursor
    sunSizes.x = e.x;
    sunSizes.y = e.y;
    sun.style.left = `${sunSizes.x - sunSizes.width / 2}px`;
    sun.style.top = `${sunSizes.y - sunSizes.height / 2}px`;


    // update the variables making up the shadow according to gap between the text and the  light source
    const deltaX = (textSizes.x + textSizes.width / 2) - sunSizes.x;
    const deltaY = (textSizes.y + textSizes.height / 2) - sunSizes.y;

    /*
    deltaX:
    < 0 --> light source is to the left --> positive rotateZ values, transform origin to the right (100% 100%)
    > 0 --> light source is to the right --> opposite considerations

    deltaY:
    < 0 --> light source above --> decrease the scale and the rotateX values
    > 0 --> light source below --> opposite considerations

    ! create ranges to normalize the delta to appropriate values
    rotateZ: [-15deg, 15deg]
    transform-origin: [0% 100%, 100% 100%]

    rotateX: [75deg, 85deg]
    scaleY: [15, 5]

    this normalization can occur with a function
    */
    text.style.setProperty('--origin', `${map(deltaX, maxX, 0, 100)}% 100%`);
    text.style.setProperty('--rotateZ', `${map(deltaX, maxX, -15, 15)}deg`);
    text.style.setProperty('--rotateX', `${map(deltaY, maxY, 75, 85)}deg`);
    text.style.setProperty('--scaleY', `${map(deltaY, maxY, 15, 5)}`);
  }
}

// listen for the mousemove event on the entire window
window.addEventListener('mousemove', handleWindow);
