// target the style element, in which to include the CSS property value pairs and the card, to be styled accordingly
const style = document.querySelector(".code pre style");
const card = document.querySelector(".card");

// include the script, including both comments and property value pairs making up the animation
script = `
/* Let us style this page a bit first */
@import url("https://fonts.googleapis.com/css?family=Fira+Code");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.container {
  height: 100vh;
  background: linear-gradient(to top right, #252525, #373737);
  color: #eee;
}
.code style {
  font-family: 'Fira Code', monospace;
  font-size: 0.7rem;
  background: rgba(255,255,255,0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.card {
  width: 40vw;
  height: 50vh;
  background: #fff;
}

/* A bit of proper layout then */
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}


/* 
And now for the animation itself...
CSS allows to easily animate HTML elements
*/

/* First, define the **animation**
detailing
  * the name of the animation
  * how long it will last
  * a possible delay
  * how many times it should be repeated
  * an easing function
  * which values the element should assume
  (in relation to those set in the animation)
*/

.card {
  animation: rollUp 4s 1s infinite cubic-bezier(.22,-.3,.68,1.44) both;
}

/* Then, create the animation itself
  * with the **keyframes** keyword
  * specifying property-value pairs at different intervals
*/
@keyframes rollUp {
  0% {
    opacity: 0;
    transform: translateY(-50vh);
  }
  10% {
    opacity: 0;
  }
  20% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* That's all it takes */
.card {
  position: relative;
}
.card:before {
  content: "Neat, ain't it? ;)";
  color: #252525;
  font-family: 'Fira Code', monospace;
  font-size: 2rem;
  font-weight: bold;
  position: absolute;
  top: 1rem;
  left: 1rem;
}
`;


// create a simple interval which interatively icludes one additional character of the script, until completion
let counter = 0;

let intervalID = setInterval(() => {
  counter++;
  style.textContent = script.substring(0, counter);
  // keep the focus of the style tags to the bottom of the element
  style.scrollTop = style.scrollHeight;
  if(counter > script.length) {
    clearInterval(intervalID);
  }
}, 30);
