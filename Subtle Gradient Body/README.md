## Preface

Sometimes a plain-white background is just plain-boring. 

A subtle change introduced with a linear gradient allows to spice up the place. 

Moreover, a vertical linear gradient applied to the entire body allows to change the coloration as the page becomes longer and longer. 

By changing the stopping points of the linear gradient, it is finally possible to focus the attention of the page on a particular section, simply by marking the section with a more intense color.

For a live example, check the following [pen](https://codepen.io/borntofrappe/full/WMLwPm/).

## How to 

The effect is plainly simple. 

To visualize it without actual content, a `min-height` property stretching the body over the visible viewport is set:

```CSS
body {
  min-height: 350vh;
}
```

All that is required is then to add a linear gradient which vertically goes from white, to a defined color and back to white. 

```CSS
body {
  min-height: 350vh;
  background: linear-gradient(-180deg, #fff 0%, rgba(246,186,0,0.3) 50%, #fff 100%);
}
```

The opacity of the color plays an important role. Transparent hues are preferred in order to not monopolize the attention of the page.

Stopping points defined after each color are also essential in the ultimate coloration. These declare which color ought to appear 
at which phase of the gradient.

In the example the background starts with a color of white, or #fff in hexadecimal, changes with a linear gradient pattern in 
the middle of the page, at the 50% mark, and changes back to white, again linearly at the end of the page, 100% of the body.

Stopping points, as well as colors, can be altered to focus the visitor attention to particular portions of the page. 

## Is that it?

The effect is subtle and practically straightforward in its implementation. 

To include a small degree of variability and complexity, few lines of JavaScript are jotted down to set the background color 
of a hue picked randomly from a selection of colors.

The small functionality works as follows:

1. Store in an array a few colors, picked from the color palette provided by google material design [documentation](https://material.io/guidelines/style/color.html).
From the referenced web site colors from red to blue gray are stored sequentially in their rgba qualification. rgba value obtained simply by converting 
the hexadecimal value with a color conversion [tool](http://hex2rgba.devoth.com/).

  ```JS
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
   ```
 
 2. Create a random number to select a random color in the array. As the colors are accessed by zero-based indexing, the number ought to 
 go from 0 up to the length of the array minus one.
 
  - The Math.random() function returns a value from 0 up to, but excluding, 1. 
  - By multiplying this value for the length of the array (19), the value goes from 0 up to, but excluding 19. 
  - By wrapping the entire operation with a Math.floor() function, the number is finally between 0 and 18, 
  which is exactly the range required.

  ```JS
  var randomNumber = Math.floor(Math.random() * arrayOfColors.length);
  ```
  
3. Select the body and alter its background property including the color in the array at the position specified by the random number

  ```JS
  const entireBody = document.querySelector("body");
  entireBody.style.background = 
    "linear-gradient(-180deg, #fff 0%, " 
    +  
    arrayOfColors[randomNumber]
    + 
    " 50%, #fff 100%)";
  ```
  
Again, it is possible to alter colors, stopping points and even orientation of the linear gradient as needed. 
But the simple effect is hereby concluded.
