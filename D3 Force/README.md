# D3 Force

<!-- Link to the work-in-progress pen right [here](). -->

## Brief

Practice with the data visualization library to display network information connected to the technology powering every pen [@codepen](https://codepen.io).

## Getting Started

The data for the _network diagram_ (or otherwise labeled _graph_), relates to the technology powering each pen on codepen, as mentioned in the brief. In detail, and in the settings tab, the technologies can be listed as follows:

- HTML;

- CSS;

- JavaScript.

Each is further refined through the following _preprocessors_:

- HTML:

  - Haml;

  - Markdown;

  - Slim;

  - Pug.

- CSS:

  - LESS;

  - SCSS;

  - Sass;

  - Stylus,

  - PostCSS.

- JavaScript:

  - Babel;

  - TypeScript;

  - CoffeeScript;

  - LiveScript.

## Development

As far as `script.js` is concerned, the _graph_ is created through the **d3 force** suit of functions.

From the [docs](https://github.com/d3/d3-force), the graph is created as follows:

1. create a similaton using the `d3.forceSimulation()` function. This accepts as argument an array of objects referring to the actual nodes.

   For instance, and for the following nodes:

   ```JS
   const nodes = [
     { tech: 'HTML' },
     { tech: 'CSS' },
     { tech: 'JavaScript' },
     { tech: 'Haml' },
     { tech: 'Markdown' },
     { tech: 'Slim' },
     { tech: 'Pug' },
     { tech: 'LESS' },
     { tech: 'SCSS' },
     { tech: 'Sass' },
     { tech: 'Stylus' },
     { tech: 'PostCSS' },
     { tech: 'Babel' },
     { tech: 'TypeScript' },
     { tech: 'CoffeeScript' },
     { tech: 'LiveScript' },
   ];
   ```

   The function is implemented as follows:

   ```JS
   const simulation = d3.forceSimulation(nodes);
   ```

1. add on top of the simulation **forces**, functions detailing the behavior of the nodes. How they attract, repel each other. How they position in the network.

    Each force is detailed through the `force()` function, accepting as argument a string, used to identify the force, and one of the d3 function describing how the nodes ought to behave.

    The general form:

    ```js
    simulation.force("force name", d3.forceFunction());
    ```

    Is applied for instance to describe how the nodes repel one another:

    ```js
    simulation.force("repel", d3.forceManyBody());
    ```

    Each function has default values, but can be further specified through additional (chained) methods.

    In light of this, it is perhaps more clear to separate each function in a variable and later refer to them as such:

    ```js
    const repel = d3
      .forceManyBody()
      .strength(-50);

    simulation.force("repel", repel);
    ```

1. with all the force set up, listen for a **tick** event to render the nodes and their force-based behavior.

    ```js
    simulation.on("tick", simulate);
    ```

    The simulation provides the position of the nodes through `x` and `y` coordinates. This information can be collected directly from the nodes array, as visible when logging the array itself.

    ```js
    console.log(nodes);
    ```

    For instance and for the first object, the following structure is now available.

    ```js
    {
      index: 0,
      tech: "HTML",
      vx: -0.0006083608906659253,
      vy: -0.00047547580685140833,
      x: 215.6776850777693,
      y: 205.17241780310135
    }
    ```

    Finding values describing the velocity and position of the nodes.

    In the `simulate` function this information can be included in the attribute of the SVG elements making up the graph itself. SVG elements included as follows:

    ```js
    function simulate() {
      const update = containerFrame
        .selectAll('circle')
        .data(nodes);

      update.enter()
        .append('circle')
        .attr('r', 5)
        .attr('data-tech', d => d.tech)
        .merge(update)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('fill', '#fff');
    }
    ```

    The separation between the update and enter phase is created to introduce first the elements with those properties not influenced by the simulation and later detail those relying on updating values. The `merge` function allows to literally merge the current selection to the one specified in between parens.

And that's pretty much about it. The documentation provides plenty more methods, details and insights on the structure of the network. Some of this information is documented in the script file, to hopefully allow to easily replicate the project in question. And learn from it.