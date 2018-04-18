Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/qYWPVg).

# Preface 

The purpose of this project is to experiment first hand with the D3.js JavaScript library, which allows to easily represent data in a webpage.

Specifically, the project is tasked to create a bar chart in which portions are drawn proportionally to the unerlying data points. The bar should be transitioned from a point of zero height to their respective dimension.

# Plan

- [x] include the d3.js library
- [x] include a header describing the project
- [x] include an SVG element in which to draw the chart
- [x] include one rectangle for each data point 
- [x] add a title and perhaps a text element describing each portion of the chart
- [x] bonus points: animate the chart, from hidden to full-scale

For the project at hand, work with a hard-coded series on values which are stored in an array, but theoretically you could include the option of alterning the values through an input element. Something about which to wonder for possible extensions.  


# Lessons Learned

The project makes use of the JS library D3.js. In implementing knowledge regarding this library, it appends content and data on the page through various methods, hereby specified.

**Include elements**

D3.js allows to easily include HTML elements in the DOM, through the `append()` method. All that is required is the selection of a node in the HTML markup, in which to locate the additional elements.

```js
d3.select("body")
    .append("h1")
    .text("Hello there");
```

Prefixed by the object **dr**, the methods of the library used in this example select a node in the document (the body in the particular instance), and append an element of `<h1>` right to it. Additionally, a text is given to the element, to make it clearly visible, but the core of the functionality is in the `append()` method. That's all it takes to add markup to the document.

**Include SVG**

One particular kind of HTML element, often recurrent in the use of the d3.js library, is the `<svg>` element.

This one indeed allows to define a canvas in which to draw shapes that are sharp and scalable in sizes. Shapes which can embed in their attributes and characteristics data that is set to be displayed on the screen.

A small example may help clear the air. In the project at hand, the goal is to draw a bar chart, with bars of different sizes according to a defined dataset. SVG can  be readily included to "draw" rectangles, with different height/width depending on the value of said dataset.

```js
const svg = d3.select(".container")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
```

**Include data**

So far the discussion has revolved around creating HTML elements with hard-coded values. To include actual data in the DOM, it is possible to leverage the `data()` and `enter()` methods.

The former accepts as argument the actual data, which in the project at hand is an array of points. The latter is used to create new HTML elements if need be.

In the following snippet a rectangle element is appended to the SVG for each data point.

```js
const dataset = [151, 100, 135, 107, 156, 72, 86];

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
```

Of course the rectangle elements require a few more lines to be visually present on the page, but the few lines here introduced already warrant a bit of discussion.

To include data indeed you select the elements which are then used to display the data. You do this **even** if the elements are not present in the DOM at all. The inclusion of the `enter()` method fills the gaps with the following logic:

- select all elements. If no element is present, this method returns an empty collection (not an error)
- include the data 
- enter new elements if there is a discrepancy between the elements present in the DOM and the elements required by the data
- append rectangle elements filling this gap 
 
Once this not-so-intuitive structure is understood, additional attention can be devoted to the attributes and style of the elements.

**Change elements based on data**

The data can be directly included in the methods used to define attributes and style, through _callback_ functions.

In the following snippet, the attributes of _y_ and _height_ are given a value dependant on the actual data points in the collected array. An arrow function is used for simplicity's sake, but a normal function accepting the same parameters works just as well.

```js
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i*40)
    .attr("height", (d, i) => 35);
```

In the functions, _d_ refers to the value of the data point, _i_ refers to the position, the index of the same value.


**Style elements** 

It is possible to style elements directly in the JS script, with a `style()` method.

```js
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i*40)
    .attr("height", (d, i) => 35)
    .style("fill", "red");
```

Alternatively, it is possible to define property-value pairs in the stylesheet, which is then referenced.

With d3.js it is also possible to include classes as to clearly identify elements.

```js
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i*40)
    .attr("height", (d, i) => 35)
    .style("fill", "red")
    .attr("class", "bar");
```

**Transition Elements** 

D3.js is mightily helpful to display data, and hopefully it'll be clear by the small lessons learned so far. It is however possible to use a `transition()` method to display simple animations regarding the style and attributes of the included elements, to make the page a tad more enticing.

The method in question needs to preface the style and attributes which are modified. It can be furthermore detailed by appropriate elements describing the duration of the transition, its delay, timing function and such. A read on the documentation is warranted, but the following example already provides a hint on D3.js animation.

```js
svg.selectAll("rect")
    .transition()
    .duration(1000)
    .delay((d, i) => 1000 + i*200)
    .attr("width", (d, i) => d*1.5);
```

In this snippet, the rectangle elements are transitioned in 1 second wiht a delay dependant on the index of each element and modifying the value of width. Of course a bit of thought goes into the values which are modified, their initial and eventual measure.

In the simple instance, without prior assignment, width is transitioned from 0 to the prescribed amount.

