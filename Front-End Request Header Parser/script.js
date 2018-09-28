// target the element nesting all messages
const messages = document.querySelector('.app__messages');

// detail in an array of strings the content of each message
// include span and code elements for the selected items
const message = [
  'Hello there!',
  'Welcome to the <span>request header parser</span> microservice.',
  'Fancy words, right?',
  'Simply put, it means you can ping the <span>server</span> at the following <span>endpoint</span>:',
  '<code>[project_url]/api/whoami</code>',
  'and have in return information regarding <span>your device</span>.',
  'Something similar to the following:',
  '<code>{"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5", "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}</code>',
  'And that\'s it!'
];


// initialize a counter variable, to incrementally add all message items in the wrapping container
let counter = 0;

// every x seconds add a div container with the selected class and nesting the HTML content described in the array
const intervalID = setInterval(() => {

  messages.innerHTML += `<div class="messages--message">${message[counter]}</div>`;

  // increment the counter variable to access the following item
  counter++;
  
  // when reaching the end of the array, cleat the interval
  if(counter === message.length) {
    clearInterval(intervalID);
  }

}, 3000);