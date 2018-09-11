Link to the working pen right [here](https://codepen.io/borntofrappe/full/LJdeRj).

## Preface

For the daily coding session in the 100 days of code challenge, I decided to once more practice with the data viz library. Inspired by an article by @lemondefr on [growing temperatures](https://www.lemonde.fr/les-decodeurs/article/2018/09/08/le-rechauffement-climatique-au-pas-de-la-porte-retrouvez-l-evolution-des-temperatures-dans-votre-ville_5352167_4355770.html), and a bit of research on alternative layouts, I plotted two visualizations making use of the following data:

- [statistics on average temperatures globally](https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/ytd/12/1880-2018?trend=true&trend_base=10&firsttrendyear=1880&lasttrendyear=2018);

- [statistics on average temperatures in metropolitan France](http://www.statistiques.developpement-durable.gouv.fr/indicateurs-indices/f/2082/0/temperature-moyenne.html).

Picking the same time-frame, from 1905 to 2011, the visualizations materialized into

- a chart displaying [warming stripes](https://www.climate-lab-book.ac.uk/2018/warming-stripes/), visualizing rectangle of same width/ height, but different fill colors (in accordance to the values they each represent);

- a chart displaying bars atop and below the x-axis (in accordance to the positive/negative value of the underlying data).

Knowledge of SVG syntax is to really be appreciated. Once the library and the vector language are half-understood, visualizations are just a matter of imagination (and a bit of experimentation as well).

