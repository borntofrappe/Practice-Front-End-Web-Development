This app is currently being built through the `create-react-app` utiltiy. Link to a live pen will soon follow.

Link to the working pen right [here](https://codepen.io/borntofrappe/full/GBqMdJ/).

_Small Codepen Caveat_

Unlike with `create-react-app`, in Codepen you include the libraries from the settings panel. To access the features these library offer, you may need to prefix the functions and variables with the library's name.

For instance, the following, using a Provider from the library `react-redux`.

```JS
// render the only stateful component in the single div found in the HTML document, wrapped in the redux provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
```

On Codepen, it needs prefixing.

```JS
// render the only stateful component in the single div found in the HTML document, wrapped in the redux provider
ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>, document.getElementById('root'));
```

This is mostly achieved with the camelcase name of the library, first letter capitalized as well, followed by a dot which allows to access the properties of the libraries. A small gotcha of which to be careful.


# Preface

Following the starting point achieved with the [previous pen](https://codepen.io/borntofrappe/full/jpqLer/), this project builds on top of the React application as to include the [Redux](https://redux.js.org/). This to track and manage the state of the application while learning the popular library.

## React Tune Up

Before actually including [Redux](https://redux.js.org/), I decided to improve the style of the application. Indeed I found a few gotchas when testing out the previous output, and I wanted to include a more solid design for the final product.

CSS properties were included to 1) avoid unnerving overflow, 1) create a separate layout for devices holding a width smaller than 400px and 1) include a neat image when no item is present in the to-do list. Plus a neat SVG icon instead of a bland plus sign, for the button.

# Redux

In order to use Redux, as introduced in the @freecodecamp curriculum in the section bearing the same name, it is first necessary to install a few dependencies through `npm`. The following command, in the root folder of the `react-app`, installs the following packages:

```code
npm install redux react-redux redux-thunk --save
```

- redux: includes the redux library;

- react-redux: includes the connect and provider functions required to pair the react library with the redux dependency;

- redux-thunk: includes a package to deal with asyncronous code, and other utilities I assume. I'm actually not using the dependency in question, so additional research is momentarily not warranted.

<!-- 
add notes on using Redux in the application
notes delayed to a future update as the project proved to be more challenging than anticipated
-->