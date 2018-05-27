Link to the working pen right [here](https://codepen.io/borntofrappe/full/ELJPPj/).

# Preface 

Small project to practice with React, specifically with state, functions and controlled input.

The page has a controlled input, with react updating the UI, but not with the keystroke actually selected by the typist.

What would be neat would be the inclusion of a converter, allowing for a translation back to its original text. Something about which to think for a future update.

# Plan

- [x] set up an HTML file with react.js
- [x] include a single input element in a component, in the JS script file
- [x] render the file in the HTML document
- [x] set up the input element as a controlled input, using state and the onChange attribute to display on screen exactly what is typed in the input element
- [x] consider using a textarea element insted 
- [x] modify the onChange function and the result displayed in the render method to display not exactly what is typed in the element itself

# Notes

For ASCII code [this resource](http://sticksandstones.kstrom.com/appen.html) comes in handy.
For React, the following concepts where used in the script.

**Components**

Components can be included either with a function or class syntax.

With a function, all that is required is the creation of a function which returns an HTML element with JSX syntax.

```JSX
const FunctionComponent = function() {
  return(
    <h1>Hello</h1>
  );
};
```

The component can also be created with ES6 arrow functions, for brevity (especially when returning single elements).

```JSX
const FunctionComponent = () => <h1>Hello</h1>;
```

With class syntax, it is possible to benefit from additional features (such as state, discussed briefly hereafter).

The JSX syntax is included in a render method, returning the HTML elements in much the same way as functional components.

```JSX
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <h1>Hello</h1>
    );
  }
}
```

**State**

When using class components, it is possible to leverage state, to store and keep track of data.

In the constructor method, it is possible to initialize state by assigning to the state of the class an object, with the key-value pairs needed.


```JSX
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Johnny'
    }
  }
// render
}
```

In the component itself, it is then possible to use the initialized values as JS code, including the defined keys between curly brackets.

```JSX
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Johnny'
    }
  }
  render() {
    return(
      <h1>Hello {this.state.name}</h1>
    );
  }
}
```

It is important to remind how state is local to the component in which it is defined. In order to access the keys defined in a component in another component, it is necessary to pass the state as a property, cascading its value to nested elements.

Beside initializing and using state, it is useful to then update state. This is achieved by passing a new object with the updated values with a `setState()` function.

```JSX
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Johnny'
    }
  }
  
  someFunction() {
    this.setState({
      name: 'Carlton'
    });
  }
  
  render() {
    return(
      <h1>Hello {this.state.name}</h1>
    );
  }
}
```

