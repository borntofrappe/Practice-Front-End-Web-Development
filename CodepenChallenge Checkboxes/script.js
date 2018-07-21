const body = document.querySelector("body");
/* inject in the DOM absolute positioned elements for: 
- a button to play / stop the game
- two span elements for the point icons
- a paragraph for the text representing the timer
- a span to perfectly center the paragraph 
- two span elements fror the heart icons 
- a header in which to show the finishing condition

the logic of the game is simple
- hit play 
- check intput[type="checkbox"]

each time you manage to check the checkbox, get a point 
each time you don't, in the allocated time, lose a heart

score two points: **victory**
lose two hearts: **loss** 
*/
body.innerHTML += "<div><button></button><span class='point'></span><span class='point'></span><p>10</p><span class='filler'></span><span class='heart'></span><span class='heart'></span></div><h1>Check me if you can 🤗</h1>";


/*
create an object storing information about the game
** points, used to track the progress of the game and update the appearance of the check box 
** hearts, used to check if the player loses (remove a heart each time the timer hits 0)
** playing, used to alternatively begin and stop the game when clicking the button
** intervalTimerID, to track the interval and clear the existing interval if a new one is triggered as the old one is still running
** intervalCheckboxID, to track the interval used to move the checkbox
*/

const game = {
  points: 0,
  hearts: 2,
  playing: false,
  intervalTimerID: 0,
  intervalCheckboxID: 0
}


// listen for a click on the checkbox, at which point change the appearance of the input (if the game is ongoing) 
// if the game is not ongoing prevent any action on the checkbox
const checkbox = document.querySelector('input[type="checkbox"');
checkbox.addEventListener("click", handleCheckbox);

/*
create a function which updates the appearance of the checkbox 
depending on the value of game.points, include the indeterminate, checked and unchecked stages
*/
function handleCheckbox(e) {
  if(game.playing) {
    // clear the interval included for the timer, to avoid overlapping intervals
    clearInterval(game.intervalTimerID);

    // depending on the value of game.points, include the indeterminate / checked / unchecked appearance for the checkbox
    switch(game.points) {
      case 0: 
        // for the first point, include the indeterminate state
        e.target.indeterminate = true;
        // start the timer of 10s, which runs as long as there are hearts
        startTimer(11);
        // increment the point and include the points icon
        scorePoint();
        break;
      case 1:
        // for the second point, include the checked state
        e.target.checked = true;
        // increment the point and include the points icon
        scorePoint();
        // as the checkbox is now checked, include a victory messae
        handleFinish("victory");
        break;
    }
  }
  else {
    e.preventDefault();
  }
}

// create a function to account for the point (increase the score, show the point)
function scorePoint() {
  // show the span with the class of point, one at a time leveraging the game.point value  
  let spanPoints = document.querySelectorAll("span.point");
  spanPoints[game.points].style.opacity = 1;
  // increment game.point
  game.points++;
}


// listen for a click on the play/stop button at which point start the 10s timer
const button = document.querySelector("button");
button.addEventListener("click", handleButton);

// create a function to handle the click on the play/stop button
function handleButton(e) {
  // set the checkbox back to unchecked
  checkbox.indeterminate = false;
  checkbox.checked = false;
  // clear any existing interval
  clearInterval(game.intervalTimerID);

  // remove the text from the header showing the result
  let header = document.querySelector("h1");
  header.textContent = "";

  // if the game is ongoing, stop the game and update the button's background to math
  if(game.playing) {
    game.playing = false;
    button.style.background = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458334 26.458334'><path d='M2.646 1.323L22.737 12.36 2.646 23.396z' fill='%23cccccc'/><path d='M3.721 3.062l20.091 11.037-20.09 11.036z' fill='%23ffffff'/></svg>\")";
    button.style.backgroundSize = "cover";

    // stop the checkbox from moving 
    stopCheckbox();
  }
  // if the game is not ongoing, play the game resetting the game settings and updating the button's background to match 
  else {
    // call a function to move the checkbox, as long as the game is ongoing
    moveCheckbox();

    game.playing = true;
    button.style.background = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458334 26.458334'><path fill='%23ccc' d='M2.646 1.984h19.296v20.88H2.646z'/><path fill='%23fff' d='M4.516 3.594h19.296v20.88H4.516z'/></svg>\")";
    button.style.backgroundSize = "cover";

    // reset the game's settings
    game.points = 0;
    game.hearts = 2;
    // show all heart icons, hide all point icons
    let hearts = document.querySelectorAll("span.heart");
    hearts.forEach(heart => {
      heart.style.opacity = 1;
    });
    let points = document.querySelectorAll("span.point");
    points.forEach(point => {
      point.style.opacity = 0;
    });

    // start a timer to count down from 10, as long as there are hearts left
    startTimer(10);
  }
  
}

