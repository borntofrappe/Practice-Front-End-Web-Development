This app is currently being built through the `create-react-app` utiltiy. It is also replicated on Codepen.

Link to the working pen right [here](https://codepen.io/borntofrappe/full/GBqMdJ/).

_Small Codepen Caveat_

Unlike with `create-react-app`, in Codepen you include external libraries from the settings panel. To access the features these libraries offer, you may need to prefix the functions and variables with the libraries's name.

For instance, the following, using a Provider from the library `react-redux`.

```JS
// render the only stateful component in the single div found in the HTML document, wrapped in the redux provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
```

In Codepen, it needs prefixing.

```JS
// render the only stateful component in the single div found in the HTML document, wrapped in the redux provider
ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <App />
  </ReactRedux.Provider>, document.getElementById('root'));
```

The prefixing is mostly achieved with the camelcase name of the library, first letter capitalized as well, followed by a dot which allows to access the properties of the libraries. A small gotcha of which to be mindful.


# Preface

Following the starting point achieved with the [previous pen](https://codepen.io/borntofrappe/full/jpqLer/), this project builds on top of the React application as to include [Redux](https://redux.js.org/). This to track and manage the state of the application while learning the popular library.

## React Tune Up

Before actually including [Redux](https://redux.js.org/), I decided to improve the style of the application. Indeed I found a few issues when testing out the previous output, and I wanted to include a more solid design for the final product. I also wanted to include a few addition to make the application more approachable.

This tune-up is mostly achieved through CSS properties, even if an SVG element was also included in the `InputArea.js` files, as to include a nice icon for the button.

CSS properties were included to:

- avoid unnerving overflow, especially on smaller screen devices (here the input element would for instance push the button out of reach);

- create a separate layout for smaller screen devices (to perhaps include a more native-like look);

- include a neat image when no item is present in the to-do list (through the :empty selector).

There's still much which can be included in the app, like animation for the list items, as they are added and removed. This is however the topic of future research, in animation using React.

# Redux

In order to use Redux, as introduced in the @freecodecamp curriculum, it is first necessary to install a few dependencies through `npm`. The following command, in the root folder of the `react-app`, installs the following packages:

```code
npm install redux react-redux redux-thunk --save
```

- redux: includes the redux library;

- react-redux: includes the connect and provider functions required to pair the logic of the Redux library with the component logic of React;

- redux-thunk: includes a package to deal with asyncronous code, and other utilities I assume. I'm actually not using the dependency in question, so additional research is momentarily not warranted.

