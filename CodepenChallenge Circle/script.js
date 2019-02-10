// target the canvas element
const canvas = document.querySelector('canvas');
// retrieve a 2d rendering context
const context = canvas.getContext('2d');
// retrieve the sizes of the canvas
const { width, height } = canvas;

// create a circle through the Path2D object, to have a reference to it
const circle = new Path2D();

// utility function rounding up numbers
const round = num => Math.round(num);

// describe how to draw the triangles and the circle in two separate functions, as to draw them whenever needed
function drawCorners(color) {
  // when drawing a path it is necessary to preface the path commands with the beginPath() function
  context.beginPath();
  // set color
  context.fillStyle = color;
  // move to the top left and draw lines to the right, then towards the bottom left
  context.moveTo(0, 0);
  context.lineTo(75, 0);
  context.lineTo(0, 75);
  // move to the bottom right and draw a triangle mirroring the previous one
  // moveTo doesn't draw anything, it just moves the reference
  context.moveTo(width, height);
  context.lineTo(width - 75, height);
  context.lineTo(width, height - 75);
  // set the shapes to be filled
  context.fill();
}

// to draw a circle, use the instance of the Path2d to render the circle
function drawCircle(color) {
  circle.arc(width / 2, height / 2, height / 3, 0, Math.PI * 2, true);
  context.strokeStyle = color;
  context.lineWidth = '10';
  context.stroke(circle);
}


// concering user input
// create global variables to keep track of the cursor position and the last coordinates held by such cursor
// the idea is to draw only when the cursor is down and moving on the canvas
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// create a variable to check whether something has been drawn in the canvas
let hasBeenDrawn = false;


/* SCORE SYSTEM */
/* the idea is to give a score up to 100 according to the overlap between the path and the circle displayed in the middle of the canvas
this score is computed considering
- the lenght of the path drawn, vis a vis the circumference of the circle
- the proportion of time the cursor overlaps with the circle, vis a vis the total number of times the event is fired
it might be an imperfect metric, but it does provide a rough estimate of how much of the circle is drawn with the cursor
! there exist a possibility that the length of the path overshoots the circumference, so remember to cap this value as to avoid score values > 100
*/
const scoring = {
  overlap: {
    value: 0,
    total: 0
  },
  length: {
    value: 0,
    total: round(height / 3 * 2 * Math.PI)
  }
};