// create a function to count down from 10, as long as there are hearts left
// one second at a time, while updating the paragraph's text
function startTimer(seconds) {  
  let timerSecs = seconds;
  let timer = document.querySelector("p");
  // immediately set the timer to be 10, without waiting one second to update the timer
  timer.textContent = 10;
  
  game.intervalTimerID = setInterval(() => {
    // each second reduce the 10s 
    timerSecs--;
    // show the zero-padded number
    timer.textContent = (timerSecs < 10) ? `0${timerSecs}` : `${timerSecs}`;
    // when hitting zero clear the interval and handle the circumstance
    if(timerSecs == 0) {
      clearInterval(game.intervalTimerID);      
      handleZero();
    }
  }, 1000);
}

// create a function to account for the timer hitting zero
function handleZero() {
  // select all heart icons and account for the different lives left
  let hearts = document.querySelectorAll("span.heart");
  switch(game.hearts) {
    // with two lives left, remove the second heart icon and deduct a heart
    // restart the timer from 11s (to show 10s first)
    case 2: 
      hearts[1].style.opacity = 0;
      game.hearts--;
      startTimer(11);
      break;
    // with one life left, remove the first heart icon as well and deduct a heart
    // handle the loss 
    case 1:
      hearts[0].style.opacity = 0;
      game.hearts--;
      handleFinish("loss");
      break;
  }
}


function handleFinish(finish) {
  // stop the checkbox from moving 
  stopCheckbox();

  // terminate the game 
  game.playing = false;
  // reset the appearance of the icon back to its original state
  // checkbox.checked = false;
  button.style.background = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 26.458334 26.458334'><path d='M2.646 1.323L22.737 12.36 2.646 23.396z' fill='%23cccccc'/><path d='M3.721 3.062l20.091 11.037-20.09 11.036z' fill='%23ffffff'/></svg>\")";
  button.style.backgroundSize = "cover";

  // include text in the header depending on the finishing condition
  let header = document.querySelector("h1");
  if(finish == "victory") {
    header.textContent = "Congrats! You Won 😉🏆"
  }
  else if(finish == "loss") {
    header.textContent = "Cue sad music 😔🎷"
  }
}

// create a function to move the checkbox 
function moveCheckbox() {
  /*
  move the checkbox with the following logic:
  - start from somewhere in the available viewport (0-99 range for the top and left values)
  - set an interval which increments the top and left value by a defined variable 
    this is at first equal to 1 and then, each time the checkbox hits the edges of the window, is a random number between 0 and 1.99
  - when hitting the edges of the window (100 for the top or left values), flip the direction through a custom variable 
    the direction is at first a random pick between 1 and -1, then its the opposite every time around, to keep the checkbox in the visible area
  */
  let top = Math.floor(Math.random()*100);
  let left = Math.floor(Math.random()*100);
  let counterTop = 1;
  let counterLeft = 1;
  let directionTop = (Math.random() > 0.5) ? 1 : -1;
  let directionLeft = (Math.random() > 0.5) ? 1 : -1;

  game.intervalCheckboxID = setInterval(() => {
    checkbox.style.top = `${top}%`;
    checkbox.style.left = `${left}%`;

    top += counterTop * directionTop;
    left += counterLeft * directionLeft;
    
    
    if(top >= 100 || top <= 0) {
      counterTop = Math.random() * 2;
      counterLeft = Math.random() * 2;
      directionTop *= -1;
    }
    if(left >= 100 || left <= 0) {
      counterTop = Math.random() * 2 + 1;
      counterLeft = Math.random() * 2 + 1;
      directionLeft *= -1;
    }
  }, 24);
}
function stopCheckbox() {
  clearInterval(game.intervalCheckboxID);
}