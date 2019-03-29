// target the button
const button = document.querySelector('button');
// possible text held by the button
const buttonText = ['Cross-breed', 'Pair-up'];
// integer describing the action following a button click
let program = 0;

// set up the button to use the first string
button.textContent = buttonText[program];


// function to loop through the string values
// while updating the program
const updateButton = () => {
  program = program === 0 ? 1 : 0;
  button.textContent = buttonText[program];
}

// function returning true or false at random
const randomBool = () => Math.random() > 0.5;
// function returning an integer up to a maximum value
const randomInt = (max) => Math.floor(Math.random() * max);
// function returning the input letter with random casing
const randomCase = (letter) => Math.random() > 0.5 ? letter.toLowerCase() : letter.toUpperCase();

// initialize the plants with random genes (dominant or recessive depending on casing)
const gene = 'D';
const trait = 'isRed';
/*
build each plant as follows:

{
  trait: boolean,
  genes: [array of two letters]
}
*/
// function generating a plant
const randomPlant = () => ({
  [trait]: randomBool(),
  genes: [randomCase(gene), randomCase(gene)]
});

// target the container in which to add the SVG-drawn plants
const garden = document.querySelector('.garden');

// function creating the SVG for the plant, whose drawing depends on the trait property of the input plant
function svgPlant(plant) {
  const color = plant[trait];
  const { genes } = plant;
  const svg = `
    <svg viewBox="0 0 40 100" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(0.8 0.8) translate(5 5)">
        <path d="M 25 100 a -10 -50 0 0 1 -5 -50 a 20 -30 0 0 0 20 -30 a -20 -10 0 0 0 -40 0 a 20 30 0 0 0 20 30" stroke="#0f200d" stroke-width="4" stroke-linecap="round" fill="${color ? '#ef6e58' : '#588c4a'}"/>
        <path d="M 25 90 a 10 -16 0 0 1 10 -16 a -10 16 0 0 1 -10 16" fill="#0f200d"/>
        <path d="M 19 82 a -10 -15 0 0 1 -10 -15 a 10 15 0 0 1 10 15" fill="#0f200d"/>
        <path d="M 23 70 a 8 -12 0 0 1 8 -12 a -8 12 0 0 1 -8 12" fill="#0f200d"/>
        <text x="0" y="100" font-size="0.5rem" font-weight="900">${genes.join('')}</text>
      </g>
    </svg>
  `;
  return svg;
}

// immediately include two plants
let plants = [randomPlant(), randomPlant()];

// immediately draw the plants including the SVG in the markup of the garden
plants.forEach(plant => garden.innerHTML += svgPlant(plant));

// function responding on a click on the button
function handleClick() {
  // remove the event listener to avoid having the button clicked before the functionality and animation are completed
  button.removeEventListener('click', handleClick);

  // program 0: cross the plants on the screen
  if (program === 0) {
    // transition the garden off the page
    garden.style.transition = 'all 0.5s ease-out';
    garden.style.opacity = 0;
    garden.style.visibility = 'hidden';
    // set a timeout to update the appearance of the garden while it is transitioned out of sight
    const timeoutGarden = setTimeout(() => {
      // create a plant starting with a random template
      const crossBred = randomPlant();
      // update the trait and genes following the merge of the input plants
      const [plant1, plant2] = plants;
      const [gene11, gene12] = plant1.genes;
      const [gene21, gene22] = plant2.genes;
      // create an array with the possible combinations following a Punett square
      /*
             gene11 gene12
      gene21
      gene22
      */
      const combinations = [
        `${gene11}${gene21}`,
        `${gene11}${gene22}`,
        `${gene12}${gene21}`,
        `${gene12}${gene22}`
      ];

      // pick a combination at random
      const combination = combinations[randomInt(combinations.length)];
      // include the genes from the combination
      const genes = combination.split('');
      crossBred.genes = genes;
      // include the trait according to the uppercase version of each gene
      // logic: if one is dominant, pick that trait's value
      const dominantGene = gene.toUpperCase();
      const [gene1, gene2] = genes;
      if (gene1 !== gene2) {
        if (gene1 === dominantGene) {
          crossBred.isRed = plant1.isRed;
        } else {
          crossBred.isRed = plant2.isRed;
        }
      } else {
        // if both or neither, pick at random
        crossBred.isRed = plants[randomInt(plants.length)].isRed;
      }

      // include only the cross-bred plant in the garden
      garden.innerHTML = svgPlant(crossBred);

      // include only the cross-bred plant in the array of plants
      plants = [crossBred];
      clearTimeout(timeoutGarden);
    }, 500);

    // set a timeout after which to include the garden back again
    const timeoutTransition = setTimeout(() => {
      garden.style.transition = 'all 0.4s ease-out';
      garden.style.opacity = 1;
      garden.style.visibility = 'visible';
      // reattach the event listener and change the text of the button
      button.addEventListener('click', handleClick);
      updateButton();
      clearTimeout(timeoutTransition);
    }, 1000);
  }


  // program 1: pair the existing plant with a new random plant
  if (program === 1) {
    const pairPlant = randomPlant();
    garden.innerHTML += svgPlant(pairPlant);
    // add the plant to the plants array
    plants.push(pairPlant);
    updateButton();
    button.addEventListener('click', handleClick);

  }
}

button.addEventListener('click', handleClick);