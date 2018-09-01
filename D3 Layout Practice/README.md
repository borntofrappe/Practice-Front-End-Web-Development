Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/pen/MqpmPO).

## Preface

This project falls in the line of past efforts in D3 Land, to practice with the data visualization library. It is specifically  inspired by the [Federal Association of French Hunters](http://chasse.bipe.fr/#/Chasseurs), which is also responsible for the actual data.

The data found in the referenced link is used to to create:

- a pie chart, with slices glowing on hover;

- a bar chart, with more than one column per band, each describing sub-categories;

- a radar chart, detailing several categories much alike a bar or pie chart, but in a different, possibly debatable, visual.

The previous two layouts have been previously created with D3.js, and even if they present new details (like the glowing slices, but mostly the multiple columns), they should not present too much a challenge.

The last layout on the other hand might prove more difficult. As of writing, I have very few ideas on how to tackle the radar plot in an efficient way. One thing at a time though.

## Pie Chart

**Data**

The data relates to hunters by type of permits. Apparently, there seem to be three types of permits in the federation, detailing the following numbers.

|Category|Macro Figures|
|---|---|
|Departmental|1055944|
|National|123652|
|Temporary|66677|

## Bar Chart

**Data**

The bar chart builds on top of the previous data to detail the types of permits, divided in age intervals with the following key figures.

|Category|Department Permits|National Permits|Temporary Permits|
|---|---|---|---|
|15-24 years|72.24061983|20.13964822|7.61973195|
|25-34 years|80.21689925|10.13580629|9.647294459|
|35-44 years|82.53281102|9.301237587|8.165951395|
|45-54 years|84.38854137|9.495186228|6.116272404|
|55-64 years|85.80551822|9.902865051|4.291616731|
|65-74 years|86.74456643|10.0631972|3.192236373|
|75 and more years|92.76908954|5.76046687|1.470443592|

## Radar Chart

For the radar plot, which is actually a layout I never created before, the data relates to the hunters population divided by age, and compared to the French population as a whole and the male French population.

**Data**

|Category|Hunters French Population|Male French Population|Total French Population|
|---|---|---|---|
|15-24 years|5.136755751|21.05900574|20.00639086|
|25-34 years|9.855144098|13.88407117|13.57070815|
|35-44 years|12.86331325|15.25910278|14.87464339|
|45-54 years|19.03563665|15.93144023|14.88597331|
|55-64 years|24.2365838|14.83513304|14.88597331|
|65-74 years|19.08305805|10.39772839|10.72535776|
|75 and more years|9.789508398|8.633518652|11.05095322|
