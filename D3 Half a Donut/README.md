# D3 Half a Donut

Live demo [on codepen](https://codepen.io/borntofrappe/full/ZZQpKg).

## Preface

Inspired by [this particular article](http://www.europarl.europa.eu/news/fr/headlines/society/20190226STO28804/les-femmes-au-parlement-europeen) I decided to practice once more with the D3 library to replicate the visualization highlighting the percentage of men and women at the European Parliament.

I find the visualization particularly interesting considering.

- the semi-circle structure.

- the position of the labels.

The dataset is relatively straightforward, but the layout does provide a few challenges. Especially regarding the size of the slices: they have the same width, but different radius. This requires a bit more tweaking and tinkering with the `d3.pie()` and `d3.arc()` functions.
