// array describing the order with which the events is being fired
const order = [
  'zeroeth',
  'first',
  'second',
  'third'
];

// counter variable to detail the order with which the buttons react to a click event
let counter = 0;

// function fired whenever a click event is registered on a div.div element
function confirmClick(e) {
  // remove the event listener to avoid continuously running the function on the same div
  // ! re-attach the click event after the animation of the paragraph
  // ! do not re-attach the click event if the div has also a class of .once (meant to run only one time)
  this.removeEventListener('click', confirmClick);

  // stop propagation if the class instructs so
  if (this.classList.contains('propagation')) {
    e.stopPropagation();
  }

  // increment the counter variable
  counter += 1;
  // target the paragraph of each div element
  const message = this.querySelector('p');
  // detail the message specifying the index matching the order
  message.textContent = `${order[Math.min(counter, order.length - 1)]}!`;

  // animate the paragraph to view
  message.style.opacity = 1;
  message.style.visibility = 'visible';
  // after a brief timeout remove the paragraph from sight and re-attach the event listener
  let timeoutID = setTimeout(() => {
    message.style.opacity = 0;
    message.style.visibility = 'hidden';

    // attach the event listener, except when the class of .once is specified
    if (!this.classList.contains('once')) {
      this.addEventListener('click', confirmClick);
    }

    // reset the counter
    counter = 0;
    clearTimeout(timeoutID);
  }, 1000);
}

// target all div elements with a class of .div
const divs = document.querySelectorAll('div.div');

// immediately add a paragraoh element in each div
divs.forEach(div => {
  const paragraph = document.createElement('p');
  // ! add the paragraph as the first child element of the div container
  const firstElementChild = div.firstElementChild;
  div.insertBefore(paragraph, firstElementChild);
});

// listen for a click event on all div elements
divs.forEach(div => div.addEventListener('click', confirmClick, {
  //  specify the capture and once properties looking at the class of the div elements
  capture: div.classList.contains('capture'),
  once: div.classList.contains('once')
}));
