Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/bMVaro/).

# Preface 

The purpose of this project is to pick up once more the knowledge gathered going through the freecodecamp section on react (and knowledge collected scarcely and from everywhere on the internet). Knowledge regarding react.js and specifically regarding stateful components and components' properties.

# Plan

- [x] create the layout for a profile page, in which a picture and information related to an arbitrary user are shown
- [x] use properties and state values to gather information regarding the profile name, age or otherwise relevant information
- [x] pass the properties and or state to child components as to lay out the exact information
<!-- - provide an update menu in which the name, age or otherwise information can be updated
- upon using such an update function, alter the information displayed on page. -->

# Lessons Learned

## SVG in React

SVG syntax can be included in the JSX JavaScript extension exactly in the same fashion with which they are incorporated in the HTML markup. Inline it is indeed possible to include SVG elements. 

For small SVG, such as for simple shapes, this solution is not-too-cumbersome, but for larger-scale assets it might be best to look for alternatives (remember the SVG set you include in the HTML, separating definition from use).

A small effort in this directin can be achieved by separating the SVG in a single component and reference it where needed.


```JSX
// define SVG in a component
const ExploreProfilesGraphic = () => <svg className="svg--eye" width="40" height="40" viewBox="0 0 40 40">
          <circle cx="50%" cy="50%" r="50%" />
          <ellipse cx="50%" cy="50%" ry="20%" rx="30%"/>
          <circle cx="50%" cy="50%" r="15%" />
        </svg>;

// include the component as needed
const NavigationBar = () => {
  return(
    <nav className="navigation-bar">
      <a href="#" title="Explore Profiles">
        <ExploreProfilesGraphic />
      </a>
      <a href="#" title="Modify Profile">
        <ModifyProfileGraphic />
      </a>
    </nav>
  );
};
```

// TODO ADD NOTES ON REACT.JS STATE AND PROPERTIES

## Stateful Components

Unlike previous efforts with the React library, the current project makes use of stateful components. Components with **state**. This is used to collect and centralize data in one component, which uses them as needed. 

This centralization also allows for a unidirectional flow of data, from a main, parent component to nested, child components. It is indeed possible to pass the values present in the state as **properties**, to nested components, and use these values directly in the JSX syntax.

**Example**

In a class component, a state can be included in the constructor method, with the object `this.state`.

```JSX
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Vyro Uxta'
    }
  }
};
```

In this example, a key for the 'name' is included for the value of 'Vyro Uxta'.

Once instantiated, the key-value pairs of the state are accessible in the component itself, through the `this` keyword.

Alternatively, they can be passed, distributed to nested components. They are included like ordinary attributes in HTML elements.

```JSX
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Vyro Uxta'
    }
  }
  render() {
    return(
      <div className="app__container">
        <ContentSection name = {this.state.name} />
      </div>
    );
  }
};
```

The only minor difference is the inclusion of curly braces, used to include JS script.

The nested component has then access to this value under the `props` preface.

```JSX
const ContentSection = (props) => {
  return(
      <h1>Hello {props.name}</h1>
  );
}
```

Just remember to include `props` between parens as it needs to be the argument of the function.
