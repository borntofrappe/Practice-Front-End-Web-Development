<!-- Link to the working pen right here -->

## Preface

With this simple project I plan to practice once more with D3.js and with a simple line chart, while using real-world, actual data, as retrieved from the French national institute on statistics and economic studies.

The visualization in question is as mentioned a line chart, but a line chart as visible right [here](https://www.lemonde.fr/les-decodeurs/article/2018/07/26/le-chomage-diminue-legerement-depuis-le-debut-de-la-presidence-de-m-macron_5336271_4355770.html). Such a graph contains multiple lines, plotted in the same SVG elemnt, a legend, which allows to toggle the visibility of each single line, rotated ticks labels and an insightful tooltip.

The tooltip is rather intriguing actually. Indeed, a problem I see with a line chart is how the tooltip is only visible when hovering on the exact line, or dots highlighting the connections between the different segment. The cited visualization makes due by including a tooltip whenever the cursor hovers on the chart, regardless of the vertical coordinate of the cursor. It'd be neat to replicate such a feat.