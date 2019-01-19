// target the two elements nesting the content of the panel and the display
const editorPanel = document.querySelector('.editor__panel');
const editorDisplay = document.querySelector('.editor__display');

// function adding a class of active on the button passed as argument, and removing it from all other buttons
function handleActive(selectedButton) {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => { button === selectedButton ? button.classList.add('active') : button.classList.remove('active'); });
}
// function adding a 0 to integers smaller than 10
const zeroPad = integer => (integer >= 10 ? integer : `0${integer}`);

/* datasets used in the exercises (and shown in the data folder)
arrays for
  - inventors
  - people
  - boulevards
  - instances

*/
const data = {
  inventors: [
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
  ],
  people: ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'],
  boulevards: [
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
  ],

  instances: ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck']
};

// dataset created for the exercises and the solution
// detailing a simple structure through markup syntax, adding also JavaScript in the wrapping backticks to run the actual code behind the exercises
const exercises = {
  filter: `
      <h1>array.filter</h1>

      <h2>Assignment</h2>

      Using the array of inventors, filter the list for those particular individuals who were born in the 1500's

      <h2>Snippet</h2>

      <code>const filter = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600)</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th><mark>Year of birth</mark></th>
        </tr>
        ${data.inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600).map(inventor => `
          <tr>
            <td>${inventor.first}</td>
            <td>${inventor.last}</td>
            <td>${inventor.year}</td>
          </tr>
        `).join('')}
      </table>
  `,
  map: `
      <h1>array.map</h1>

      <h2>Assignment</h2>

      Create an array nesting one string for each inventor, corresponding to his/her first and last name

      <h2>Snippet</h2>

      <code>const map = inventors.map(inventor => \`\${inventor.first}\ \${inventor.last}\`)</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th><mark>Full name</mark></th>
        </tr>
        ${data.inventors.map(inventor => `
          <tr><td>${inventor.first} ${inventor.last}</td></tr>
        `).join('')}
      </table>
  `,
  sort: `
      <h1>array.sort</h1>

      <h2>Assignment</h2>

      Sort the inventors by birthdate, from oldest to youngest

      <h2>Snippet</h2>

      <code>const sort = inventors.sort((inventorA, inventorB) => (inventorA.year > inventorB.year ? 1 : -1))</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th><mark>Birthdate</mark></th>
        </tr>
        ${data.inventors.sort((inventorA, inventorB) => (inventorA.year > inventorB.year ? 1 : -1)).map(inventor => `
          <tr>
            <td>${inventor.first}</td>
            <td>${inventor.last}</td>
            <td>${inventor.year}</td>
          </tr>
        `).join('')}
      </table>
  `,
  reduce: `
      <h1>array.reduce</h1>

      <h2>Assignment</h2>

      Compute the total number of years lived by all inventors

      <h2>Snippet</h2>

      <code>const reduce = inventors.reduce((accumulator, currentValue) => accumulator + (currentValue.passed - currentValue.year), 0)</code>

      <h2>Result</h2>

      Total age: <mark>${data.inventors.reduce((accumulator, currentValue) => accumulator + (currentValue.passed - currentValue.year), 0)}</mark>
  `,
  sortPlus: `
      <h1>array.sort</h1>

      <h2>Assignment</h2>

      Sort the inventors by years lived

      <h2>Snippet</h2>

      <code>const sort = inventors.sort((inventorA, inventorB) => ((inventorA.passed - inventorA.year) < (inventorB.passed - inventorB.year) ? 1 : -1))</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th><mark>Years lived</mark></th>
        </tr>
        ${data.inventors.sort((inventorA, inventorB) => ((inventorA.passed - inventorA.year) < (inventorB.passed - inventorB.year) ? 1 : -1)).map(inventor => `
          <tr>
            <td>${inventor.first}</td>
            <td>${inventor.last}</td>
            <td>${inventor.passed - inventor.year}</td>
          </tr>
        `).join('')}
      </table>
  `,
  filterPlus: `
      <h1>array.filter</h1>

      <h2>Assignment</h2>

      Using the boulevards array, create a list of boulevards which contain 'de' anywhere in the name

      <h2>Snippet</h2>

      <code>const filter = boulevards.filter(boulevard => /de/.test(boulevard))</code>

      <h2>Result</h2>

      <ul>
        ${data.boulevards.filter(boulevard => /de/.test(boulevard)).map(boulevard => `
          <li>${boulevard.replace(/de/gi, '<mark>de</mark>')}</li>
        `).join('')}
      </ul>
  `,
  sortPlusPlus: `
      <h1>array.sort</h1>

      <h2>Assignment</h2>

      Using the people array, sort the people alphabetically by last name

      <h2>Snippet</h2>

      <code>const sort = people.map(person => person.split(', ')).sort((parsonA, parsonB) => (parsonA[0] > parsonB[0] ? 1 : -1))</code>

      <h2>Result</h2>

      <table>
        <tr>
          <th><mark>Last name</mark></th>
          <th>First name</th>
        </tr>
        ${data.people.map(person => person.split(', ')).sort((parsonA, parsonB) => (parsonA[0] > parsonB[0] ? 1 : -1)).map(person => `
          <tr>
            <td>${person[0]}</td>
            <td>${person[1]}</td>
          </tr>
        `).join('')}
    </table>
  `,
  reducePlus: `
      <h1>array.reduce</h1>

      <h2>Assignment</h2>

      Using the instances array, count the number of instances of each item

      <h2>Snippet</h2>

      <code>const instancesObject = instances.reduce((accumulator, currentValue) => {<br/>
        accumulator[currentValue] ? accumulator[currentValue] += 1 : accumulator[currentValue] = 1;<br/>
        return accumulator;<br/>
      }, {})</code>

      <h2>Result</h2>

      <table>
      <tr>
        <th>Word</th>
        <th><mark>Instances</mark></th>
      </tr>
      ${Object.entries(data.instances.reduce((accumulator, currentValue) => {
    accumulator[currentValue] ? accumulator[currentValue] += 1 : accumulator[currentValue] = 1;
    return accumulator;
  }, {})).sort((entryA, entryB) => (entryA[1] > entryB[1] ? -1 : 1)).map(entry => `
        <tr>
          <td>${entry[0]}</td>
          <td>${entry[1]}</td>
        </tr>
      `).join('')}
    </table >

  `
};

