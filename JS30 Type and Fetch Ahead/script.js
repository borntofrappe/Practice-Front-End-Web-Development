// URL storing the information on a selection of US countries, their location and population statistics
const URL = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// function adding a space for the thousand, million and hypothetically higher magnitude scale digits
function decimalSeparator(text) {
  // create an array out of the input text
  // loop through the array from the last positions back to the first, adding a separator for the 3rd, 6th, 9th ... item
  let arr = text.split('');
  const { length } = arr;
  for (let i = length - 1; i > 0; i -= 1) {
    if ((length - i) % 3 === 0) {
      arr = [...arr.slice(0, i), ' ', ...arr.slice(i)];
    }
  }
  // return the string made up of the input numbers + the added separators
  return arr.join('');
}

/*
svg making up the frame around the div containers
the idea is to use a rectangle element as a reference, and have it spread the width/height of the container
by then applying a mask it is possible to cut out from the rectangle a desired shape
the shape in this instance is made up of straight lines and arcs connecting them

by using a particular value for the preserveAspectRatio property it is possible to stretch the SVG and to maintain a uniform stroke
especially important for the path elements
*/
const svgOdd = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMax slice"
  viewBox="0 0 100 100"
>
  <defs>
    <mask id="maskOdd">
      <line
        x1="99"
        x2="99"
        y="0"
        y2="80"
        stroke="#fff"
        stroke-width="2px"
      />
      <path
        d="M 99 80 a 10 10 0 0 1 -10 10"
        stroke="#fff"
        stroke-width="2px"
      />
      <line
        x1="89"
        x2="11"
        y1="90"
        y2="90"
        stroke="#fff"
        stroke-width="2px"
      />
      <path
        d="M 11 90 a 10 10 0 0 0 -10 10"
        stroke="#fff"
        stroke-width="2px"
      />
    </mask>
  </defs>
  <rect
    x="0"
    y="0"
    width="100"
    height="100"
    fill="currentColor"
    mask="url(#maskOdd)"
  />
</svg>
`;

// for the 2nd, 4th and so forth items, a mask mirroring the previous one is used, matching the end of the svgOdd element with the beginning of the svgEven one
const svgEven = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMax slice"
  viewBox="0 0 100 100"
>
  <defs>
    <mask id="maskEven">
      <line
        x1="1"
        x2="1"
        y="0"
        y2="80"
        stroke="#fff"
        stroke-width="2px"
      />
      <path
        d="M 1 80 a 10 10 0 0 0 10 10"
        stroke="#fff"
        stroke-width="2px"
      />
      <line
        x1="11"
        x2="89"
        y1="90"
        y2="90"
        stroke="#fff"
        stroke-width="2px"
      />
      <path
        d="M 89 90 a 10 10 0 0 1 10 10"
        stroke="#fff"
        stroke-width="2px"
      />
    </mask>
  </defs>
  <rect
    x="0"
    y="0"
    width="100"
    height="100"
    fill="currentColor"
    mask="url(#maskEven)"
  />
</svg>
`;

// target the input element, the container in which to include matching results
const input = document.querySelector('input[type="text"]');
const results = document.querySelector('div#results');
// target also the label for minor design tweaks
const label = document.querySelector('label');

// function called in response to the on change event, as the user types in the input element
function handleChange(e) {
  // destructure the value out of the input event
  // if there are at least two characters proceed finding matching city names
  // else show a fitting message in the label
  const { value } = e.target;
  if (value.length >= 2) {
    // fetch the JSON object from the specified URL
    // as there might be some time while the method fetches the information, add a simple message in the label
    label.textContent = 'Fetching information';
    fetch(URL)
      .then(response => response.json())
      .then((json) => {
        // filter the obtained result (an array of 1000 items) to consider only those elements containing the value found in the input element
        // toLowerCase to avoid conflict between capitalizations
        const filter = json.filter(item => item.city.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        // if filter provides a result (a subset of the 1000 items array), proceed populating the container
        // else notify the user through the label
        if (filter.length > 0) {
          /* include in the HTML one div container with the following structure
          div.item
            h3 (with the name of the city)
            h4 (with the name of the state, made important by cities such as portland)
            p (number of citizens)
            p (percentage change in the described years)
          */
          results.innerHTML = filter.map((item, index) => `
            <div class="item">
              <h3>${item.city}</h3>
              <h4>${item.state}</h4>
              <!-- format the population to separate the 3rd, 6th and following digits -->
              <p>${decimalSeparator(item.population)} citizens</p>
              <!-- depending on the value of the growth value, describe the increase/decreas in population -->
              <p>${item.growth_from_2000_to_2013.substring(0, item.growth_from_2000_to_2013.indexOf('%')) > 0 ? 'Growing' : 'Receding'} <strong>${item.growth_from_2000_to_2013}</strong> between 2000 and 2013</p>
              <!-- depending on the value of the index (incremented to accommodate the odd and even alternance), add the SVG customized to frame each alternate container -->
              ${(index + 1) % 2 === 0 ? svgEven : svgOdd}
            </div>
            `).join('');
          // change the appearance of the label to match the occurrence
          label.textContent = 'Here\'s a short list';
        } else {
          // change the appearance of the label to match the occurrence
          label.textContent = 'No matching result';
          // clear existing HTML nodes
          results.innerHTML = '';
        }
        // in both instances, show the label through the prescribed class
        label.classList.add('search');
      });
  } else {
    // show the label as to remark the occurrence
    label.classList.remove('search');
    label.textContent = 'At least two letters';
    // remove existing elements form the #results container
    results.innerHTML = '';
  }
}

// call the described function in response to the input event
input.addEventListener('input', handleChange);
