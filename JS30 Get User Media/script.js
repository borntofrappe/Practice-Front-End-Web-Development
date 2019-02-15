// ACTUAL code responsible for the feat
/** necessary elements
 * canvas
 * button
 * container diplaying the photos
 */
const camera = document.querySelector('main.camera');
const canvas = camera.querySelector('canvas.camera__feed');
const context = canvas.getContext('2d');
const click = camera.querySelector('button.camera__click');
const photos = document.querySelector('div.photos');

// integer to keep track of the timeout for the silly animation on the button
let timeoutID = 0;

/* function taking as input a video element and including its value in the canvas element
*/
function videoToCanvas(video) {
  // constantly send a frame of the video to the canvas element
  setInterval(() => {
    /* arguments of draw image
    - image or video
    - x and y coordinate of where to begin the drawing
    - width and height
    */
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }, 16);
}


/* function to retrieve the video
through navigator.mediaDevices.getUserMedia()
it is possible to specify options through an object
the call returns a promise, with a stream if access to the webcam is granted
*/

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((mediaStream) => {
      // console.log(mediaStream);

      // create a video element
      const video = document.createElement('video');
      // include the stream through the srcObject (window.URL.createObjectURL() is apparently deprecated)
      video.srcObject = mediaStream;
      // play the video
      video.play();

      // call the function to take the video element and include its result in the canvas element
      videoToCanvas(video);
    })
    // in case permission is denied, draw a placeholder shape on the canvas
    // just to have the click produce an image of something
    .catch((err) => {
      console.error(`Err: ${err}`);
      context.fillRect(0, 0, 100, 100);
    });
}

getVideo();


/* function called when clicking the .camera__click button
- take a picture from the canvas elements and inject the image in the container below it
- add and remove a class of click on the camera, as to animate the canvas element to fake a shutter
*/
function handleClick() {
  // create an image from the canvas
  // return value of toDataURL() is base 64 code making up the image
  const data = canvas.toDataURL('image/jped');

  // create a link to allow and download the specific image
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'Picture of me');

  // nest in the link the image using the data in the src attribute
  link.innerHTML = `
    <img src=${data} alt="Picture of me" />
  `;

  // add the link in the .photos container
  photos.insertBefore(link, photos.firstChild);


  // silly animation on the canvas element
  camera.classList.add('click');
  click.removeEventListener('click', handleClick);

  timeoutID = setTimeout(() => {
    camera.classList.remove('click');
    click.addEventListener('click', handleClick);

    clearTimeout(timeoutID);
  }, 20);
}

click.addEventListener('click', handleClick);
