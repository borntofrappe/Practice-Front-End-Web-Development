// target the icon to restart the animation
const refreshIcon = document.querySelector(".refresh-icon");
// target the elements affected by the animation
const animatedDigits = document.querySelectorAll(".digit");

// listen for a click event
refreshIcon.addEventListener("click", restartAnimation);


// remove and add the class used for the animation, with a reflow triggered in between   
// trick explained in this CSS Tricks article: https://css-tricks.com/restart-css-animation/#article-header-id-0
function restartAnimation() {
    animatedDigits.forEach(function(animatedDigit) {
        animatedDigit.classList.remove("animated-digit");
        void animatedDigit.offsetHeight;
        animatedDigit.classList.add("animated-digit");
    });
}