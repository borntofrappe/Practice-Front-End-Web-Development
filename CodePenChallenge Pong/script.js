// target the elements required for the project
/*
button to toggle the pong game 
left and right rectangles for the paddles

pong disk for the actual puck, animated to move around the screen
*/
const pongButton = document.querySelector('.pong');
const leftPaddle = document.querySelector('.rectangle--left');
const rightPaddle = document.querySelector('.rectangle--right');

const pongDisk = document.querySelector('.pong--disk');

// listen for a click event on the central pong button, at which point begin/stop the game
pongButton.addEventListener('click', togglePongGame);

// depending on whether the "game" has started or not, begin/ stop the game
function togglePongGame() {
    if(pongButton.classList.contains('playing')) {
        // remove event listener for the paddles, the class for the button and stop moving the disk
        window.removeEventListener('mousemove', handleMouseMove);
        pongButton.classList.remove('playing');
        stopPongDisk();
    }
    else {
        // add event listener, class for the button and start moving the disk
        window.addEventListener('mousemove', handleMouseMove);
        pongButton.classList.add('playing');
        movePongDisk();
    }
    
}

function handleMouseMove(event) {
    // event.clientX and event.clientY provide the X and Y coordinates of the page
    // window.innerHeight provides the height of the screen (Y <= window.innerHeight)
    // window.innerWidth provides the width of the screen (X <= window.innerWidth)

    // for the horizontal coordinate, all that is required is the knowledge of when the x coordinate crosses over the center of the screen
    let xCoor = event.clientX;
    let windowWidth = window.innerWidth;
    let windowHalfWidth = windowWidth/2;
    
    // for the vertical coordinate, a range from 0 to 100 is needed
    // this is created by dividing the value of .clientY by the height of the window (0.x) and multiplying this value by 100
    // the result is rounded to the nearest integer
    let yCoor = event.clientY;
    let windowHeight = window.innerHeight;
    // [0 - 100] interval for [top - bottom]
    let yInterval = Math.round(yCoor / windowHeight * 100);

    // move the left and right paddle depending on the position of the mouse pointer 
    if(xCoor <= windowHalfWidth) {
        // move the paddle according to the Y coordinate passed as argument
        moveleftPaddle(yInterval);
    }
    else {
        moverightPaddle(yInterval);
    }

}

// the [0-100] interval is perfectly suited for the CSS property of top; indeed the paddles are pushed from the top exactly by the amount described by the mouse pointer
function moveleftPaddle(yFromTop) {
    leftPaddle.style.top = yFromTop + '%';
}
function moverightPaddle(yFromTop) {
    rightPaddle.style.top = yFromTop + '%';

}

/* 
boundaries of the disk
0 - 100% horizontally and vertically

starting from the center, change the properties of top/right/bottom/left 

when hitting the boundaries, solely changing the direction makes for a repetitive/predictable movement
it would be best to include randomness, while at the same time maintaining a degree of "reasonable" change
[meaning the disk shouldn't change extremely its trajectory]

*/
function movePongDisk() {
    // place the disk in the middle of the screen, every time the function is called (at the start of the game && whenever a point is accomplished)
    pongDisk.style.left = "calc(50% - 28px/2)";
    pongDisk.style.top = "calc(50% - 28px/2)";
    
    let counter = 1/2;
    let direction = 1;
    let directionTop = 1;
    let pongLeft = 50;
    let pongTop = 50;

    // define an interval which allows to change the top/right/bottom/left property(ies) continuously, moving the disk in the page
    // the speed of the disk can be altered by modifying 1) counter, the degree of change or 2) the interval timeframe, how frequently the change occurs
    // finding the right mix is a bit of a trial-and-error phase
    // a fast interval guarantees a smooth transition

    setInterval(function() {
        // at every iteration change the left/top properties through the inclusion of a variable in the property value
        // increment the property by counter
        pongLeft += counter*direction;
        pongDisk.style.left = pongLeft + "%";
        
        // when hitting the boundaries of the window, multiply direction by -1 changing the value injected in the top/left property and allowing for the disk to move in the opposite direction
        if(pongLeft >= 100 || pongLeft <= 0) {
            direction*=-1;
            // directionTop = (directionTop) * 2/(Math.round(Math.random(1)*4));            
        }

        // same logic for the top property; increment by counter, switch direction when hitting the boundaries of the window
        pongTop += counter*directionTop;
        pongDisk.style.top = pongTop + "%";

        if(pongTop >= 100 || pongTop <= 0) {
            directionTop*=-1;
        }

    }, 20);
    // counter = 1;
    // setInterval(function() {
    //     pongDisk.style.left = counter + "%";
    //     pongDisk.style.top = counter + "%";
    //     if(counter < 100) {
    //         counter ++;
    //     }
    // }, 24);
}
function stopPongDisk() {
    for(let i = 0; i < 200; i ++) {
        clearInterval(i);
    }
}

