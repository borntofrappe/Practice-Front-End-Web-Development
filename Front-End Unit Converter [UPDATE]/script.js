// describe the possible units of measure in an array of objects
// each object detailing an array of 2 items, describing the units and the conversion between them
// table unit conversion (TUC)
const TUC = [
  {
    unit: ['inch', 'mm'],
    conversion: [1, 25.4]
  },
  {
    unit: ['foot', 'm'],
    conversion: [1, 0.3048]
  },
  {
    unit: ['mi', 'km'],
    conversion: [1, 1.60934]
  },
  {
    unit: ['oz', 'ml'],
    conversion: [1, 29.57]
  },
  {
    unit: ['gal', 'l'],
    conversion: [1, 3.785]
  },
  {
    unit: ['lbs', 'kg'],
    conversion: [1, 0.453592]
  }
];

// starting from the conversion array build an array of all possible units of measure
const units = [];
for (let i = 0; i < TUC.length; i += 1) {
  units.push(...TUC[i].unit);
}

// select the main container and append (at the very bottom of the DOM) a details element wrapping the possible metric-imperial combinations
const main = document.querySelector('.frontend');
const markup = `
  <details>
    <ul>
      ${TUC.map(pair => `<li>${pair.unit.join(' - ')}</li>`).join('')}
    </ul>
    <summary>Table of Units</summary>
  </details>
  `;
main.innerHTML += markup;

const form = document.querySelector('.frontend form');

// call a function which receives as argument an object detailing the unit and amount
// return in the .conversion div the converted amount
// provide default values for both arguments
function convertInput({ numberVal = 1, textVal = 'oz' }) {
  // find the object containing the unit of measure
  const objectTUC = TUC.find(table => table.unit.includes(textVal));

  // destructure the values from each object item
  const [imperialUnit, metricUnit] = objectTUC.unit;
  const [imperial, metric] = objectTUC.conversion;

  // describe the conversion based on the input value
  let conversion;
  if (textVal === imperialUnit) {
    conversion = `${(numberVal / imperial * metric).toFixed(4)} ${metricUnit}`;
  } else {
    conversion = `${(numberVal / metric * imperial).toFixed(4)} ${imperialUnit}`;
  }
  // describe the value in the .conversion container
  const conversionElement = document.querySelector('.conversion');
  conversionElement.innerHTML = `<p>${conversion}</p>`;
}
// immediately call the function for the values detailed in the placeholder
convertInput({ textVal: 'oz' });

// evaluate form function
function evaluateForm() {
  // retrieve the values from the nested input elements
  const inputNumber = form.querySelector('input[type="number"]').value;
  const inputText = form.querySelector('input[type="text"]').value;

  // describe the values in two variables, storing undefined if no value is present
  const numberVal = (inputNumber) || undefined;
  const textVal = (units.includes(inputText)) ? inputText : undefined;


  // call a function to convert the values retrieved from the input object
  const inputObject = {
    textVal,
    numberVal
  };
  convertInput(inputObject);
}

// listen for an input even on the entire form (called whenever interacting with the input elements)
form.addEventListener('input', evaluateForm);
