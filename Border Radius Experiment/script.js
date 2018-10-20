// target the blob
const blob = document.querySelector('.blob');
// target the header in which to detail the border radius values
const heading = document.querySelector('.heading');
// create a function which returns a random percentage value
// between 40 and 100%
const randomPercent = () => `${Math.floor(Math.random() * (100 - 40) + 40)}%`;

// create a function which sets the border-radius property for the blob
// the function could sure be optimized
const updateRadius = () => {
  blob.style.borderRadius = `${randomPercent()} ${randomPercent()} ${randomPercent()} ${randomPercent()} / ${randomPercent()} ${randomPercent()} ${randomPercent()} ${randomPercent()}`;
};
// every so often call the function updating the border radius
// display the values in the heading below
setInterval(() => {
  updateRadius();
  heading.textContent = blob.style.borderRadius;
}, 2500);
