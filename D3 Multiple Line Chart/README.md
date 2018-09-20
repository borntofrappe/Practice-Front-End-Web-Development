Link to the working pen right [here](https://codepen.io/borntofrappe/full/dqQjwj/).

## Preface

With this simple project I plan to practice once more with D3.js and with a simple line chart, while using real-world, actual data, as retrieved from the French national institute on statistics and economic studies.

The visualization in question is as mentioned a line chart, but a line chart as visible right [here](https://www.lemonde.fr/les-decodeurs/article/2018/07/26/le-chomage-diminue-legerement-depuis-le-debut-de-la-presidence-de-m-macron_5336271_4355770.html). Such a graph contains multiple lines, plotted in the same SVG elemnt, a legend, which allows to toggle the visibility of each single line, rotated ticks labels and an insightful tooltip.

The tooltip is rather intriguing actually. Indeed, a problem I see with a line chart is how the tooltip is only visible when hovering on the exact line, or dots highlighting the connections between the different segment. The cited visualization makes due by including a tooltip whenever the cursor hovers on the chart, regardless of the vertical coordinate of the cursor. It'd be neat to replicate such a feat.

## Data

The data is available in a CSV file right [here](https://www.insee.fr/fr/statistiques/3598305), under the label of "Données Complémentaires". The file contains plenty of information regarding the unemployment in France, divided by age, gender, across the years. For the simple line chart however, the information drawn from the comma separated value file relates to the date for the unemployment rate in France, as divided by age groups from 2012 to 2018.

In a table, it can be summed up as follows:

|Trimester|15-24|25-49|>49|Total|
|---|---|---|---|---|
|2012-T1|22.9|9|5.8|9.5|
|2012-T2|23.6|9.1|6.2|9.7|
|2012-T3|24.7|9.1|6.1|9.8|
|2012-T4|26.1|9.2|6.5|10.1|
|2013-T1|25.7|9.5|6.7|10.3|
|2013-T2|25.4|9.7|6.9|10.5|
|2013-T3|24.7|9.6|6.9|10.3|
|2013-T4|23.9|9.6|6.6|10.1|
|2014-T1|23.8|9.5|7|10.1|
|2014-T2|24|9.6|6.8|10.2|
|2014-T3|24.3|9.8|6.8|10.3|
|2014-T4|24.7|9.9|7|10.4|
|2015-T1|24.9|9.8|6.7|10.3|
|2015-T2|24.6|9.8|7.3|10.5|
|2015-T3|24.5|9.8|7.1|10.4|
|2015-T4|24.5|9.6|6.9|10.2|
|2016-T1|24.9|9.6|6.7|10.2|
|2016-T2|24.4|9.3|6.8|10|
|2016-T3|25.1|9|7.2|10|
|2016-T4|23.9|9.4|6.9|10|
|2017-T1|22.4|9|6.8|9.6|
|2017-T2|23.3|8.7|6.5|9.4|
|2017-T3|22.3|9.2|6.6|9.7|
|2017-T4|21.3|8.3|6.4|8.9|
|2018-T1|21.4|8.6|6.5|9.2|
|2018-T2 (p)|20.8|8.5|6.5|9.1|

In an array of objects, the data is formatted as in the `data.js` file.

## Update

By looping through a for loop, it is possible to rather easily plot one line for each category and a series of circle elements on the same line. The loop allows to also incorporate a legend item for each line.

**Tooltip on Hover**

For the tooltip, the mentioned feature was achieved with a bit of trickery. The goal is to have a tooltip displayed on hover, disregarding the vertical dimension. Whenever the cursor hovers on the visualization, the tooltip ought to display information connected to all the lines, even if the cursor is actually not on the line.

The trickery functions as follows:

- include `path` and `circle` elements in a wrapping `g` element. This allows to later refer to the `circle` elements with the `:nth-of-type()` pseudo selector, referring directly to the group element which nests them;

- include `rect` elements for each band, from the start to the end of the band and as tall as the entire SVG frame. The idea is to have the `mouseenter` and `mouseout` events triggered by the rectangle elements, in stead of the actual, underlying visualization;

- include a `transparent` value for the `fill` property. This wary of the fact that a value of `none` would actually remove the rectangle elements from the reach of the cursor, preveting any event from being triggered;

- on hover on the rectangle elements, consider the index of the hovered element and use it to target all `circle` elements with the same index. This is where the grouping of the path and circle elements comes into play. Indeed, the index of the rectangle element matches of the index targeting the circle elements through the specified pseudo selector;

- retrieve information from the `circle` elements, which I failed to mention earlier is stored for each `circle` in a `data-rate` attribute. Include the pertinent information for the separate data points, each in a paragraph element.

**Tooltip Position**

For the position of the tooltip instead, the `width` and the `height` of the tooltip are used to lay the `div` container relative to the cursor. To access such dimensions, it is first necessary to retrieve the node which is the `div` element itself:

```JS
let tooltipBox = tooltip.node().getBoundingClientRect();
```

This will provide an object with many properties, among which `width` and `height`. Just remember to call this instance **after** the paragraph elements are appended to the container, as this would otherwise retrieve width and height information without considering the nested elements.