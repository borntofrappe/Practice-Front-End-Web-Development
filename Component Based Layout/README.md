Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/pen/Yagrja?editors=0010).

# Preface 

The purpose of this particular project folder is to implement knowledge regarding **React** and **CSS Grid**, with particular importance given to the first topic of the two. Indeed I have so far only experimented with the JS library on the surface level, and my learning has been mostly theoretical.

In the project at hand, the goal is to use React to manufacture a simple page layout that is then styled, component by component, with CSS grid. I use this particular layout technique since most of my latest projects have been using flex properties, and I wanted to practice with both methodologies.

# Plan

- [x] create a simple HTML document with a single div container
- [x] use react to include components for the navigation bar, a section dedicated to the "main" content and a footer with departing information
- [x] in the stylesheet, use grid properties to create different layout for different screen sizes. Make the page responsive.
- [x] while at first using only color to distinguish the section, include now some filler text

**Bonus points**: Use CodePen for the lifetime of the project, as this allows to easily integrate React, ReactDOM and Babel. But after you achieve the described result, figure out how to replicate the project locally, importing and installing the required packages.

# Lessons Learned

There's a bunch of lessons learned and applied in this project. A small schedule is warranted.

- [React Rendering](#react-rendering)
- [Elements and or Components](#elements-and-or-components)
    - [JSX elements](#jsx-elements)
    - [Stateless Functional Component](#stateless-functional-components)
    - [Class Components](#class-components)
- [Target Node](#target-node)
- [Nested Components](#nested-components)

- [CSS Grid](#css-grid)

## React rendering 

To render code in the HTML document and subsequently in the page, you need to use a `.render()` method. This method accepts two parameters.

1. the element or component to be rendered 
1. the node in the HTML document at which point the element or component need to be included

```JSX
ReactDOM.render(elementOrComponentToRender, targetNode);
```

**Important note**

The syntax of the first parameter varies depending on whether you have an element or a component.

We'll see the how to build each of the two in a coming section, but for it is important to stress here that elements can be included in the `render()` method as-is, while components need to include the name of the component wrapped in a `<self-closing/>` HTML tag. More on this in the [target node section](#target-node).


## Elements and or Components

You have several possibilities when it comes to render content with the JS library under scrutiny.

1. ### JSX elements

    It is posible to include HTML markup straight with the syntax provided by React under the JavaScript extension JSX. The syntax used overlaps JavaScript with HTML markup, but it should't scare you away.

    Simply attribute HTML elements to variables to create JSX elements.

    ```JSX
    const JSX = <h1>Hey, I'm a heading somewhere :)</h1>;
    ```

    Once created, this can be easily included in the DOM through the prefaced `.render()` method.

    ```JSX
    ReactDOM.render(JSX, targetNode);
    ```

1. ### Stateless Functional Components

    React is all about components. One approach to build such a feature is through **JavaScript functions**. These are functions with a `return()` statement which defines the HTML markup to be rendered.

    In one of the simplest forms, such a component looks like the following.

    ```JSX
    const StatelessFunctionalComponent = function() {
        return (
            <h1>I'm a stateless functional component</h1>
        );
    };
    ```

    In the `return()` statement include the JSX syntax much alike the previous example.


    *Small note*: forgot to add, but it was clear from the heading, such functions are labelled stateless functional components. This beceause they don't make use of state (a concept coming soon in the next section).

    *Not-so-small note*: it is customary to label components in camelCase, with the first letter also capitalized.

1. ### Class Components

    With the class syntax introduced by ES6 it is possible to define components which include content in the page through a `render()` method, similarly to stateless functional components. 
    
    The syntax here introduced allows for increasing possibilities, including for instance properties and state to manage and use data in the application. Leaving those feature for following considerations, a class component in a very rudimentary version looks as follows.

    ```JSX
    class ClassComponent extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return(
                <h1>I'm a class component</h1>
            );
        }
    }
    ```

    *Small note*: you need to extend a class of React.Component. Moreover, you need to instantiate the constructor method right atop the class.

**Important note**: for both approaches to include components you can include more complicated markup. The only requirement is that the `return()` method needs to return *one* HTML element. This one can nest multiple elements (like a container `div` would), and there cannot be two parent element.

Simply put, this works: 

```JSX
class ClassComponent extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return(
                <div>
                    <h1>I'm a class component</h1>
                    <h2>I'm a smaller heading</h2>
                </div>
            );
        }
    }
```

This does not work: 

```JSX
class ClassComponent extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return(
                <h1>I'm a class component</h1>
                <h2>I'm a smaller heading</h2>
            );
        }
    }
```

## Target Node

In all the previous examples, whether through JSX elements or otherwis components, the code is rendered with respect to a target node. This is simply an HTML element living the in the HTML document used as a container for all the content included by the library.

```HTML
<div id="app-container"></div>
```

As such, it is easily referenced and included in the `.render()` method with a couple of JavaScript lines.

```JS
// target node
const appContainer = document.querySelector("#app-container");

/*
define elements and/or components
*/

// render the elements / components in the target node
ReactDOM.render(elementOrComponentToRender, appContainer);
```

As prefaced, there is a differenced depending on whether you are rendering a JSX element or a component.

JSX elements can be included without any additional syntax.

```JSX
ReactDOM.render(JSX, appContainer);
```

While components need to be wrapped in a self-closing pair of HTML tags.

```JSX
ReactDOM.render(<StatelessFunctionalComponent/>, appContainer);
```

## Nested Components

Once elements/components are understood and properly rendered in their lonesome, it is possible to move beyond the simple constructs to build component-based applications.

To allow for such a feat, it is important to know how to nest components in other components. This is extremely useful as it allows to have a parent component which is rendered for the entire application and contains the logic of the application. Logic of the application manufactured in separate components (navigation bar, footer and such).

To nest components, all you need is to include their name, wrapped in a pair of self-closing HTML tags, in the render method of the parent component.

```JSX
const ChildComponent = function() {
  return (
      <h2>I'm a heading</h2>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I'm a larger heading</h1>
        <ChildComponent />
      </div>
    );
  }
};
```

You can nest stateless functional components and class components alike. 

Nesting components allows to build the structure required by the project in question. With the simple page-layout in mind, a parent component is used to display a navigation bar, a section dedicated to the main content, a side bar, a footer. All manufactured in separate components.

Just remember to return a single HTML element with the return statement.

## CSS Grid

As the structure of the page is elementary, CSS grid properties mostly relate to align the content of each section horizontally and vertically, with the properties of `justify-items` and `align-items` respectively.

```CSS
.mainContent {
  display: grid;
  justify-items: center;
  align-items: center;
}
.footer {
  display: grid;
  justify-items: center;
  align-items: center;
}
```

That being said, there are also two use cases that go beyond the simple application of the mentioned couplet.

- For the application container, a single column layout is specified and divided into three rows, one for each component.

    ```CSS
    .application {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 10fr 1fr;
      height: 100vh;
      width: 100%;
    }
    ```

    The second component, as it relates to the most prominent section of the page, is given a greater portion of the available height.

- For the navigation bar container, several keywords are used in the property of `grid-template-columns`.

    ```CSS
    .navigationBar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
    }
    ```
    
    These allow to create a layout which changes according to the available width. Keeping in mind that there are a total of 4 items in the grid container, the statement declares:
    
    - repeat for a certain amount of times a certain column structure. The `repeat` keyword accepts two items between parenthesis, literally the number of times to repeat the layout and the layout itself. For instance, `repeat(2, 100px 50px)` repeats a two-column structure twice (100px 50px 100px 50px);
    
    - while repeating, repeat the structure for how many times it takes to fill the available width. This is achieved with the keyword `auto-fit` included instead of a particular number of times;
    
    - the layout to be repeated should be a column that is at least 200px wide. If more space is available, stretch it to cover a portion of the remaining width. With `minmax`, it is exactly possible to specify between parentesis a range which details the minimum and maximum space which the layout should cover.


