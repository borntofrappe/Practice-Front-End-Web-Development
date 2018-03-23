// animation-play-state
// *Accepted values*: running, paused

const train = document.querySelector(".train");
const stopSign = document.querySelector(".stop-sign");
const sun = document.querySelector(".sun");
const clouds = document.querySelectorAll(".cloud");

stopSign.addEventListener("click", toggleTrainAnimation);

function toggleTrainAnimation() {
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