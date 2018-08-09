<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this project I plan to practice with the following topics:

- d3.js, specifically with SVG syntax, used to create a column chart, linear and ordinal scales, to display the data and transition methods, used to animate the height of the different columns;

- fetch API, to access population data for a specific country, at a specified year;

- plain old JavaScript, to load the data for a different year. Or maybe country.

The starting [endpoint](http://api.population.io/), to generate a full-fledged column chart, is as follows:

```JS
http://api.population.io:80/1.0/population/2000/France/
```

Such an URL will return a response, structured an array of objects, each nesting the following structure:

```JS
{
  "females": 370973,
  "country": "France",
  "age": 0,
  "males": 390520,
  "year": 2000,
  "total": 761493
}
```

Given this structure, it'd be neat to include column chart as tall as the `total` field, but dividing the column itself in two different colors, according to the `females` (#E7567D) and `males` (#335BA1) properties.

On a white (#F4F4F4) background, with a dark blue (#192B37) for the axes and perhaps a yellow (#FFCB36) for accent.

Using [Ubuntu](https://fonts.google.com/specimen/Ubuntu) for the text of the labels, perhaps the ticks and header as well. 

@import url('https://fonts.googleapis.com/css?family=Ubuntu');
font-family: 'Ubuntu', sans-serif;