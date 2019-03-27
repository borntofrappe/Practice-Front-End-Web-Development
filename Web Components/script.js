// CUSTOM ELEMENT
// create the custom element
class CustomElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<mark>Hello there</mark>`;
  }
}
// define the HTML tag
customElements.define('custom-element', CustomElement); //use it as <my-component></my-component>


// SHADOW DOM
// include an element in the #shadow container through the shadow DOM
const shadowRoot = document.querySelector('#shadow').attachShadow({ mode: 'open' });
// detail the markdown in the shadow root
shadowRoot.innerHTML = `
<style>
  p {
    background: #010;
    font-size: 1.2rem;
    padding: 0.35rem 0.5rem;
    border-radius: 5px;
    box-shadow: 0 1px 5px #111, 0 0 10px -5px #333;
  }
</style>
<p>Boooh</p>`;

// SLOT
// <slot> refers to whatever is already in the #shadow-.slot container
const shadowRootSlot = document.querySelector('#shadow-slot').attachShadow({ mode: 'open' });
shadowRootSlot.innerHTML = `
<style>
  p {
    background: #010;
    font-size: 1.2rem;
    padding: 0.35rem 0.5rem;
    border-radius: 5px;
    box-shadow: 0 1px 5px #111, 0 0 10px -5px #333;
  }
</style>
<p>Boooh<slot></slot></p>`;


// HTML TEMPLATE
// identify the ul element in which to inject the templated list items
const listAirports = document.querySelector('#airports');

// identify the template element
const listItemAirports = document.querySelector('#list-item-airports');

// describe a series of object to inject in the DOM
// airport codes retrieved from https://airportcod.es/#
const airports = [
  { name: 'AALBORG LUFTHAVN', code: 'AAL' },
  { name: 'BRUNEI INTERNATIONAL AIRPORT', code: 'BWN' },
  { name: 'QUAD CITY INTERNATIONAL AIRPORT', code: 'MLI' },
  { name: 'SAN CARLOS AIRPORT', code: 'SQL' },
];

// loop through the data
airports.forEach(({ name, code }) => {
  // create an instance of the template
  // true allowing for a _deep_ copy
  const instance = document.importNode(listItemAirports.content, true);
  // add the name and code in the span elements bearing the class with the same name
  instance.querySelector('.name').innerHTML = name;
  instance.querySelector('.code').innerHTML = code;

  // append the list item to the unordered list
  listAirports.appendChild(instance);
})


// REUSABLE HTML TEMPLATE (template practice)
const listTopics = document.querySelector('#topics');
const listItemTopics = document.querySelector('#list-item-topics');

const topics = [
  { name: 'Template', brief: 'What is a template element' },
  { name: 'Content', brief: 'What goes inside of a template element' },
  { name: 'Dialog', brief: 'An example and practical use case' },
]

topics.forEach(feature => {
  const instance = document.importNode(listItemTopics.content, true);
  // for extra practice, use the property value pairs through Object.entries
  Object.entries(feature).forEach(([property, value]) => instance.querySelector(`.${property}`).innerHTML = value);
  listTopics.appendChild(instance);
});

// TEMPLATES in DEPTH
const templateButton = document.querySelector('#template-button');
const instanceButton = document.importNode(templateButton.content, true);
templateButton.parentNode.appendChild(instanceButton);

// TEMPLATE STYLED & SCRIPTED
const templateButtonSS = document.querySelector('#template-button-ss');
const instanceButtonSS = document.importNode(templateButtonSS.content, true);
templateButtonSS.parentNode.appendChild(instanceButtonSS);

// TEMPLATE DIALOG
const templateDialog = document.querySelector('#template-dialog');
const instanceDialog = document.importNode(templateDialog.content, true);
templateDialog.parentNode.appendChild(instanceDialog);

// TEMPLATE TODOS (temporary, but still good practice)
const listTodos = document.querySelector('#todos');
const listItemTodos = document.querySelector('#list-item-todos');

const todos = [
  'Custom Elements',
  'Shadow DOM'
];

todos.forEach(todo => {
  const instance = document.importNode(listItemTodos.content, true);
  console.log(instance);
  instance.querySelector('li').innerHTML = todo;
  listTodos.appendChild(instance);
})