// function displaying the structures found in the data folder (and in the data object)
// receiving as argument code and including it in the HTML of the display
function displayData(dataStructure) {
  editorDisplay.innerHTML = `<pre class="display--data"><code>${dataStructure}</code></pre>`;
}
// function called in response to a click event on one of the buttons in the data folder
// retrieving the data-value attribute and populating the HTML with the matching data structure
function handleData(target) {
  const dataValue = target.getAttribute('data-value');
  displayData(`const ${dataValue} = ${JSON.stringify(data[dataValue], null, 10)}`);
  // function highlighting the selected button
  handleActive(target);
}

// functijon displaying the exercises found in the exercise folder (and in the exercises object)
// receiving as argument the value wrapped in between backticks and injecting it in the display
function displayExercise(exerciseStructure) {
  editorDisplay.innerHTML = `
    <div class="display--exercise">
      ${exerciseStructure}
    </div>
  `;
}
// function called in response to a click event on one of the buttons in the exercise folder
// retrieving the data-value attribute and populating the HTML referring the object with the matching value
function handleExercise(target) {
  const dataValue = target.getAttribute('data-value');
  displayExercise(exercises[dataValue]);
  handleActive(target);
}

// by default call the displayExercise function to highlight one of the exercises
displayExercise(exercises.map);

// fill the panel to the left with two details element
// in these details element add the buttons for the data and the exercises
// ! be sure to reference the handleExercise and handleData functions in the onclick listener of the buttons
// ! add open to the details element which shows the exercise displayed bby default (through the displayExercise() function)
editorPanel.innerHTML = `
  <details class="panel--data">
    <summary>Data</summary>

    <div class="buttons">
      ${Object.keys(data).map(key => `
          <button onclick="handleData(this)" class="buttons--data" data-value=${key}>
            ${key}.js
          </button>
        `).join('')}
    </div>
  </details>

  <details open>
    <summary>Exercises</summary>


    <div class="buttons">
      ${Object.entries(exercises).map((entry, index) => `
          <button onclick="handleExercise(this)" class="buttons--exercise ${entry[0] === 'map' && 'active'}" data-value=${entry[0]}>
            ${zeroPad(index + 1)} ${entry[0]}.md
          </button>
        `).join('')}
    </div>
  </details>
`;
