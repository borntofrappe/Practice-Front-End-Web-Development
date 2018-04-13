// target the button enabling the change in colors
const toggleThemeButton = document.querySelector(".toggle-theme");

// listen to a click event, at which point call a function to alter the selected CSS variables
toggleThemeButton.addEventListener("click", toggleTheme);

function toggleTheme() {
    // retrieve properties in the root element
    const root = document.querySelector(":root");
    const rootStyles = getComputedStyle(root);
    
    // based on the value of a variable, toggle between one set of variables and another
    const buttonColor = rootStyles.getPropertyValue("--button-color");
    if(buttonColor == "#eee") {
        root.style.setProperty("--button-color", "#7548d6");
        root.style.setProperty("--background-gradient-top", "#000128");
        root.style.setProperty("--background-gradient-bottom", "#030a33");
        root.style.setProperty("--text-color", "#eee");
    }
    else {
        root.style.setProperty("--button-color", "#eee");
        root.style.setProperty("--background-gradient-top", "#eee");
        root.style.setProperty("--background-gradient-bottom", "#eee");
        root.style.setProperty("--text-color", "#000128");
    }   
}