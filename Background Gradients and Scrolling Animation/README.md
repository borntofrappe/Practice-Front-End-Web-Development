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

To create the rolling animation, a choice is made to include an empty `div` in each book container. Each `div` is then attributed a `background` property for the placeholder color or image which is included as proof-of-concept. 

```HTML
<div class="book book--one">
  <div class="book__cover"></div>
</div>
```

The background itself, to experiment in including SVG inline in CSS, is provided by an SVG asset (which is stored in the Resources folder). The SVG files themselves are included inline through a data attribute, simply prefacing the SVG syntax with the line: `data:image/svg+xml;utf8,`. 

```CSS
.book--one .book__cover {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="250" viewBox="0 0 52.917 66.146"><path fill="#e94e3e" d="M0 0h52.917v66.146H0z"/><g fill="none" stroke="#d4e0e5" stroke-width=".265"><path d="M20.41 27.527c.304-.275.52.273.457.504-.171.625-.986.687-1.464.41-.856-.498-.9-1.681-.362-2.426.789-1.093 2.384-1.12 3.386-.315 1.335 1.073 1.342 3.091.267 4.347-1.352 1.58-3.8 1.567-5.307.22-1.826-1.63-1.792-4.509-.173-6.268 1.907-2.073 5.219-2.017 7.228-.126 2.32 2.184 2.244 5.93.08 8.19-2.46 2.567-6.641 2.47-9.151.031-2.815-2.735-2.696-7.351.016-10.11 3.01-3.064 8.063-2.923 11.071.062"/><path d="M31.939 15.999c-.275.303.273.52.504.456.625-.171.687-.986.41-1.464-.498-.855-1.681-.9-2.426-.362-1.093.789-1.12 2.384-.315 3.386 1.073 1.335 3.091 1.342 4.347.267 1.58-1.352 1.566-3.8.22-5.307-1.63-1.826-4.509-1.792-6.268-.173-2.073 1.907-2.017 5.219-.126 7.228 2.184 2.32 5.93 2.244 8.19.08 2.567-2.46 2.47-6.641.031-9.15-2.735-2.816-7.351-2.697-10.11.015-3.064 3.01-2.923 8.063.062 11.071"/><path d="M20.978 28.094c.274-.303-.273-.52-.504-.457-.626.172-.688.987-.41 1.465.497.855 1.68.9 2.426.362 1.093-.79 1.12-2.384.315-3.386-1.073-1.335-3.091-1.342-4.347-.268-1.58 1.353-1.567 3.8-.22 5.308 1.63 1.826 4.509 1.792 6.267.173 2.073-1.907 2.018-5.22.126-7.229-2.183-2.32-5.93-2.243-8.189-.079-2.568 2.46-2.47 6.641-.032 9.15 2.736 2.816 7.352 2.697 10.111-.015 3.064-3.01 2.923-8.063-.063-11.072"/><path d="M32.506 16.566c-.303.274-.52-.273-.457-.504.172-.626.987-.688 1.465-.41.855.497.9 1.68.362 2.426-.79 1.093-2.384 1.12-3.386.315-1.335-1.073-1.342-3.091-.268-4.347 1.353-1.58 3.8-1.567 5.308-.22 1.826 1.63 1.791 4.509.173 6.267-1.907 2.073-5.22 2.018-7.229.126-2.32-2.183-2.243-5.93-.079-8.189 2.46-2.568 6.641-2.47 9.15-.032 2.816 2.736 2.697 7.352-.015 10.111-3.01 3.064-8.063 2.923-11.072-.063"/><path d="M20.978 15.999c.274.303-.273.52-.504.456-.626-.171-.688-.986-.41-1.464.497-.855 1.68-.9 2.426-.362 1.093.789 1.12 2.384.315 3.386-1.073 1.335-3.091 1.342-4.347.267-1.58-1.352-1.567-3.8-.22-5.307 1.63-1.826 4.509-1.792 6.267-.173 2.073 1.907 2.018 5.219.126 7.228-2.183 2.32-5.93 2.244-8.189.08-2.568-2.46-2.47-6.641-.032-9.15 2.736-2.816 7.352-2.697 10.111.015 3.064 3.01 2.923 8.063-.063 11.071"/><path d="M32.506 27.527c-.303-.275-.52.273-.457.504.172.625.987.687 1.465.41.855-.497.9-1.681.362-2.426-.79-1.093-2.384-1.12-3.386-.315-1.335 1.073-1.342 3.091-.268 4.347 1.353 1.58 3.8 1.567 5.308.22 1.826-1.63 1.791-4.509.173-6.268-1.907-2.073-5.22-2.017-7.229-.126-2.32 2.184-2.243 5.93-.079 8.19 2.46 2.567 6.641 2.47 9.15.031 2.816-2.735 2.697-7.351-.015-10.11-3.01-3.064-8.063-2.923-11.072.062M20.41 16.566c.304.275.52-.273.457-.504-.171-.626-.986-.688-1.464-.41-.856.497-.9 1.68-.362 2.426.789 1.093 2.384 1.12 3.386.315 1.335-1.073 1.342-3.091.267-4.347-1.352-1.58-3.8-1.567-5.307-.22-1.826 1.63-1.792 4.509-.173 6.267 1.907 2.073 5.219 2.018 7.228.126 2.32-2.183 2.244-5.93.08-8.189-2.46-2.568-6.641-2.47-9.151-.032-2.815 2.736-2.696 7.352.016 10.111 3.01 3.064 8.063 2.923 11.071-.063"/><path d="M31.939 28.094c-.275-.303.273-.52.504-.457.625.172.687.987.41 1.465-.498.855-1.681.9-2.426.362-1.093-.79-1.12-2.384-.315-3.386 1.073-1.335 3.091-1.342 4.347-.268 1.58 1.353 1.566 3.8.22 5.308-1.63 1.826-4.509 1.792-6.268.173-2.073-1.907-2.017-5.22-.126-7.229 2.184-2.32 5.93-2.243 8.19-.079 2.567 2.46 2.47 6.641.031 9.15-2.735 2.816-7.351 2.697-10.11-.015-3.064-3.01-2.923-8.063.062-11.072"/></g><text style="line-height:1.25" x="26.717" y="278.558" font-weight="400" font-size="10.583" font-family="sans-serif" letter-spacing="0" word-spacing="0" stroke-width=".265" transform="translate(0 -230.854)"><tspan x="26.717" y="278.558" style="text-align:center" text-anchor="middle" fill="#d4e0e5">Blink</tspan><tspan x="26.717" y="291.788" style="text-align:center" text-anchor="middle" fill="#d4e0e5">Twice</tspan></text></svg>');
}
```

