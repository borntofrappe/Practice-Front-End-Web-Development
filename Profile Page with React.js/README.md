Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/bMVaro/).

# Preface 

The purpose of this project is to pick up once more the knowledge gathered going through the freecodecamp section on react (and knowledge collected scarcely and from everywhere on the internet). Knowledge regarding react.js and specifically regarding stateful components and components' properties.

# Plan

- [x] create the layout for a profile page, in which a picture and information related to an arbitrary user are shown
- [x] use properties and state values to gather information regarding the profile name, age or otherwise relevant information
- [x] pass the properties and or state to child components as to lay out the exact information

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

## State and Properties
