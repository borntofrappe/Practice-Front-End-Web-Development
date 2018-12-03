# D3 Slider

Link to the working pen right [here](https://codepen.io/borntofrappe/full/NEJxom).

## Preface

Inspired by [this visualization @lemondefr](https://www.lemonde.fr/les-decodeurs/article/2018/11/22/cinquante-ans-d-occupation-illegale-comment-l-etat-israelien-encourage-la-colonisation-de-la-cisjordanie_5386842_4355770.html), I set out to create a simple slider to enhance a line chart.

Ideally I'd replicate the entire visualization, including the connected geomap sitting below the line chart, but one step at a time.

Turns out, managing the coordinate system requires a bit of research. Certainly demanding more time than currently available. Work-in-progress.

## Update

Lesson learned: reading the documentation is much more valuable that dilly dallying with hard coded solution. In one word I can label this lesson as: `d3.mouse`. Included through the `this` keyword, it allows to find the exact coordinates in the svg container.

```js
overlay.on("mousemove", function() {
  // find the horizontal coordinate
  const mouse = d3.mouse(this);
});
```
