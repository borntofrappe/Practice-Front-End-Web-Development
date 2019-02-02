// target the heading and the light source
const text = document.querySelector('h1');
const sun = document.querySelector('.sun');
// create a boolean variable to move the light source and change the made up shadow only when the cursor is down on the light source itself
let isSunny = false;

// compute the measures regarding the text element and the light source
// this to find when the light source is in relation to the heading
const textSizes = {
  x: text.offsetLeft,
  y: text.offsetTop,
  width: text.offsetWidth,
  height: text.offsetHeight
};

// ! x and y for the sun are updated with the position of the cursor
const sunSizes = {
  x: 0,
  left: 0,
  width: sun.offsetWidth,
  height: sun.offsetHeight
};

const maxX = textSizes.x + textSizes.width / 2;
const maxY = textSizes.y + textSizes.height / 2;

// sun.style.left = `${textSizes.x + textSizes.width / 2 - sunSizes.width / 2}px`;
// sun.style.top = `${textSizes.y + textSizes.height / 2 - sunSizes.height / 2}px`;

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

// function normalizing values according to an input and output range
function normalize(value, valueCap, min, max) {
  return min + (max - min) / (valueCap * 2) * (value + valueCap);
}


// function called in response to the mousemove event in the entire window
function handleWindow(e) {
  // continue only if the cursor is moving the light source
  if (isSunny) {
    // update the position of the light source to match the position of the cursor
    sunSizes.x = e.x;
    sunSizes.y = e.y;

    // update the position of the light source according to the new updated variables
    // ! remember the x and y always refer to the
    sun.style.left = `${sunSizes.x - sunSizes.width / 2}px`;
    sun.style.top = `${sunSizes.y - sunSizes.height / 2}px`;

    // update the variables making up the shadow according to the relation between the light source coordinates and the heading position
    const deltaX = (textSizes.x + textSizes.width / 2) - sunSizes.x;
    const deltaY = sunSizes.y - (textSizes.y + textSizes.height / 2);

    /*
    deltaX:
    < 0 --> light source is to the left --> positive rotateZ values, transform origin to the right (100% 100%)
    > 0 --> light source is to the right --> opposite considerations

    deltaY:
    < 0 --> light source above --> decrease the scale and the rotateX values
    > 0 --> light source below --> opposite considerations

    ! create ranges to normalize the delta to appropriate values
    rotateZ: [-20deg, 20deg]
    transform-origin: [0% 100%, 100% 100%]

    rotateX: [70deg, 85deg]
    scaleY: [1, 5]

    this normalization can occur with a function
    */
    text.style.setProperty('--origin', `${normalize(deltaX, maxX, -100, 100)}% 100%`);
    text.style.setProperty('--rotateZ', `${normalize(deltaX, maxX, -20, 20)}deg`);
    text.style.setProperty('--rotateX', `${normalize(deltaY, maxY, 75, 88)}deg`);
    text.style.setProperty('--scaleY', `${normalize(deltaY, maxY, 1, 15)}`);
    console.log(text.style.getPropertyValue('--rotateZ'));
  }
}

// listen for the mousemove event on the entire window
window.addEventListener('mousemove', handleWindow);
