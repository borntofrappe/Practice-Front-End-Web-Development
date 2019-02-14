// target the camera container and the button triggering a picture
const camera = document.querySelector('main.camera');
const click = camera.querySelector('button.camera__click');
// integer to keep track of the timeout
let timeoutID = 0;

/* function called when clicking the click button
add a class of .click to the main container and remove it rapidly soon afterwards
remove also and reattach then the event listener on the button, to avoid overlapping events
*/
function handleClick() {
  camera.classList.add('click');
  click.removeEventListener('click', handleClick);

  timeoutID = setTimeout(() => {
    camera.classList.remove('click');
    click.addEventListener('click', handleClick);

    clearTimeout(timeoutID);
  }, 20);
}

click.addEventListener('click', handleClick);
