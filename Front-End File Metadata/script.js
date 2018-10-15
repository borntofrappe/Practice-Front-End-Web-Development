// create an array of possible types
const fileType = [
  'text/plain',
  'text/html',
  'image/jpeg',
  'image/png',
  'audio/mpeg',
  'video/mp4'
];

// select the paragraph detailing the file type
// every 5s change the text of the paragraph to one random type
// every 5s and after 2s, to match the CSS animation
const fileTypeParagraph = document.querySelector('.file p');

const timeoutID = setTimeout(() => {
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * fileType.length);
    fileTypeParagraph.textContent = fileType[randomIndex];
  }, 5000);
  clearTimeout(timeoutID);
}, 2000);
