// describe the possible units of measure in an array of objects
const conversion = [
  {
    inch: 1,
    millimiter: 25.4
  },
  {
    foot: 1,
    meter: 0.3048
  },
  {
    oz: 1,
    milliliter: 29.57
  },
  {
    gallon: 1,
    liter: 3.785
  }
];

// starting from the conversion array build an array of all possible units of measure
const units = [];
for (let i = 0; i < conversion.length; i += 1) {
  units.push(...Object.keys(conversion[i]));
}

// select the main container and append (at the very bottom of the DOM) a details element wrapping the possible metric-imperial combinations
const main = document.querySelector('main');
const markup = `
  <details>
    <ul>
      ${conversion.map(pair => `<li>${Object.keys(pair).join(' - ')}</li>`).join('')}
    </ul>
    <summary>Table of Units</summary>
  </details>
  `;
main.innerHTML += markup;

// target the input element and the convert button
const inputUnit = document.querySelector('input[type="text"]');
const inputNumber = document.querySelector('input[type="number"]');

// call a function which receives as input a unit of measure and returns the conversion for that value (and the specified number in the other input element)
function convertInput(amount = 1, input = 'oz') {
  // find the object in the array containing the unit of measure
  const foundPair = conversion.find((pair) => {
    const props = Object.keys(pair);
    return props.includes(input);
  });

  // collect the properties and values in two arrays
  const foundProps = Object.keys(foundPair);
  const foundValues = Object.values(foundPair);

  // detail the index of the detailed element/its opposing element
  const foundIndex = foundProps.indexOf(input);
  const neededIndex = (foundIndex === 0) ? 1 : 0;

  // select the conversion element

  const conversionElement = document.querySelector('.conversion');
  const conversionAmoount = foundValues[neededIndex] / foundValues[foundIndex] * amount;
  const conversionUnit = foundProps[neededIndex];
  const conversionMarkup = `
    <p><strong>${conversionAmoount}</strong> ${conversionUnit}</p>
  `;
  conversionElement.innerHTML = conversionMarkup;
}

// create a function which evaluates the input and displays the converted value
function evaluateInput(e) {
  // until the value in the input element contains text matching one of the units of measure, return the function
  const { value: valueUnit } = e.target;
  let isUnit = false;

  for (let i = 0; i < units.length; i += 1) {
    if (valueUnit === units[i]) {
      isUnit = true;
    }
  }
  // if a unit matches, call a function to display the converted value below the input elements
  if (isUnit) {
    const valueNumber = (inputNumber.value) ? inputNumber.value : 1;
    convertInput(valueNumber, valueUnit);
  }
}
// add an listener for the input event, at which point call the function evaluating the text in the input
inputUnit.addEventListener('input', evaluateInput);

function evaluateNumber(e) {
  const { value: valueNumber } = e.target;
  const valueUnit = (inputUnit.value) ? inputUnit.value : undefined;
  convertInput(valueNumber, valueUnit);
}
// add a listener for the input and change events on the number input, to update the conversion
inputNumber.addEventListener('input', evaluateNumber);
inputNumber.addEventListener('change', evaluateNumber);

// immediately call the evaluate function for the values specified in the placeholder
convertInput();
