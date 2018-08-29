Link to the working pen right [here](https://codepen.io/borntofrappe/full/GXjRVe/).

## Preface

With this small project, I plan to practice with a simple layout to visualize data: a line chart inspired by Google Trends.

In these visualization, three lines are drawn to highlight a certain numeric value. I picked for this purpose the google searches regarding HTML, CSS, JavaScript in the last thirty days, as in the [following query](https://trends.google.com/trends/explore?date=today%201-m&q=%2Fm%2F03g20,%2Fm%2F015tjh,%2Fm%2F02p97):

```code
https://trends.google.com/trends/explore?date=today%201-m&q=%2Fm%2F03g20,%2Fm%2F015tjh,%2Fm%2F02p97
```

It is theoretically possible to include the data as a CSV file, but for practical purposes (namely, no need to upload the file), I decided to convert the comma-separated values in an object nesting one array for each trend:

```JS
const trends = {
  html: [38,38,69,74,71,74,68,39,36,67,72,72,72,63,38,35,65,69,60,70,65,39,36,68,72,70,71,67,37,35],
  css: [22,21,46,48,48,48,46,23,20,45,48,47,48,43,22,20,43,45,40,48,43,21,20,44,46,47,47,43,20,21],
  js: [39,38,93,100,97,99,90,41,39,91,96,97,97,85,39,38,87,92,80,92,86,40,37,90,98,91,96,87,38,38]
}
```

A line chart might be quite easy to create. The y-coordinate of each point is determined by the mentioned values, while the x-coordinate is an ordinal one, literally incrementing for each data point to highlight the succession of days.

## Design

**Color Palette**

- for the background of the body, #1490B9;
- for the background of the panel, or card in which the visualizations are shown, #F9FCFF;
- for the html line, #9CC2FD
- for the css line, #A389F4
- for the javascript line, #FDB39F, #FF9F38

**Font**

- [M PLUS 1p](https://fonts.google.com/specimen/M+PLUS+1p).