// target the button to pick each bone as well as the skeleton where each paragraph is included
// by including the paragraph elements **before** the div making up the bones
// AND by leveraging the nth-child() selector for these last elements
// each bone is made "disappearing"
// this because progressively each element is no longer the nth-child()
const button = document.querySelector('button');
const skeleton = document.querySelector('.skeleton');
// include a variable to keep track of the bones picked
// this to remove the click listener after all bones are pricked (or maybe one more)
let bonesPicked = 0;
const bones = 10;
const max = bones + 1;

const pickBone = () => {
  bonesPicked += 1;
  // if all bones have been picked, alter the button's text
  if (bonesPicked === 10) {
    button.textContent = 'picked!';
  }
  // if the maximum number of clicks has been registered, remove the event listener
  // alter the button's text once more
  if (bonesPicked === max) {
    button.textContent = 'happy halloween';
    button.removeEventListener('click', pickBone);
  } else {
    // while there are still bones to be picked, create a paragraph element
    // included it as the first child element of the skeleton container
    const pickedBone = document.createElement('p');
    skeleton.prepend(pickedBone);
  }
};

// register the click event and fire the function when pressing the button
button.addEventListener('click', pickBone);
