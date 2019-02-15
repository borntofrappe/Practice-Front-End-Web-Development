// ACTUAL code responsible for the feat
/** necessary elements
 * canvas in which to feed the stream
 * context of the canvas, to draw the video and shapes
 * width and height of the canvas, to easily include the values where needed
 * button to take a picture
 * container diplaying the photos
 */
const camera = document.querySelector('main.camera');
const canvas = camera.querySelector('canvas.camera__feed');
const { width, height } = canvas;
const context = canvas.getContext('2d');
const click = camera.querySelector('button.camera__click');
const photos = document.querySelector('div.photos');

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
    context.drawImage(video, 0, 0, width, height);
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
    // absolutely inspired by the MDN docs
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#Moving_the_pen
    .catch((err) => {
      context.fillStyle = '#BC9AC6';
      // two eyes atop the canvas
      context.beginPath();
      context.arc(width / 2 + height / 4, height * 1 / 4, height / 8, 0, Math.PI * 2, true);
      context.arc(width / 2 - height / 4, height * 1 / 4, height / 8, 0, Math.PI * 2, true);
      context.fill();
      context.closePath();

      // a simple nose below the eyes
      context.beginPath();
      context.arc(width / 2, height / 2, height / 16, 0, Math.PI, true);
      context.fill();
      context.closePath();

      // amused mouth
      context.beginPath();
      context.arc(width / 2, height * 3 / 4, height / 10, 0, Math.PI * 2, true);
      context.fill();
      context.closePath();
    });
}

// immediately call the function asking for user permission
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

}

click.addEventListener('click', handleClick);
