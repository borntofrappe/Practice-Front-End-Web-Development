// consider the button to flip the colors and the root element for its custom css properties
const toggleBtn = document.querySelector("button");
const root = document.querySelector(":root");

// listen for a click event, at which point flip between the colors
toggleBtn.addEventListener("click", flipThemeColors);

function flipThemeColors() {
  // retrieve the CSS properties of the root element (including the custom properties)
  let rootStyles = getComputedStyle(root);
  // store in a variable one of the two custom properties (by referencing each other, the latter would inherit the overwritten value)
  let temp = rootStyles.getPropertyValue("--theme-d");

  // flip the colors with each other's value
  root.style.setProperty("--theme-d", rootStyles.getPropertyValue("--theme-l"));
  root.style.setProperty("--theme-l", temp);
}
