// data retrieved from the js30 course
// on github
// https://github.com/wesbos/JavaScript30/blob/master/04%20-%20Array%20Cardio%20Day%201/index-START.html

const inventors = [
  {
    first: 'Albert', last: 'Einstein', year: 1879, passed: 1955
  },
  {
    first: 'Isaac', last: 'Newton', year: 1643, passed: 1727
  },
  {
    first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642
  },
  {
    first: 'Marie', last: 'Curie', year: 1867, passed: 1934
  },
  {
    first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630
  },
  {
    first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543
  },
  {
    first: 'Max', last: 'Planck', year: 1858, passed: 1947
  },
  {
    first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979
  },
  {
    first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852
  },
  {
    first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905
  },
  {
    first: 'Lise', last: 'Meitner', year: 1878, passed: 1968
  },
  {
    first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909
  }
];
const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

// target the container of all exercises and for each exercise add a div container, with the working solution
const containerExercises = document.querySelector('.container__exercises');

// EXERCISE 1: FILTER
const exerciseOne = `
  <div class="exercises--exercise">
    <details>
      <summary>Filter the list of inventors for those who were born in the 1500's</summary>
      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Year</th>
        </tr>
        ${inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600).map(inventor => `
          <tr>
            <td>${inventor.first}</td>
            <td>${inventor.last}</td>
            <td><mark>${inventor.year}</mark></td>
          </tr>
        `).join('')}
      </table>

    </details>
  </div>
`;
containerExercises.innerHTML += exerciseOne;


// EXERCISE 2: MAP
const exerciseTwo = `
  <div class="exercises--exercise">
    <details>
      <summary>Give us an array of the inventors' first and last names</summary>
      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
        </tr>

        ${inventors.map(inventor => `
          <tr>
            <td>${inventor.first}</td>
            <td>${inventor.last}</td>
          </tr>
        `).join('')}
      </table>
    </details>
  </div>
`;
containerExercises.innerHTML += exerciseTwo;


// EXERCISE 3: SORT
const exerciseThree = `
  <div class="exercises--exercise">
    <details>
      <summary>Sort the inventors by birthdate, oldest to youngest</summary>
      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Birthdate</th>
        </tr>
        ${inventors.sort((inventorA, inventorB) => (inventorA.year > inventorB.year ? 1 : -1)).map(inventor => `
          <tr>
            <td>${inventor.first}</td>
            <td>${inventor.last}</td>
            <td><mark>${inventor.year}</mark></td>
          </tr>
        `).join('')}
      </table>
    </details>
  </div>
`;
containerExercises.innerHTML += exerciseThree;


// EXERCISE 4: REDUCE
const exerciseFour = `
  <div class="exercises--exercise">
    <details>
      <summary>How many years did all the inventors live?</summary>
      <p>Total years: <mark>${inventors.reduce((accumulator, currentValue) => accumulator + (currentValue.passed - currentValue.year), 0)}</mark></p>
    </details>
  </div>
`;
containerExercises.innerHTML += exerciseFour;


// EXERCISE 5: SORT +
const exerciseFive = `
<div class="exercises--exercise">
  <details>
    <summary>Sort the inventors by years lived</summary>
    <table>
      <tr>
        <th>First name</th>
        <th>Last name</th>
        <th>Years lived</th>
      </tr>
      ${inventors.sort((inventorA, inventorB) => ((inventorA.passed - inventorA.year) < (inventorB.passed - inventorB.year) ? 1 : -1)).map(inventor => `
        <tr>
          <td>${inventor.first}</td>
          <td>${inventor.last}</td>
          <td><mark>${inventor.passed - inventor.year}</mark></td>
        </tr>
      `).join('')}
    </table>
  </details>
</div>
`;
containerExercises.innerHTML += exerciseFive;


