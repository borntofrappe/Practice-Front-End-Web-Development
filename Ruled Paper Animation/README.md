Link to the working pen right [here](https://codepen.io/borntofrappe/full/eMggoM/).

## Preface

The purpose of this project is to experiment once more with CSS animations and CSS variables. Once more, taking inspiration from [Coda.io](https://coda.io/welcome).

In particular, this project sets out to accomplish the animation visible below the green-ish section with glowing icons, achieved in a previous [attempt](). As the visitor scrolls to this section, he/she can see ruled paper with some text overlaid on it. As the visitor scrolls further, the cells making up the lines of the ruled paper fall to display a nice orange background, leading up to a nice bold logo.

For the simple project, the goal is to present the same ruled paper and animate the cells in a similar way, but to present instead some text right behind it.

The effect on the referenced page is triggered by a scroll event, but for the project at hand a simple button is included to toggle between end states.

Click a button, the page is animated making all cells and the first text elments fall down and disappear. Click another button, the page is brought back to its original state.

> Okay?


## Lessons learned

**Flex properties**

The grid of cells making up the ruled paper is achieved through *flex* properties. Most important among these is the `flex-wrap` property, which subverts the default non-wrapping behavior of the flex container and allows for nested items to "fall" on a new line. Without it, the flex container will try and fit all items on a single line, even at the cost of overflowing horizontally.

```CSS
.grid {
  flex-wrap: wrap;
}
```

Beside this focal property-value pair, and for the flex items instead of their wrapping container, `flex-grow` is used to stretch each nested item in order for each to occupy a fraction of the page. `flex-basis` is used jointly to define a starting width for each item, eaning that the item ought to be at least x wide, but all items together should stretch to occupy the available width.

```CSS
.grid__cell {
  flex-grow: 1;
  flex-basis: 200px;
}
```

**CSS animations and variables**

Once more, this project makes use of CSS variables *inside* of CSS animations, in the behavior defined through the `keyframes` keyword. This approach allows to introduce variability by way of customizing the values of different elements.

This is achieved simply by updating the variable which is then "plugged" in the animation.

The animation indeed makes use of variables for the transform property: 

```CSS
@keyframes grid__cell--fall {
  /*
  previous keyframes
  */
  99% {
    opacity: 0;
    transform: translateY(var(--falling-translation)) rotate(var(--falling-rotation));
  }
  100% {
    opacity: 0;
    transform: translateY(calc(var(--falling-translation)*-1)) rotate(0);
  }
}
```

These variables are previously defined for the root element, and afterwards updated for some, but not all elements affected by the animation:

```CSS
:root {
  --falling-rotation: 110deg;
  --falling-translation: 2000px;
}
.grid__cell--fall:nth-child(3n) {
  --falling-rotation: 150deg;
  --falling-translation: 1500px;
  animation-delay: 0.5s;
}
.container__text--first {
  --falling-rotation: -50deg;
  --falling-translation: 1000px;
}
```

Which allows to animate all elements with the default behavior, described by the root variables, and animate the selected items with altered values, described by the updated variables.


