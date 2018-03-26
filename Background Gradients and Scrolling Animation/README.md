Link to the working pen right [here](https://codepen.io/borntofrappe/full/VXMVxK/)

# Preface 

This project takes inspiration from [Caramel.la](https://caramel.la/), as recently featured on [Product Hunt](https://www.producthunt.com/).

In particular, it tries to replicate a couple of solutions chosen in the design of the page in question. Namely:

- the artsy gradients populating the page;
- the books constantly being updated with new items introduced vertically, like a roll of paint.

# Lessons learned

## Gradients

As I previosuly understood [gradients](https://css-tricks.com/css3-gradients/), you can have one of three (or four) types of changes in color:

- linear
- radial
- repeated linear and repeated radial.

Sure there are a couple of possibilities on top of those, like conic gradient, but browsers safely support those mentioned.

It never occured to me that the gradients could be actually combined to create different results. 

In the referenced web page, that is exactly the case.
Linear and radial gradients are amalgamated to present the unconventional background.

The solution itself is allowed by the property of `background`, in which it is actually possible to "stack" background values. 
Or in other terms, it is possible to provide [fallback options](https://css-tricks.com/css-basics-using-multiple-backgrounds/). 

Simply comma-separating multiple values is enough for the browser to render the background options in an descending pattern, 
with the first option displayed on top of the second, itself on top of the third and so forth.

This possibility, coupled with a gradient color of `transparent`, allows for multiple gradients to coexist.

In the simple project, this rationale is applied to create a neat background in which colors seemingly mix together with blue and purple tints:

```CSS
.container {
  background: 
        linear-gradient(to top right, rgb(158, 50, 108) 0%, transparent 60%), 
        linear-gradient(to top left, rgb(58, 68, 158) 0%, transparent 40%), 
        linear-gradient(to bottom right, rgb(58, 68, 158) 0%, transparent 40%), 
        radial-gradient(at center bottom, rgb(235, 98, 171) 20%, transparent 70%), 
        radial-gradient(at center right, rgb(235, 98, 171) 20%, transparent 90%);
}
```

## Rolling introduction

// TODO: add the description for the faux-intermittent animation, achieved simply by using a longer animation and multiple keyframe-breakpoints with the same values
