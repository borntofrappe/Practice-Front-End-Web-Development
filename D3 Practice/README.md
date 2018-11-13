# Infograph: Taxes on gasoline and diesel

Link to the work-in-progress collection right [here](https://codepen.io/collection/XeWPww/). Visualizations are being created separately to better understand each uniqueness and later merge them in a single comprehensive infograph on the subject-

## Preface

The purpose of this rather intensive effort is the recreation of a visualization proposed by the French newspaper @lemondefr in its 'Decodeurs' feature, and available [right here](https://www.lemonde.fr/les-decodeurs/article/2018/11/09/petit-manuel-a-lire-avant-de-debattre-de-la-hausse-des-prix-du-carburant_5381196_4355770.html). It is actually a small manual centered around the recent increase in taxes on gasoline and diesel, providing multiple visualizations in a single phamphlet.

## Project Structure

The larger application is made up of multiple visualizations. To cope with this complexity, the visualizations are developed separately, available in different folders of this repository and live on codepen, as follows:

- [Line Chart Time Series](https://codepen.io/borntofrappe/full/MzjOEZ). Visualization describing the price of diesel and gasoline from May 2017 to October 2018.

- [Stacked Column Chart](https://codepen.io/borntofrappe/full/RqGeQX). Visualization describing how much of the rise in price is due to taxes, and how much is due to other costs.

- [Side by Side Column Chart](https://codepen.io/borntofrappe/full/YRGRQq/). Visualization describing the increase of taxes since 2013 and on an early basis. Showing for each year two columns side by side.

- [Single Line Chart Time Series](https://codepen.io/borntofrappe/full/jQVmMW/). Visualization describing the evolution of price of oil, considering the price of a barrel of brent.

- [Stacked Bars and Simple Heatmap](https://codepen.io/borntofrappe/full/XyNoJv/). Visualizations describing the components of the price of gasoline, how taxes are distributed and how much vehicles contribute to gas emissions.

- [Stacked Column Charts](https://codepen.io/borntofrappe/full/GwrLgr/). Visualizations describing the portion of gasoline, or diesel, price devoted to taxes and the portion to other costs.

- [Stacked Bar Plot](https://codepen.io/borntofrappe/full/BGpEow/). Visualizations describing the price of gasoline (detailing taxes and other costs) for a selection of countries.

## Development notes

A few thoughts jotted down while developing the application.

### Update 12/11

Barring unforseen circumstances, I am on the path of completing every separate visualizations, pretty rapidbly. To further motivate development, here's a short list of what is left:

- [x] a line chart detailing the price of barrel oil;

- [x] a single stacked bar to describe the componsition of the price of fuel;

- an inordinate amount of stacked columns for the percentage of taxes and other costs in the price of gasoline and diesel;

- [x] simple bars displaying information of how taxes are distributed;

- [x] something similar to a heatmap detailing the contribution of automobiles and heavy weight vehicles to carbon emissions;

- a bar plot detailing the price of gasoline across countries.

Mostly, it is a matter of applying the concept already applied with the three visualizations, but with different colors/specifics.

### Update 11/11

Considering the progress achieved with the visualizations, and the large scale of the project, I decided to divvy up the effort into separate, smaller scale components. In separate folders I therefore plan to detail the different visualizations, focusing entirety on the single elements and then merging them all together in the single, main application making up the 'manual' studying the evolution of carburants, the price and the tax contribution over the years. This ought to allow me to focus on the details of each visualization (for instance, an exact time scale) and work much faster than with a single script file.

### Update 10/11

Finding the necessary data proved to be much more of a challenge than anticipated. In the current state of things, the project shows simply a line chart with a few text elements hinting at a continuation. I am invested in this project however, and I plan to revise the current codebase and continue with the other visualizations.

Necessary improvements:

- fix the CSS structure (actually SCSS) to better take advantage of specificity and the two columns split necessary for the visualizations inside the larger container;

- fix the SVG elements making up the line connecting the visualizations. Indeed specifying hard-coded values for the width and height causes the elements to jump out the container on smaller screen. It boils down to use relative measures (perhaps woking with the `viewBox` attribute and letting the CSS take hold of the right measurement).

- fix the line chart to

  1. display data from May to October, and not simply June to October;

  1. highlight the precise data point through a circle element.
