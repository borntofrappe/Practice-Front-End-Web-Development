/*
custom elements, a very silly intro
- use the **customElements** object, and specifically the **.define** method
- describe in this method
    1. the name of the element
      ! must contain a - dash
    1. a class describing the element

for a silly element making use of SVG, the class can describe the desired structure in the shadowDOM
  1. attach a shadow to the element
  1. include markup in the shadow

  ! this.textContent can be used to consider whichever text is passed in between the custom-made tags
*/

class CircleText extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // replicate the same structure used for the first snippet
    const markupShadow = `
    <svg width="200" height="200" viewBox="0 0 120 120">
    <style>
    svg {
      font-family: inherit;
      font-weight: 300;
      text-transform: uppercase;
      letter-spacing: 0.25rem;
    }
    </style>
        <g transform="translate(10 10)">
          <defs>
            <path
              id="round"
              d="M 50 0 a 50 50 0 0 0 0 100 a 50 50 0 0 0 0 -100"
              fill="none"
              stroke="black"
              stroke-width="2"
            />
          </defs>

          <text>
            <!-- detail the text in the textPath element -->
            <textPath href="#round">${this.textContent}</textPath>
          </text>
        </g>
      </svg>
    `;

    shadow.innerHTML = markupShadow;
  }
}

// define the circle-text element with the aforementioned class
customElements.define('circle-text', CircleText);


// select the form to handle creating a circle-text element with user's own input
const form = document.querySelector('form');

// function called in response to the submit event on the form
const createElement = (e) => {
  // prevent the default submit behavior
  e.preventDefault();

  // retrieve the value and display it in a custom circe-text element
  const input = e.target.querySelector('input');

  let { value } = input;

  // remove existing input
  input.value = '';
  // add a substitute value if no value is given
  if (!value) {
    value = 'Nothing on your mind?';
  }
  // add a silly placeholder
  input.setAttribute('placeholder', 'Nice one 😆');

  // add the circle-text element where the SVG element would sit
  form.parentElement.querySelector('.custom__element').innerHTML = `<circle-text>${value}</circle-text>`;
}

// attach an event listener for the submit event on the form
form.addEventListener('submit', createElement);