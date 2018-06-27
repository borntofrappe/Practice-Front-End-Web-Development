// target the elements in the page
const pkmn = document.querySelector(".pkmn");
const pkbll = document.querySelector(".pkbll");

// upon clicking on the pokemon, restart the animation by removing and subsequently adding the classes including the animation
pkmn.addEventListener("click", () => {
    pkmn.classList.remove("pkmn-animation");
    pkbll.classList.remove("pkbll-animation");

    let timeoutID = setTimeout(() => {
        pkmn.classList.add("pkmn-animation");
        pkbll.classList.add("pkbll-animation");
        clearTimeout(timeoutID);
    }, 100);
});