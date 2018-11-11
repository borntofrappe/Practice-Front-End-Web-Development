# D3 Practice

Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/YRGGWY/).

## Preface

Perhaps better labeled as D3 phamplet. With this at least two-days effort I plan to recreate [this visualization @lemondefr](https://www.lemonde.fr/les-decodeurs/article/2018/11/09/petit-manuel-a-lire-avant-de-debattre-de-la-hausse-des-prix-du-carburant_5381196_4355770.html). This allows me to practice with D3 as a whole, and trying to build a more complex visualizations. Good practice with D3 and as it turns out, SVG as well.

## Project Structure

The larger application is made up of multiple visualizations. To cope with each one of them, they are developed separately and found separately in the following folders:

- Line Chart Time Series. A line chart making use of a time scale and showcasing the price of gasoline and diesel over the years.

- Stacked Column Chart. Two columns describing the proportion of the change in price due to taxes.

## Development notes

A few thoughts jotted down while developing the application.

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
