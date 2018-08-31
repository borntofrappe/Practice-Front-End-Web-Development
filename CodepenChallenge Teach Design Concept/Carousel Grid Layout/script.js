// target the section elements and on click toggle the animation (it's unnerving to have it endlessly run)
const sections = document.querySelectorAll("section");

sections.forEach((section) => section.addEventListener("click", toggleAnimation));

function toggleAnimation() {
    sections.forEach((section) => (section.style.animationPlayState === 'paused') ? section.style.animationPlayState = 'running' : section.style.animationPlayState = 'paused');
}
