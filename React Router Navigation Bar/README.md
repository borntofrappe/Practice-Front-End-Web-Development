Link to the working pen [right here](https://codepen.io/borntofrappe/full/gjzjrE).

# Preface

The purpose of this project is the creation of a simple navigation bar, inspired by [Scott Tolinski](https://twitter.com/stolinski)'s [own website](http://scotttolinski.com/about) and using [React Router](https://github.com/ReactTraining/react-router). 

A good excuse to practice with a simple, yet elegant design and the popular routing utility.

## Design

The navigation bar offers a different experience depending on the viewport. On larger viewports for instance, a string is shown in the available space when hovering on the element.

The most difficult section is not however the inclusion of this string, achieved by including a pseudo element underneath a header element.

The challenging section revolves around the routing library, which is once more proof how good an idea it was to practice with it.

A `Switch` element is included to wrap all the possible Routes, which themselves render a single element. Given the simplicity of the project, the element can be injected directly in between `Route` elements, and not through a component passed with a component attribute.

Instead of anchor link elements then, the navigation bar includes `Link` elements. Themselves, these elements require a to attribute forwarding toward the different routes, and not href attributes.

_Please Note_

For the routing to properly occur through and thanks to all the specified elements, it is necessary to wrap the component in a Router element. From recent versions of the routing library, this element is found under the `BrowserRouter` label, and it wraps the entire App component.


