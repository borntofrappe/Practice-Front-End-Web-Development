// target the elements to be altered in style
const lampSwitch = document.querySelector(".base--switch");
const lampBulb = document.querySelector(".lamp__bulb");
const lampLight = document.querySelector(".lamp__light");

// listen to a click event on the switch, at which point call a function to turn on/off the lamp
lampSwitch.addEventListener("click", handleClick);

function handleClick() {
    // depending on the value of the color property of the light bulb, turn the lamp on/off
    if(lampBulb.style.color == "yellow") {
        turnOff();
    }
    else {
        turnOn();
    }
}
// turn the lamp on/off by changing the CSS values of the selected elements
function turnOn() {
    // color actually cascades to the pseudo element, which has as value currectColor
    lampBulb.style.color = "yellow";
    lampSwitch.style.color = "#bbb";
    lampLight.style.width = "250px";
}

function turnOff() {
    lampBulb.style.color = "#b2b300";
    lampSwitch.style.color = "#fff";
    lampLight.style.width = "30px";
}