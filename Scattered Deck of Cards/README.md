Link to the working pen right [here]().

# Preface 

This small project was built as a proof-of-concept, in order to design the grid layout ultimately chosen for a larger endeavor. I will paste here the notes made on such endeavor with regards to the grid layout specifically.

# Extract 

For the design of the grid, I tried to create a simple layout for a deck of cards rotated now to the right, now to the left. This as to give the impression of a scattered set of cards, thrown without much care on an hypothetical table.

To achieve this effect, I simply included a different `rotate` value for the `transform` property, affecting multiple selections through the `nth-of-type()` pseudo-selector. This allowed me to style all cards in one way, every other item in another, every third in yet another fashion and so on. As the declarations follow one another from the smallest to the biggest `nth` value, there is no risk of having the smallest value override all bigger selections. The later the `transform` property is defined, the higher the priority in the stylesheet.

The grid itself is built with just a couple of grid-related properties. Each nested element spans `240px` in width and `320px` in height, absolute measures specified for the columns, as many as can possibly fit in the screen's width, and for the rows, leveraging the implicit grid:

```CSS
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 240px);
  grid-auto-rows: 320px;
  grid-gap: 40px;
}
```

A considerable gap is also included to avoid the occasional overlap between items with opposing rotation.