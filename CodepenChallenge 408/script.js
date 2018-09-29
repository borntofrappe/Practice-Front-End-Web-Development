/*
target the elements to be modified throughout the animation
- the text element describing the timer
- the group element identifying the trophy-wielding server
- the group identifying the trophy itself
*/
const timer = document.querySelector("#svg-timer tspan");
const server = document.querySelector("#svg-server");
const trophy = document.querySelector("#svg-trophy");

/* initialize a few variables for the project
interval id to update and clear the running interval
seconds to keep track of the timer's seconds
speed to increase the speed of the animation (by reducing the interval frequency)
speedIndex to target each successive speed nested in the array
*/
let intervalID = 0,
  seconds = 0;

const button = document.querySelector("button");
const speeds = [1, 5, 10, 15, 20, 40];
let speedIndex = 0;

// create a function which starts the timer at the selected speed
function startTimer(speed) {
  // clear any existing interval
  clearInterval(intervalID);
  // compute the frequency of the interval as 1s divided by the speed (to have the interval run every second or fraction of a second)
  let intervalSpeed = 1000/speed;

  // start an interval updating the ID variable
  intervalID = setInterval(() => {
    // retrieve the number of seconds from the timer
    seconds = parseInt(timer.textContent);

    /* update the appearance of the trophy at selected thresholds
    start by removing the leaves around the trophy, then the star, the top of the goblet, the handles
    alter the color of the goblet to visualize some rust
    */
    switch(seconds) {
      case 20:
        trophy.querySelector("#trophy--leaves").style.transition = "all 0.5s ease-out";
        trophy.querySelector("#trophy--leaves").style.opacity = 0;
        trophy.querySelector("#trophy--leaves").style.visibility = "hidden";
        break;

      case 80:
        trophy.querySelector("#trophy--star").style.transition = "all 0.5s ease-out";
        trophy.querySelector("#trophy--star").style.opacity = 0;
        trophy.querySelector("#trophy--star").style.visibility = "hidden";
        break;

      case 150:
        trophy.querySelector("#goblet--top").style.transition = "all 0.5s ease-out";
        trophy.querySelector("#goblet--top").style.opacity = 0;
        trophy.querySelector("#goblet--top").style.visibility = "hidden";
        break;

      case 220:
        trophy.querySelector("#trophy--goblet").style.transition = "all 0.5s ease-out";
        trophy.querySelector("#trophy--goblet").style.fill = "#f0bc5c";
        break;

      case 280:
          trophy.querySelector("#trophy--handles").style.transition = "all 0.5s ease-out";
          trophy.querySelector("#trophy--handles").style.opacity = 0;
          trophy.querySelector("#trophy--handles").style.visibility = "hidden";
          break;

      case 340:
        trophy.querySelector("#trophy--goblet").style.transition = "all 0.5s ease-out";
        trophy.querySelector("#trophy--goblet").style.fill = "#df8f28";
        break;

    }

    // when reaching the 408 mark clear any existing interval and remove the server from view, revealing the card underneath
    if(seconds === 408) {
      clearInterval(intervalID);
      server.style.transition = "transform 5s ease-out";
      server.style.transform = "translateX(100vw)";
    }
    // else increase the timer's seconds by one
    else {
      timer.textContent = seconds + 1;
    }

  }, intervalSpeed);
}

// immediately start the timer with a speed of 1 second
startTimer(1);

// add an event listener on the button
button.addEventListener("click", changeSpeed);

/*
create a function to update the speed of the interval depending on the value of the selected array item
progressively speeding up the interval
*/
function changeSpeed() {
  speedIndex++;
  if(speedIndex === speeds.length) {
    speedIndex = 0;
  }
  // display the updated pace
  button.textContent = `${speeds[speedIndex]}x`;

  // call the function running the interval, with the updated frequency
  startTimer(speeds[speedIndex]);
}