Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/xjqLJR/).

# Preface 

The purpose of this project is to replicate an incredibly neat-looking design choice as seen on [Status.im](https://status.im/). The site presents two incredibly good-looking radial-gradients, one of which is even animated to show a rippling halo emerge out of a specified location.

It is truly a joyful design. 

# Plan

- [x] create a first card with a radial gradient centered in the bottom center of the card itself, to practice with the syntax of linear gradients
- [x] create a second card in which the radial gradient is complemented with an icon or otherwise graphical assets from which a rippling animation emerges (a radio tower immediately comes to mind, as something which is not overly complicated to pull off with SVG)


# Notes

**Multiple Backgrounds**

The CSS property of `background` accepts among many values a color, a url referencing an image or otherwise graphic, and even selected keywords like `linear-gradient`, `radial-gradient`.

It is possible to specify a single option, but also to stack one alternative on top of another, simply by comma separating the different values. What is important to remember is the order of this "stack", as indeed the first value is shown on top of the second, which itself sits on top of the third and so forth with additional inclusions.

In order to create "see-through" effects, or more generally in order to display multiple values together, different alternatives are available. One is to include a color of `transparent`, another is to include transparency in the selected colors, through alpha values.

With gradients it is also possible to specify a breakpoint which prevents the background from encompassing the entire, available width. There are indeed several options to allow for multiple values to coexist in the same element.

```CSS
.container .card {
  background: 
    repeating-radial-gradient(
      circle at bottom center, 
      transparent, 
      transparent 50px, 
      rgba(235,233,231,0.2) 50px, 
      rgba(235,233,231,0.2) 52px
      ), 
    linear-gradient(
      to top, 
      #7c7c7c, 
      #878787
      );
}
```

**Repeating Gradients**

Beside  `linear-gradient` and `radial-gradient`, CSS allows to include repeating gradients, through the key values of  `repeating-linear-gradient` and `repeating-radial-gradient`.

These work much similarly to the non-repeating variety, with the addition of a color-stop value which specifies the structure of the gradient to be repeated. 

Instead of simply including colors:

```CSS
.gradient {
  background:
    linear-gradient(
      to right,
      red,
      blue,
      yellow,
      green
    );
}
```

it is indeed possible to include length values which specify the length of the gradient, in percentages of absolute measures:

```CSS
.gradient {
  background:
    linear-gradient(
      to right,
      red 20%,
      blue 30%,
      yellow 70%,
      green 100%
    );
}
```

With a repeating gradient, the structure specified through said color-stop values is repeated for the entire background:

```CSS
.gradient {
  background:
    repeating-linear-gradient(
      to right,
      red 20px,
      blue 40px
    );
}
```

With this simple snippet, the background is set to a linear gradient which is repeated every 40px with the specified divide.

**Solid gradients**

It may seem counter-intuitive, but gradients can be used also without color transitions, with solid colors created by repeating the same hue at different color-stop breakpoints. This allows to create stripes or lines of the same color, as in the project at hand.

```CSS
.container .card {
  background: 
    repeating-radial-gradient(
      circle at bottom center, 
      transparent, 
      transparent 50px, 
      rgba(235,233,231,0.2) 50px, 
      rgba(235,233,231,0.2) 52px
      ), 
    linear-gradient(
      to top, 
      #7c7c7c, 
      #878787
      );
}
```

With the repeating-radial-gradient hereby described, the gradient goes from transparent to transparent for the first 50px, where it immediately changes to the specified colors for the next 2px. This allows to create a color "expansion" for a solid hue.

