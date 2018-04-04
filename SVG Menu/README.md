Link to the working pen right [here](https://codepen.io/borntofrappe/full/pLZPrK/).

# Preface 

The purpose of this project is to implement a menu solution as seen in this insightful [article](https://www.sarasoueidan.com/blog/svg-art-direction-using-viewbox/) on the `viewbox` attribute. 

# Lessons Learned

## SVG is as much development as it is design

The graphic built either through code or a piece of software like [Inkscape](https://inkscape.org/en/) matters. A lot. The way you manufacture the graphic ultimately influences what you can do with it. 

This means you should pay attention in the desin phase. Attention to how elements are stacked one on top of another, how the same elements are grouped together, which identifier are specified for which element and which group.

*Small note on this last point*: if you run your SVG assets through an optimizer like [SVGO](https://github.com/svg/svgo) (which you should), identifiers might be edited out for space. You can therefore pay less attention to this activity in the design and add the indendifier later in the code editor, as needed.

In the small project already, this lesson already demonstrates its worth. 

As you may notice if you have a keen eye, the SVG for the menu found in the `Resources` folder slightly differs from the SVG included in the `index.html` file.

```HTML
<path d="M51.931 1.995A39.622 39.41 0 0 1 71.742 16.31L39.688 39.475z" fill="#fff" stroke="#11f" stroke-width=".132" transform="matrix(.33334 0 0 .33333 0 0)"/>
<g transform="matrix(.11362 .11301 -.1128 .1122 50.185 -27.966)">
  <path d="M1.537 279.16h16.638v16.638H1.537z" fill="none" stroke="#33f" stroke-width=".529"/>
  <path d="M2.873 280.63h16.638v16.638H2.873z" fill="#fff" stroke="#33f" stroke-width=".529"/>
  <path d="M4.11 296.065h14.165v-5.546l-4.21 2.512-5.212-6.99-4.744 6.202z" fill="#33f"/>
  <circle cx="16.437" cy="284.906" r="1.336" fill="#33f"/>
</g>
```

```HTML
<g id="picture-menu" class="menu">
  <path d="M51.931 1.995A39.622 39.41 0 0 1 71.742 16.31L39.688 39.475z" fill="#fff" stroke="#11f" stroke-width=".132" transform="matrix(.33334 0 0 .33333 0 0)"/>
  <g transform="matrix(.11362 .11301 -.1128 .1122 50.185 -27.966)">
    <path d="M1.537 279.16h16.638v16.638H1.537z" fill="none" stroke="#33f" stroke-width=".529"/>
    <path d="M2.873 280.63h16.638v16.638H2.873z" fill="#fff" stroke="#33f" stroke-width=".529"/>
    <path d="M4.11 296.065h14.165v-5.546l-4.21 2.512-5.212-6.99-4.744 6.202z" fill="#33f"/>
    <circle cx="16.437" cy="284.906" r="1.336" fill="#33f"/>
  </g>
</g>
```

This because the different menu sections, which are animated one section at a time, are not grouped together in the SVG syntax. Grouping the elements in a `g` tag allows to fix such a nuisance, which is exactly what the HTML syntax achieves.

The sections, and other SVG elements, are also attributed an identifier of sort. Whether a class or id, these additions are essential in order to target the desired element, in the CSS stylesheet as well as in the JS script.

## CSS Variables are oh so valuable

The ability to create a value which can be 1) used in the stylesheet and 2) updated as needed provides quite the flexible design in CSS.

Two sections with the same CSS property can leverage different values through few simple lines of code.

```CSS
/* define a variable in the scope which is needed */
:root {
  --transition-delay: 0.25s;
}
/* use the value in a css property */
.menu {
  transition-delay: var(--transition-delay);
}
/* update the variable as needed */
.menu:nth-of-type(2) {
  --transition-delay: 0.2s;
}
.menu:nth-of-type(3) {
  --transition-delay: 0.15s;
}
```

In the small example provided, the same property of `transition-delay` has different meanings for the different sections, simply through the updating statement. 

CSS variables allow for a more delightful design than declaring said property with different values, separatly and for every selector.
Just delightful.