// EXERCISE 6: MAP +
const href = 'https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris';
// to step through the CORS policy, here the nodelist of all boulevards, extracted with the following lines of code (run in the javascript console of the page)
// const listItems = document.querySelectorAll('.mw-category-group ul li');
// const boulevards = [...listItems].map(listItem => listItem.innerText);
const boulevards = [
  'Boulevards of Paris',
  'City walls of Paris',
  'Thiers wall',
  'Wall of Charles V',
  'Wall of Philip II Augustus',
  'City gates of Paris',
  "Haussmann's renovation of Paris",
  'Boulevards of the Marshals',
  'Boulevard Auguste-Blanqui',
  'Boulevard Barbès',
  'Boulevard Beaumarchais',
  "Boulevard de l'Amiral-Bruix",
  'Boulevard des Capucines',
  'Boulevard de la Chapelle',
  'Boulevard de Clichy',
  'Boulevard du Crime',
  'Boulevard Haussmann',
  "Boulevard de l'Hôpital",
  'Boulevard des Italiens',
  'Boulevard de la Madeleine',
  'Boulevard de Magenta',
  'Boulevard Montmartre',
  'Boulevard du Montparnasse',
  'Boulevard Raspail',
  'Boulevard Richard-Lenoir',
  'Boulevard de Rochechouart',
  'Boulevard Saint-Germain',
  'Boulevard Saint-Michel',
  'Boulevard de Sébastopol',
  'Boulevard de Strasbourg',
  'Boulevard du Temple',
  'Boulevard Voltaire',
  'Boulevard de la Zone'
];

const exerciseSix = `
<div class="exercises--exercise">
  <details>
    <summary>
      Create a list of Boulevards in Paris that contain 'de' anywhere in the name
      </summary>
      Resource: <a href=${href}>Wiki page</a>
      <ul>
        ${boulevards.filter(boulevard => /de/.test(boulevard)).map(boulevard => `
          <li>${boulevard.replace(/de/gi, '<mark>de</mark>')}</li>
        `).join('')}
      </ul>
  </details >
</div >
  `;

containerExercises.innerHTML += exerciseSix;

// EXERCISE 7: SORT ++
const exerciseSeven = `
<div class="exercises--exercise">
  <details>
    <summary>Sort the people alphabetically by last name</summary>
    <table>
      <tr>
        <th>Last name</th>
        <th>First name</th>
      </tr>
      ${people.map(person => person.split(', ')).sort((parsonA, parsonB) => (parsonA[0] > parsonB[0] ? 1 : -1)).map(person => `
        <tr>
          <td><mark>${person[0]}</mark></td>
          <td>${person[1]}</td>
        </tr>
      `).join('')}
    </table>
  </details >
</div >
  `;

containerExercises.innerHTML += exerciseSeven;

// EXERCISE 8: REDUCE +
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];
const instances = data.reduce((accumulator, currentValue) => {
  if (accumulator[currentValue]) {
    accumulator[currentValue] += 1;
  } else {
    accumulator[currentValue] = 1;
  }
  return accumulator;
}, {});

const exerciseEight = `
<div class="exercises--exercise">
  <details>
    <summary>
      Sum up the instances of a set of data
      </summary>
      Data: ${data.map(datum => `<span>${datum}</span>`).join(', ')}
    <table>
      <tr>
        <th>Word</th>
        <th>Instances</th>
      </tr>
      ${Object.entries(instances).sort((entryA, entryB) => (entryA[1] > entryB[1] ? -1 : 1)).map(entry => `
        <tr>
          <td>${entry[0]}</td>
          <td><mark>${entry[1]}</mark></td>
        </tr>
      `).join('')}
    </table >
  </details >
</div >
  `;

containerExercises.innerHTML += exerciseEight;


// for the silly button, attach an event listener which fires a function to toggle open/ close all details element
const button = document.querySelector('button');

function handleToggle(e) {
  const { target } = e;
  const { textContent } = target;
  const details = document.querySelectorAll('details');
  // toggle open/close depending on whether the button contains the work open
  if (/open/gi.test(textContent)) {
    target.textContent = 'Toggle Close';
    details.forEach((detail) => { detail.setAttribute('open', true); });
  } else {
    target.textContent = 'Toggle Open';
    details.forEach((detail) => { detail.removeAttribute('open'); });
  }
}

button.addEventListener('click', handleToggle);
