/*
detail the colors for the different sections
the idea is to have one section for color, and have the label reference to this color
*/
const colors = [
  '#FE4365',
  '#FC9D9A',
  '#F9CDAD',
  '#C8C8A9',
  '#83AF9B',
];

// target the container in which to create the sections and the labels
const container = document.querySelector('.container');

// retrieve the width of the container, to have each label take up a portion of this measure
const { offsetWidth: width } = container;
// consider the number of colors, to position and size the labels accordingly
const { length } = colors;


/* loop through the array of colors to add the following markup in the container (and for each color)

<section class="container__section">          <-- include a solid background matching the hue
  <span class="section--label">#hex</span>    <-- change the left and width property to take up a portion of the width
  <div class="section--content">
    <h2></h2>
  </div>
</section>
*/
container.innerHTML = colors.map((color, index) => `
  <section class="container__section" style="background: ${color}">
    <span class="section--label" style="left: ${width / length * index}px; width: ${width / length}px">${color}</span>

    <div class="section--content">
      <h2>Section ${index}</h2>
    </div>
  </section>
`).join('');


// when resizing the window, consider the new width of the container and update the left and width property to fit
window.addEventListener('resize', () => {
  const { offsetWidth } = container;
  const labels = document.querySelectorAll('.section--label');
  labels.forEach((label, index) => {
    label.style.left = `${offsetWidth / length * index}px`;
    label.style.width = `${offsetWidth / length}px`;
  });
});
