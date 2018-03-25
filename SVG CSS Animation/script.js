// animation-play-state
// *Accepted values*: running, paused

// target assets subject to animation
const train = document.querySelector(".train");
const stopSign = document.querySelector(".stop-sign");
const sun = document.querySelector(".sun");
const clouds = document.querySelectorAll(".cloud");

// listen to a click event on the stop-sign asset
stopSign.addEventListener("click", toggleTrainAnimation);

function toggleTrainAnimation() {
    // based on whether the animation is running in one of the assets, stop/ play all animations (through the CSS property of animation-play-state)
    const trainAnimation = train.style.animationPlayState;
    if(trainAnimation == "running") {
        train.style.animationPlayState = "paused";
        sun.style.animationPlayState = "paused";
        clouds.forEach(function(cloud) {
            cloud.style.animationPlayState = "paused";
        });
    }
    else {
        train.style.animationPlayState = "running";
        sun.style.animationPlayState = "running";
        clouds.forEach(function(cloud) {
            cloud.style.animationPlayState = "running";
        });
    }
    
}
