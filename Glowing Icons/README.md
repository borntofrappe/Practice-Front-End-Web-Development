Link to the working pen right [here](https://codepen.io/borntofrappe/full/wmzYEw/).

## Preface

The purpose of this project is to replicate a section of the neat website [Coda.io](https://coda.io/welcome). As the visitor scrolls past the terminal interface, he/she is presented with a green-ish section with bold text and glowing icons. Icons which are animated to rotate and change in opacity.

It is this exact effect that this small project is trying to replicate. It is a good excuse to practice with SVG assets, included in a set and referenced through the page, and also experiment with CSS animation**s** and CSS variables.

It is indeed possible to include more than one animation for any CSS selectors, as it will be briefly explained. It is even possible to customize each animation by changing a set of defined variables.

## Lessons learned

**SVG Set**

I previously stressed for the presence of a `viewbox` attribute on any and all SVG graphics which are included in an SVG set. While that seems to hold true with graphics having different `viewbox` values, it is possible to include one single of such attributes on the larger, wrapping, SVG element if all assets share the same values.

This is true in the simple project, where all graphics are built with the same `viewbox` (and also dimensions) in mind.

```HTML
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.458 26.458" style="display: none;">
<!-- define SVG, without further specifying the viewbox attribute -->
</svg>
```

When using the SVG later in the page, it is nevertheless important to include the `viewbox` attribute once more. 

```HTML
<svg viewBox="0 0 26.458 26.458">
  <!-- use SVG -->
</svg>
```

**CSS Animations**

When using CSS animation, it is possible to specify multiple animations simply by comma separating the values accepted by animation properties.

In the following example for instance, the selector references two different animations by name:

```CSS
.container--icons svg {
  animation-name: animation-one, animation-two;
}
```

The same logic is applied in the simple project on all animation properties which are specified, like `animation-duration` and `animation-delay`.

By altering such values it is also possible to introduce variability in the page, as the animations occurs in and over different time periods.

**Transform rotate**

As per the helpful resource found on [CSS Tricks](https://css-tricks.com/almanac/properties/t/transform/), it is possible to rotate an HTML element through the `transform` property.

This accepts, among many alternatives, the value of `rotate()` and specifically for the project, `rotateX()`, `rotateY()`, `rotateZ()`.

As it is often difficult to visualize, the same resource has a nice [implementation](https://css-tricks.com/almanac/properties/t/transform/#article-header-id-2) of all three values.

Based on the impact of all values and what can be analyzed on [Coda.io](https://coda.io/welcome), the rotation in question affects mostly the Y and Z axes.

For the star icon for instance, the image is modified from its original position through an immediate change on the Z axis and a later rotation on the Y axis.

In the expression of the animation built through the `keyframes` keyword, this two-steps animation is easily manufactured with multiple percentages.

```CSS
@keyframes modify-rotation {
  33% {
    transform: rotateY(0deg) rotateZ(-20deg);
  }
  67% {
    transform: rotateY(32deg) rotateZ(-20deg);
  }
}
```

In this example, the rotation of the Z axis is animated first and then stopped as the rotation of the Y axis moves on.

**CSS Variables**

CSS allows to define variables for property values used throughout the stylesheet. This opportunity allows to define a value once and use it on multiple occasions later.

It also allows to easily change multiple values at once, as the only value which needs to be altered is the one present in the definition.

All that is required is to first *declare* a variable, in the scope in which you want to use it. 

For all selectors the keyword `:root` allows to define variables accessible all throughout the CSS structure.

```CSS
:root {
  --variable-name: variable-value;
}
```

To then *use* a variable, it is possible to reference it through the syntax supported by CSS.

```CSS
.header {
  property: var(--variable-name);
}
```

With a simple, practical example, the syntax looks as follows:

```CSS
:root {
  --main-color: #f0f;
}
.header {
  color: var(--main-color);
}
```

Beside being really useful to "centralize" CSS values, CSS variables can be altered throughout the stylesheet. 

This "updating" function allows for different selectors to have different values, which is extremely useful for the simple project in question. It is indeed possible to alter the time frame of the animation, and also the values the animation applies, simply by updating the variables the animation is made to use.

In the `:root` selector, variables are defined for the animation:

```CSS
:root {
  --animation-duration: 15s;
  --animation-delay: 0s;
  --animation-degree-rotation-y: 32deg;
  --animation-degree-rotation-z: -20deg;
}
```

Defining values which are then included for the property of `animation-duration`, `animation-delay`, as well as the property of `transform`, in one of the animation itself.

```CSS
.container--icons svg {
  animation-duration: var(--animation-duration), var(--animation-duration);
  animation-delay: var(--animation-delay), var(--animation-delay);
}
``` 

```CSS
@keyframes modify-rotation {
  33% {
    transform: rotateY(0deg) rotateZ(var(--animation-degree-rotation-z));
  }
  67% {
    transform: rotateY(var(--animation-degree-rotation-y)) rotateZ(var(--animation-degree-rotation-z));
  }
}
```

By updating these variables in the specific selectors, it is then possible to introduce variability in the animations. The specific selectors use in fact the updated values in the property defined with the variables in mind.

```CSS
.container--icons svg.messages-icon {
  --animation-duration: 10s;
  --animation-delay: 8s;
}

.container--icons svg:nth-child(odd) {
  --animation-degree-rotation-y: 12deg;
  --animation-degree-rotation-z: 20deg;
}
``` 

**Filter**

CSS is able to modify HTML elements through the `filter` property. There are here a lot of accepted values, able to customize elements with different styles. CSS Tricks has expectedly an helpful [resource](https://css-tricks.com/almanac/properties/f/filter/) on the subject.

For the project in question, the `filter` value of `drop-shadow` allows to create a shadow for all the SVG icons. 

`drop-shadow` accepts multiple inputs, similarly to the `box-shadow` property, defining horizontal offset, vertical offset, blur and color of the shadow. With a bright color choice, the shadow comes to resemble a glow. 

```CSS
.container--icons svg {
  filter: drop-shadow(1px 1px 10px lighten($background-color, 25%));
}
```
