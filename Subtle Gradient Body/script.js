// store in an array a few colors, picked from the color palette provided by google material design [documentation](https://material.io/guidelines/style/color.html)

/* the following colors are picket at a opacity of 0.2:
- red
- pink
- purple
- deep purple
- indigo
- blue
- light blue
- cyan
- teal
- green
- light green
- lime
- yellow
- amber
- orange
- deep orange
- brown
- grey
- blue grey
*/
var arrayOfColors =
    [
      "rgba(244, 67, 54, 0.3)",
      "rgba(233, 30, 99, 0.3)",
      "rgba(156, 39, 176, 0.3)",
      "rgba(103, 58, 183, 0.3)",
      "rgba(63, 81, 181, 0.3)",
      "rgba(33, 150, 243, 0.3)",
      "rgba(3, 169, 244, 0.3)",
      "rgba(0, 188, 212, 0.3)",
      "rgba(0, 150, 136, 0.3)",
      "rgba(76, 175, 80, 0.3)",
      "rgba(139, 195, 74, 0.3)",
      "rgba(205, 220, 57, 0.3)",
      "rgba(255, 235, 59, 0.3)",
      "rgba(255, 193, 7, 0.3)",
      "rgba(255, 152, 0, 0.3)",
      "rgba(255, 87, 34, 0.3)",
      "rgba(121, 85, 72, 0.3)",
      "rgba(158, 158, 158, 0.3)",
      "rgba(96, 125, 139, 0.3)"
    ];

// pick a random number from 0 up to the length of the arrayOfColors minus one
// this will allow to identify a random color using the number as index
var randomNumber = Math.floor(Math.random() * arrayOfColors.length);

// select body
const entireBody = document.querySelector("body");
// change background property in the CSS to the linear gradient, in which a random color is incorporated through string concatenation
entireBody.style.background =
  "linear-gradient(-180deg, #fff 0%, "
  +
  arrayOfColors[randomNumber]
  +
  " 50%, #fff 100%)";
