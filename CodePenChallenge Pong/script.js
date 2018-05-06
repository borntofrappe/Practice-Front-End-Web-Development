// target the elements required for the project

/*
button to toggle the pong game 
left and right rectangles for the paddles

pong disk for the actual puck, animated to move around the screen

score boards for the div displaying the game result
*/
const pongButton = document.querySelector('.pong');
const leftPaddle = document.querySelector('.rectangle--left');
const rightPaddle = document.querySelector('.rectangle--right');

const pongDisk = document.querySelector('.pong--disk');

const leftScore = document.querySelector(".points--left");
const rightScore = document.querySelector(".points--right");

// listen for a click event on the central pong button, at which point begin/stop the game
pongButton.addEventListener('click', togglePongGame);

// depending on whether the "game" has started or not, begin/ stop the game
// the conditional is based on the button having a class of playing, which is then alternatively applied/ removed 
function togglePongGame() {
    if(pongButton.classList.contains('playing')) {
        // remove event listener for the paddles, the class for the button and stop moving the disk
        window.removeEventListener('mousemove', handleMouseMove);
        pongButton.classList.remove('playing');
        stopPongDisk();
    }
    else {
        // add event listener, the class for the button and start moving the disk
        window.addEventListener('mousemove', handleMouseMove);
        pongButton.classList.add('playing');
        startPongDisk();
        resetScore();
    }
    
}

function handleMouseMove(event) {
    // event.clientX and event.clientY provide the X and Y coordinates of the mouse in the page
    // window.innerHeight provides the height of the screen (Y <= window.innerHeight)
    // window.innerWidth provides the width of the screen (X <= window.innerWidth)

    // for the horizontal coordinate, all that is required is the knowledge of when the x coordinate crosses over the center of the screen
    let xCoor = event.clientX;
    let windowWidth = window.innerWidth;
    let windowHalfWidth = windowWidth/2;
    
    // for the vertical coordinate, a range from 0 to 100 is needed
    // this is created by dividing the value of event.clientY by the height of the window (giving a range between 0 and 1) and multiplying this value by 100
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
// the negative margin-top included in the stylesheet makes sure that the rectangles are also "centered" in the page, showing at least half a rectangle at either extreme of the screen
function moveleftPaddle(yFromTop) {
    leftPaddle.style.top = yFromTop + '%';
}
function moverightPaddle(yFromTop) {
    rightPaddle.style.top = yFromTop + '%';
}

/* 
for the disk, the animation is prompted with an interval, which iterates rapidly and updates the properties of top and left 

the crucial aspect is the change in value, which warrants a small note on the puck's behavior

when hitting the boundaries, solely changing the direction makes for repetitive/predictable movement
it would be best to include randomness, while at the same time maintaining a degree of "reasonable" change
[meaning the disk shouldn't change extremely its trajectory]

keeping the left and right movement constant (the puck should move horizontally and "bounce" when hitting the left and right edges of the screen), 
randomness can be included in the vertical change of position
whenever the disk hits the left and right border, change the vertical direction with random value

Math.random()*3 allows for numbers ranging from 0 to 3, including floating numbers and allowing for sharper/softer changes in direction

While such an expression is suited for the intensity of the direction's change, randomness can also be included to actually change the direction (otherwise the puck would always go in a single direction)

The change in direction is already applied when the movement is first instantiated, through a ternary operator
*/
function startPongDisk() {
    // place the disk in the middle of the screen, every time the function is called 
    pongDisk.style.left = 'calc(50% - 28px/2)';
    pongDisk.style.top = 'calc(50% - 28px/2)';
    
    
    // increment top/left properties with a value of half a percent (multiplied by direction)
    let counter = 1/2;
    // with ternary operators allow for random behavior in selecting the horizontal direction and in selecting the vertical direction as well as the intensity of its direction
    let direction = Math.random() > 0.5 ? 1 : -1;
    let directionTop = Math.random() > 0.5 ? Math.random()*3 : Math.random()*3 - 3;

    // set initial values of 50
    let pongLeft = 50;
    let pongTop = 50;

    // define an interval which allows to change the top and left properties continuously, moving the disk in the page
    // the speed of the disk can be altered by modifying 1) counter, the degree of change or 2) the interval timeframe, how frequently the change occurs
    // finding the right mix is a bit of a trial-and-error phase
    // a fast interval guarantees a smooth transition; once that is achieved, increase/ decrease the change to avoid excessive movement (both too slow or too fast is a no-no)

    let intervalID = setInterval(function() {
        // at every iteration change the left/top properties through the inclusion of a variable in the property value
        // increment the property by counter multiplied by direction
        pongLeft += counter*direction;
        // include the altered value in the css property of left
        pongDisk.style.left = pongLeft + "%";
        
        // when hitting the boundaries of the window, multiply direction by -1 changing the value injected in the top/left property and allowing for the disk to move in the opposite direction
        if(pongLeft >= 98 || pongLeft <= -2) {
            direction*=-1;            
            // change also the vertical direction to include randomness in the disk's movement
            // remember to multiply 1 by the random number and not direction top (otherwise this would be an incrementally lower and lower number, moving the disk perfectly horizontally)
            directionTop = Math.random() > 0.5 ? Math.random()*3 : Math.random()*3 - 3;           
        }

        // same logic for the top property; increment by counter, switch direction when hitting the boundaries of the window
        pongTop += counter*directionTop;
        pongDisk.style.top = pongTop + "%";

        if(pongTop >= 98 || pongTop <= -2) {
            // do not change the intensity of the turn this time
            directionTop*=-1;
        }

        // 0.25% is precisely the "window" which, if hit, allows to increment the score of a single point (otherwise the change in points would be more evident)
        // if the puck reaches the edges of the page (which it inevitably does)
        if(pongLeft <= -1.75) {
            // if the puck "hits" the left paddle, its top property (in %) is exactly between the top and bottom edges of the rectangle
            if(pongTop < parseInt(leftPaddle.style.top.substr(0,2)) && pongTop > parseInt(leftPaddle.style.top.substr(0,2)) - 25) {
                console.log('Nice Catch');
            }
            // otherwise update the score of the opposing side (which is actually the important statement of the pair)
            else {
                updateScore('r');
            }
        }
        // same logic for the right section of the screen, just with the right paddle
        if(pongLeft >= 97.75) {
            if(pongTop < parseInt(rightPaddle.style.top.substr(0,2)) && pongTop > parseInt(rightPaddle.style.top.substr(0,2)) - 25) {
                console.log('Nice Catch');
            }
            else {
                updateScore('l');    
            }
        }
    }, 20);
}

// clear all intervals within a reasonable range
function stopPongDisk() {
    for(let i = 0; i < 2000; i ++) {
        clearInterval(i);
    }
}

// reset the score
function resetScore() {
    leftScore.textContent = 0;
    rightScore.textContent = 0;
}

// update the score depending on the argument passed by the function
function updateScore(side) {
    let scoreLeft = parseInt(leftScore.textContent);
    let scoreRight = parseInt(rightScore.textContent)

    if(side == 'l') {
        scoreLeft++;
        leftScore.textContent = scoreLeft;
    }
    else if(side == 'r') {
        scoreRight++;
        rightScore.textContent = scoreRight;
    }

    // regardless of side, stop the puck movement and begin a new game immediately 
    stopPongDisk();
    startPongDisk();
}