Given this structure, the scrolling-into-view animation is created by absolute positioning the nested `div` atop the parent container. Afterwords, the animation is achieved by changing the value of the `height` property, from `0` to `100%`. 

In order to position the element thusly, it is important to remark that the parent container ought to have the property of `position` set to `relative`, as to anchor the child element to the higher item.

```CSS
.book {
  position: relative;
}
.book .book__cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  animation: roll-in 10s ease-out;
}

@keyframes roll-in {
  to {
    height: 100%
  }
}
```

By itself this code allows, upon loading the page, to achieve the desired effect. However, the projects build on top of this simple structure to 1) include variation among the multiple elements which are affected by the animation and 2) allow for a "pause" between animation cycles.

Indeed the animation is set to run infinitely from height 0 to height 100 and backwards, and a pause between scrolls is advised. This pause is unfortunately not allowed by a property of CSS, but can be included by leveraging the possibilities of the allowed properties.

1. Include variation

  To include the variation among the affected elements, a variable is defined in the root element for the value of the property of animation-delay. This property describes the amount of time the animation should wait before running.

  ```CSS
  :root {
    --animation-delay: 2s;
  }
  ```

  This variable is then included in the `animation` property:

  ```CSS
  .book .book__cover {
    height: 0;
    animation: roll-in 10s ease-out var(--animation-delay) infinite;
  }
  ```

  And most importantly, this variable is updated for each element, allowing for different elements to start at different times:

  ```CSS
  .book--one .book__cover {
    --animation-delay: 2s;
  }
  .book--two .book__cover {
    --animation-delay: 3s;
  }
  .book--three .book__cover {
    --animation-delay: 4s;
  }
  ```

2. Delay between animations

Unfortunately, `animation-delay` describes solely the time that should pass before the animation begins. It does not influence the timing between multiple animations, which is null. As soon as the animation finishes, indeed the animation runs without pause.

This behavior can be "tweaked" to seemingly introduce a break between subsequent animations, by leveraging the breakpoints which can be defined through the keyword `keyframes`.

Just like gradients can display a solid color by defining two breakpoints with the same value:

```CSS
background: linear-gradient(
  45deg,
  green,
  green 15%,
  orange 15%,
  orange 100%    
  );
}
```

In the animation keyframes as well it is possible to define multiple breakpoints with the same value, giving the impression of a pause.

All that is required is to "fit" the animation, prolonging its duration as to allow for the break to occur. A simple computation can be done to achieve the desired effect. Simply decide how much time the animation should take to run, from beginning to subsequent beginning, and then allocate the time between the beginning to the end of the first animation and between the end and the start of the following cycle.

In the example, the property of animation is altered to last 10s. Of these:
- 2s (between 0 and 20%) describe the scrolling animation;
- 4s (20-60%) describe the time in which the animation should pause, showing the scrolled content;
- additional 2s (60-80%) describe the scrolling animation which hide the element below the fold;

From 80% to 100%, the property of height is unaffected. This allows, as the animation has to finish its iteration, to give pause between animations. 

Technically at the 81% breakpoint the property of top is altered, but this to move back the HTML element at the top of the wrapping container. This is changed as to achieve the scrolling effect, which occurs with the same pattern as the element appears/ is made disappearing (The element is "brought" down and further down, then "brought" up rapidly for the correct behavior of the next iteration).

```CSS
@keyframes roll-in {
  0% {
    height: 0;
    top: 0;
  }
  20% {
    height: 100%;
    top: 0;
  }
  60% {
    height: 100%;
    top: 0;
  }
  80% {
    height: 0;
    top: 100%
  }
  81% {
    height: 0;
    top: 0;
  }
}
``` 
