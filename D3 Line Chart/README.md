Link to the working pen right [here](https://codepen.io/borntofrappe/full/PBBoYB/)

## Preface

Among the many visuals used by the British Broadcasting Corporation in their commentary on F1 races, I found a chart displaying race laps to be particularly entertaining.

This project sets out to replicate such a design, creating the nice, possibly interactive visualization while practicing with [D3.js](). It is an excellent pretext to get acquainted once more with the library, which is something I quite need as I prepare to tackle the projects for the _Data Visualization_ certification @freeCodeCamp. 

_Small note_

The mentioned certification will be pursued **only once** I have finally earned the _Front End Libraries_ certification. Plus perhaps five days to cushion the change.

## D3.js

As my last stint with the library is more than two weeks old, I will try and document much of the process that goes into the creation of the simple graphic.

**Data**

To display the position held by the different riders during the race, the graphic makes use of several lines. One line for each rider for that matter.

The x-axis shows the different laps run in the race. I will keep myself to 25 laps, showing one ticks for every 5th lap, with the exception of the starting lap. (1, 5, 10, 15, 20 and 25).

The y-axis shows the different riders, with a three letter code summarising their last name. For simplicity, once more, I will limit the number of riders to six. The hope is that, once the chart is created for those six, it can be easily extended to include additional riders and perhaps even longer race results.

For every rider and for every lap, a dot details the position of the line. The line moves therefore from left to right, altering its horizontal position in terms of laps and vertical position in terms of rider's position.

It will make much more sense once the visual is created, but the idea is to have one line for each rider and show the change in positions throughout the race, as highlighted by the straght lines moving up and down, but always to the right.

Given this long preamble, the data is included through a hard-coded object providing one data point for each rider. Each data point describes:

- the three letter "code" name;

- the position, in terms of an array detailing with an integer the position in the different laps;

Additonal fields might help in providing a more detailed visualization, but for the current scale of the graph, I will use only the two specified fields.


```JS
const riders = {
  hamilton: {
    codename: 'ham',
    position: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2]
  },
  bottas: {
    codename: 'bot',
    position: [2,2,2,2,2,2,2,2,2,4,4,4,3,3,3,3,3,3,3,3]
  },
  raikkonen: {
    codename: 'rai',
    position: [3,4,4,4,4,4,4,6,6,6,5,5,5,5,5,4,4,4,4,4]
  },
  vettel: {
    codename: 'vet',
    position: [4,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,1,1]
  },
  sainz: {
    codename: 'sai',
    position: [5,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,6,6]
  },
  gastly: {
    codename: 'gas',
    position: [6,3,3,3,3,3,3,5,5,5,6,6,6,6,6,6,6,6,5,5]
  }
}
```

_Small note_:

While the first four data points aptly represent the riders' positions in the _Hungarian Gran Prix_, the four and fifth riders include made up positions to fill in the blanks. By including all riders, it won't be necessary to make this kind of adjustment.

**Include Library**

To benefit from D3 and connected methods, it is necessary to first include a reference to the library:

```HTML
<script src="https://d3js.org/d3.v5.min.js"></script>
```

Its inclusion allows for such methods as `.select()` and `append()`, used in the script to include an area dedicated to the chart and path elements for the different lines. 

**SVG Margin**

To have a more robust data visualization, which allows to easily include axes and data without fear of cropping out elements, it is advisable to include an area inside of a wrapping `<svg>` element. This area, which can be included through a `<g>`roup element, can be defined inside of the parent node and safely include the data visualization.

```JS
const containerData = d3.select("div.data");

// define values which distance the data visualization from the wrapping <svg> element
const margin = {
  top: 20,
  right: 40,
  bottom: 20,
  left: 40
};

// define the width and height value deducting the respective margin values
// this allows to later use the values for the data visualization as a whole, safely inside of the wrapping g element
const w = 900 - margin.left - margin.right,
      h = 500 - margin.top - margin.bottom;

// append an <svg> element with a viewBox attribute described by the width and height values
// these augmented by the margin values as to have the SVg encompass exactly the measures defined by the absolute units (900 and 750) 
const svg = containerData
              .append("svg")
              .attr("viewBox", `0 0 ${w + margin.left + margin.right} ${h + margin.top + margin.bottom}`);

// inside of the <svg> element include a <g> element, in which the data visualization will be included 
// translate <g> to have the grouping element nestled inside of the SVG
const svgCanvas = svg
                  .append("g")
                  .attr("transform", `translate(${margin.left}, ${margin.top})`);

```

As expressed in the comments, this practice has the bonus of: 

1. including an area dedicated to the data visualization, of known size;

1. include the data visualization inside of the area, displaying its contents appropriately and in full;

1. work with SVG elements directly referencing the width and height values, without need of further adjustments through margin/padding/ad-hoc measures.

**Line Chart**

To draw a line with an SVG element, the library has a two step process:

- create the line, detailing the `x` and `y` coordinates of each point;

- include the line in the `d` attribute of a `path` element. 

The difficult portion is to include a line based on data which will be included later. A mixture of visualization and a helpful of experimentation generates the desired result.

For instance, and for the project at hand, the chart needs to draw a line, whose x-coordinate relates to each subsequent lap. The `x` coordinate is therefore based on an array nesting the lap values, weighed by the scale which plots the laps in the width of the SVG canvas.

```JS
const line = d3
  .line()
  .x((d, i) => xScale(laps[i]));
```

The y-coordinate is instead related to each subsequent driver. As the visualization includes the riders with a scaleBand function, an ordinal function, the line would actually be offset to the top of each band. To accommodate for such a change, it is possible to include a measure for the width of the band itself, and have the line centered exactly where the data requires it.

```JS
const line = d3
  .line()
  .y((d, i) => yScale(d) + yScale.bandwidth()/2);
```

The line here defined is fed to a path element, which includes as data the array describing the position of each subsequent rider. This data is directly accessed and used in the line function through the `d` argument.

**Finishing touches**

The SVG and path elements do a great job in describing the shuffle of riders across the race. That being said, a few modifications and upgrades can be included to provide a visualization pleasing to the eye and incredibly easy to understand.

- the lines should have a different color. Riders of the same team should additionally share one color. This is where the inclusion of another field in the data object is advisable;

- atop the graph, a header should display additional information regarding the race (something similar to F1 Race Lap Chart, Lap: 25/70, Budapest).


