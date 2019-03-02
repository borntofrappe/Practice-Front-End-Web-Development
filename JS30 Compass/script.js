// determine the number of seconds after which the goal is shown
const duration = 7.5;

// COMPASS
// target the compass
const compass = document.querySelector('.compass');
// target the needle
const needle = compass.querySelector('.needle');

// immediately include 4 <strong> elements indicating the directions
const directions = 'nesw';
directions.split('').forEach((direction) => {
  const strong = document.createElement('strong');
  strong.classList.add('direction');
  strong.setAttribute('data-direction', direction);
  strong.textContent = direction;
  compass.appendChild(strong);
});


// initialize a variable to update the rotation
let rotation = 0;
// use a variable to stop the animation of the compass after a while
// and to show the two text elements
let counter = 0;

// at an interval change the value of the rotation in an interval of values and rotate the compass accordingly
const intervalID = setInterval(() => {
  const orientation = Math.random() > 0.5 ? 1 : -1;
  const push = Math.random() * 25 * orientation;
  rotation += push;
  compass.style.transition = 'transform ease-out 0.5s';
  compass.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

  // rotate the needle even more, as to emulate how the compass is not fixed in place
  needle.style.transition = 'transform cubic-bezier(0.21,1.33,0.82,1.34) 0.5s';
  needle.style.transform = `translate(-50%, -50%) rotate(${rotation / 5}deg)`;

  // stop the rotation of the compass after the duration expressed for the animation
  // ! increase by 0.5 as the interval runs every half a second
  counter += 0.5;
  if (counter >= duration * 1.2) {
    // show the text elements by scaling them to size 1
    const svgText = document.querySelectorAll('svg text');
    svgText.forEach((text, index) => {
      text.style.transition = `transform 0.3s ${0.3 * index}s ease-out`;
      text.setAttribute('transform', 'scale(1)');
    });

    // remove any rotation on the needle
    needle.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    // clear the interval
    clearInterval(intervalID);
  }
}, 500);


// SVG
// target the svg
const svg = document.querySelector('svg');

// GOAL

// target the group making up the goal
const goal = svg.querySelector('g#goal');
// position the goal somewhere in the top right section of the svg
const goalX = Math.floor(Math.random() * 25 + 75);
const goalY = Math.floor(Math.random() * 5);
goal.setAttribute('transform', `translate(${goalX} ${goalY})`);

// consider the two path elements making up the goal, including their d attribute and applying a stroke-dasharray / stroke-dashoffset matching the lenght of each path
goal.querySelectorAll('path.x').forEach((x, index) => {
  const xLength = x.getTotalLength();
  x.setAttribute('stroke-dasharray', xLength);
  x.setAttribute('stroke-dashoffset', xLength);
  // animate the stroke-dashoffset property to 0 after the specified amount of time
  x.style.animation = `strikeGoal 1s ${duration + index * 0.25}s cubic-bezier(0.2,1,0.66,1) forwards`;
});


// TRAIL
// target the path making up the trail
const trail = svg.querySelector('path#trail');
// target the path overlapping the trail
const walk = svg.querySelector('path#walk');

// create the value for the d attribute of both, using bezier curves
// ! be sure to end where the goal is ultimately drawn, using goalX and goalY (incremented to consider the center of the X)
const d = `M 0 100 Q 0 ${(100 - goalY + 5) / 2} ${(goalX + 5) / 2} ${(100 - goalY + 5) / 2} T ${goalX + 5} ${goalY + 5}`;
trail.setAttribute('d', d);
walk.setAttribute('d', d);

// consider the length of one of the path elements
const walkLength = walk.getTotalLength();
// immediately set the stroke dash array property to the lenght of the path
// ! the idea is to have the stroke-dashoffset property arrive to this value, as to remove it from view
walk.setAttribute('stroke-dasharray', walkLength);
// change the stroke-dashoffset property ultimately picked up by the path element
// ! negative to remove it from the beginning of the path
walk.style.setProperty('--stroke-dashoffset', -walkLength);
// include the animation making use of the --stroke-dashoffset property to remove the overlapping path from view
walk.style.animation = `goToGoal ${duration}s linear forwards`;