// function called in response to the mousedown event
function handleDown(e) {
  // set drawing to true and update the coordinates to draw from the specified point
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

// function called in response to the mousemove event
function handleMove(e) {
  // if the cursor is down
  if (isDrawing) {
    // retrieve the coordinates of the cursor
    const { offsetX, offsetY } = e;

    /* OVERLAP
    - always increment overlap.total
    - increment overlap.value if the cursor is actually on top of the shape
    this is achieved through the context.isPointInStroke() function
    */
    scoring.overlap.total += 1;
    if (context.isPointInStroke(circle, offsetX, offsetY)) {
      scoring.overlap.value += 1;
    }

    /* LENGTH
    - the total is fixed to be the circumference of the circle
    - the value is updated with the distance between the existing and absolute point (in absolute terms)
    */
    // compute the length considering both the different in x and y coordinate
    // while imperfect, the pythagorean can provide this measure (it represents the lenght of the straight line connecting the two points)
    // given the frequency with which the event gets fired, the measure is not that far off from considering only straight lines
    const [diffX, diffY] = [offsetX - lastX, offsetY - lastY];
    scoring.length.value += round(Math.sqrt(diffX * diffX + diffY * diffY));

    /* DRAWING */
    // set hasBeenDrawn to true
    hasBeenDrawn = true;
    // start drawing from the last coordinates to the current ones
    context.beginPath();

    context.strokeStyle = 'rgba(65, 207, 219, 1)';
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = '10';

    context.moveTo(lastX, lastY);
    context.lineTo(offsetX, offsetY);
    context.stroke();

    // update the coordinates
    [lastX, lastY] = [offsetX, offsetY];
  }
}


// function called in response to the mouseup event
// the idea is to here remove all event listeners and animate into the screen a modal
// this modal displays information on the screen connected to the shape that has been drawn
// it also contains a button, which allows to make the modal disappear and restart from the setup canvas
function handleUp() {
  // set is drawing back to false
  isDrawing = false;
  // check if something has been drawn through the specified boolean
  if (hasBeenDrawn) {
    // remove the event listener
    canvas.removeEventListener('mousedown', handleDown);
    canvas.removeEventListener('mousemove', handleMove);
    canvas.removeEventListener('mouseup', handleUp);


    /* introduce the modal, with the following structure
    <div class="result">
      <h2></h2> <-- comment the score
      <h1></h1> <-- show the actual score
      <button></button> <-- button removing the modal, resetting the canvas
    </div>
    */
    const result = document.createElement('div');
    result.classList.add('modal');

    // for the structure of the container, use the innerHTML property alongside backticks
    // compute first the values to be displayed on screen

    // compute the score based on the proportion between value and total, for the overalp and the length
    const score = round(Math.min(scoring.overlap.value / scoring.overlap.total, 1) * (scoring.length.value / scoring.length.total) * 100);
    // describe a message according to the score value
    const message = score > 90 ? 'Excellent' : score > 65 ? 'Congrats' : score > 45 ? 'Nice' : score > 5 ? 'At least you tried' : 'Did you try?';

    // for the headings include a color ranging from red to green, and according to the score
    // using the [0-120] range in the hue of hsl
    result.innerHTML = `
      <div class="modal--message" style="color: hsl(${score / 100 * 120}, 70%, 20%)">
        <h2>${message}</h2>
        <h1>
          <sup>${score}</sup>
          /
          <sub>100</sub>
        </h1>
      </div>
    `;

    // for the button, as to easily attach an event listener, create the element through the document.createElement function and append it to the container
    const button = document.createElement('button');
    button.textContent = 'Try again';
    result.appendChild(button);

    document.querySelector('body').appendChild(result);

    // once the result container has done animating, attach an event listener on the button element, to animate it out of view
    // to transition the modal out and reset the canvas

    result.addEventListener('animationend', () => {
      // ! set the animation to none, otherwise the animationend event would be fired immediately
      // conflicting animations
      result.style.animation = 'none';
      // attach the event listener to revert the animation
      button.addEventListener('click', () => {
        result.style.animation = 'introduce 0.75s cubic-bezier(0.24, 1.2, 0.56, 1.55) reverse both';
        // once the new animation is completed, remove the container and reset the canvas
        result.addEventListener('animationend', () => {
          document.querySelector('body').removeChild(result);
          setupCanvas();
        });
      });
    });

    // set hasBeenDrawn back to false
    hasBeenDrawn = false;
  }
}

/* describe a function setting up the scene
the idea is to clear the canvas once a shape has been drawn through user input
this function allows to 'reset' the empty canvas to the described structrue
*/
function setupCanvas() {
  // reset the scoring values
  scoring.overlap.value = 0;
  scoring.overlap.total = 0;
  scoring.length.value = 0;

  // clear the canvas and the scene
  context.clearRect(0, 0, width, height);

  // each function accepts a color to style the shape
  drawCorners('rgb(65, 207, 219)');
  drawCircle('rgb(65, 207, 219, 0.35)');

  // set up the event listeners
  canvas.addEventListener('mousedown', handleDown);
  canvas.addEventListener('mousemove', handleMove);
  canvas.addEventListener('mouseup', handleUp);
}

// immediately call the function setting up the scene
setupCanvas();


// MODAL
// code connected to the button element, to prop up a modal explaining the project with a couple of questions and answers
const buttonModal = document.querySelector('button.faq');

function handleClick() {
  // remove the event listener from the button.modal, as to avoid adding multiple modals
  // ! remember to re-listen when the modal is dismissed
  buttonModal.removeEventListener('click', handleClick);

  // create a container for the modal, replicating much of the logic used for the .result modal
  const faq = document.createElement('div');
  // include a separate class to make the modal larger (and to accommodate for more text)
  faq.classList.add('modal', 'modal--lg');

  /* modal structure
    <ul>
      <li></li> <-- one list item per question
    </ul>

    <button></button> <-- dismissing the modal
  */
  faq.innerHTML = `
    <ul>
      <li>
        <p>What's this?</p>
        <p>It's an experiment with the Canvas API, inspired by the weekly #codepenchallenge, not to mention #javascript30.</p>
      </li>
      <li>
        <p>I mean, what is it supposed to do?</p>
        <p>On its own very little. With your input, it's supposed to evaluate how much you can replicate the circle you see on the page.</p>
      </li>
      <li>
        <p>How do you figure?</p>
        <p>We consider the length of your drawing, not to mention how much you stayed on the line. We then give you a score based on both considerations.</p>
      </li>
      <li>
        <p>If you consider the length, can I score more than 100?</p>
        <p>Nice catch mate, in theory yes. But really, no. We though of that and capped the score to the sound, round number.</p>
      </li>
    </ul>
  `;


  const dismissButton = document.createElement('button');
  dismissButton.textContent = 'Dismiss';
  faq.appendChild(dismissButton);

  document.querySelector('body').appendChild(faq);

  // like for the result container, wait for the animation to be complete before adding an event listener to the button
  faq.addEventListener('animationend', () => {
    faq.style.animation = 'none';
    // attach the event listener to dismiss the modal
    dismissButton.addEventListener('click', () => {
      faq.style.animation = 'introduce 0.75s cubic-bezier(0.24, 1.2, 0.56, 1.55) reverse both';
      // once the new animation is completed, remove the container and re-attach the event listener to the button.modal
      faq.addEventListener('animationend', () => {
        document.querySelector('body').removeChild(faq);
        buttonModal.addEventListener('click', handleClick);
      });
    });
  });
}

buttonModal.addEventListener('click', handleClick);
