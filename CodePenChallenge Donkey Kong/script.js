// to give an element of change in the animation, change the duration of the animation based on a random number 
function changeAnimationDuration() {
    // within a range (5-15s)
    const randomDigit = Math.floor(Math.random()*10) + 5;
    const randomPace = randomDigit + "s";
    const root = document.querySelector(":root");
    
    root.style.setProperty("--animation-duration", randomPace);
}

changeAnimationDuration();
