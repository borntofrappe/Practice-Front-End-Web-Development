# Accountability Booster

Link to the working, vanilla JS pen right [here](https://codepen.io/borntofrappe/full/MPyKMK/).

Link to the working, React pen right [here](https://codepen.io/borntofrappe/full/YJWweQ).

As to:

1. practice with **React**;

1. practice with new React features such as **React Context** and libraries such as **Styled Components**, and perhaps even **React Router** and **Redux**;

1. create something practical, or something at I would personally use, at least.

I plan to create a few React-powered applications. The first of these application is, unsurprisingly, a _twitter updater_ for the _100 days of code_ challenge.

## Motivation

As I am currently involved in the 100 days of code challenge, I find myself posting my progress on a daily basis, right on twitter. While that is a tremendous way to make myself accountable, it is also a bother to constantly type the same hashtag over and over. I am pretty sure this is merely a problem I have, as a twitter newbie, but even solving the small issue of typing the #100daysofcode tag, I would still like a better, perhaps different way to share my efforts.

Such is the idea behind the project in question. A simple tool allowing me to:

- type a string of text in a simple input;

- add tags by way of a submenu, collecting frequently used tags in a series of buttons. It'd be mightily helpful, and incredibly neat, to have the tags change programmatically, but the AI that goes in such a feature is, currently, beyond the scope of the effort.

## Getting Started

Since the project presents quite a new set of challenges, and perhaps and most importantly since I am a little bit rusty with the React framework, I plan to tackle the effort one bit at a time, and document my progress all the way through.

This practically means:

- design choices are limited to overarching, essential decisions, such as those related to the color of the background, of the text elements.

- features are developed one at a time, allowing for instance to only share on twitter a string of text, for starters.

### Update

While designing the UI in a simple local environment made up of an HTML and CSS file, I got quite carried away and developed the application a bit more than expected.

In the spur of the moment, I got the idea to include a button allowing to toggle between themes, a light and a dark theme. To enable such a functionality, I created also a JavaScript file and before I realized it I basically developed the entire project in vanilla JS. You can find the working files in the "Vanilla JS" folder.

I still plan to create, or re-create the project with React, as to nevertheless practice with the framework. Using React might help in better understanding both the application and the framework, and perhaps even create a project more easy to expand upon.

## React

The application is structured as follows:

- `index.js` renders application through the `ReactDOM.render()` method, as usual;

- `App.js` manages the state of the application and renders the different elements and components making up the application.

### State

For the state of the application, the object considers a few fields:

- `isDark`: a boolean variable to toggle between color themes;

- `theme`: an array of objects detailing the colors used in the project;

- `hashtags`: an array of strings included in the buttons allowing to include hashtags in the textarea;

- `value`: a string, initially empty, used to keep track of the textarea's own value.

### Methods

The constructor function also contemplates a few methods, bound to context on which they are later applied:

- `handleChange`: for the `onChange` listener on the textarea element;

- `handleShare`: for the tweet button;

- `handleTheme`: for the toggle button.

These methods detail the different functionalities of the application.

### Components

With the described state and methods, `App.js` renders the following structure:

- a `button` element, absolute positioned in the top right corner and allowing to toggle the theme colors;

- a component describing the `header`, `textarea` and sharing `button`, in `AppMain.js`;

- a component describing one `button` for each hashtag value, in `AppSupport.js`.

## Styled Components

The `styled-components` library is used _alongside_ CSS stylesheet. This to separate rules concerning the overall layout and global aspects of the application from independent, specific-to-elements property value pairs.

One extremely helpful feature of the library is the ability to include media queries inside of the styled element, simply by nesting the media rule:

```JSX
const SupportButton = styled.button`
  padding: 1rem 0.5rem;

  @media (max-width: 600px) {
    padding: 0.5rem 1rem;
  }
`;
```

## Redux

In the spirit of practicing with React and connected technologies, I also decided to incorporate **Redux**, as a state management library specifically for the array of strings making up the hashtag buttons. Since my familiarity of the dependency is quite poor, here's a few pointers.

_Small note_: since the application doesn't modify the array of strings for the hashtags, at least for now, the use case of redux is simply to store the array and inject it where needed.

### Redux Store

Redux as a library is mainly included in the `Store.js` file, which allows to practice with core, essential aspects of the dependency.

- in Redux, the state is held in a **store**. This is an object much alike the state defined in the React application;

- the store is created through the `createStore()` function:

  ```JS
  // import the createStore() function
  import { createStore } from 'redux';

  // create the store
  // ! a reducer function is required
  const store = createStore(reducer);
  ```

- `createStore()` takes as a parameter a **reducer**. This is a function which describes the state and possible **actions**, influencing the state itself. In its simplest form, it takes as argument the state and returns the same object, without specifying additional details. In the project at hand, this functionality is implemented by initializing the state to an initial value.

  ```JS
  // set the initial state
  const initialState = {
  hashtags: [
    '100daysofcode',
    'js',
    'react',
    'styled-components',
    'redux'
  ]
  };

  // define the reducer as a function simply returning the state, set as per the initialState object
  const reducer = ((state = initialState) => state);
  ```

Again, it is important to stress how this sequence does **not** include core functionalities behind React, such as **action**s and **action creator**s.

As the application does not, currently, modify the state, the only purpose it is offering is providing a central location for the array of strings. Modify the initial object to have it cascade to the entire application.

### React Redux

Once the store is set up, it is necessary to include the data detailed in the state, where needed in the React application. This functionality is allowed by the `react-redux` dependency.

Once `react-redux` is installed and saved as a developer dependency, it is possible to _inject_ the store's data as follows:

1. wrap the components benefiting from the store's logic in a **Provider**.

   ```JS
   import { Provider } from 'react-redux'

   ReactDOM.render(
   <Provider}>
     <App />
   </Provider>, document.getElementById('root'));
   ```

1. detail the data through the `store` attribute. Just remember to import/ have the store in the same file.

   ```JS
   import { Provider } from 'react-redux'
   import store from './redux/Store';

   ReactDOM.render(
   <Provider store={store}>
     <App />
   </Provider>, document.getElementById('root'));
   ```

1. where needed, in this instance in `App.js`, include the data by means of the `connect()` function.

   This function accepts as argument two methods, named by convention `mapStateToProps` and `mapDispatchToProps. It is then immediately executed on the component requiring the stored data.

   ```JS
   import { connect } from 'react-redux';

   export default connect(mapStateToProps)(App);
   ```

   _Small note_: in the project at hand, as there are no **dispatch** methods (functions modifying the state) to be mapped, only the state is considered.

1. define the function(s) binding the state contents to `props`.

   As hinted earlier, the array of strings found in the state is here included through the `mapStateToProps()` function. This one accepts as argument the state and returns the properties of the state which need to be incorporated in the project.

   ```JS
   const mapStateToProps = state => ({
     hashtags: state.hashtags
   });
   ```

1. access the store's values simply by leveraging the the `props` object. Object which provides the state in the fields as specified through the `mapStateToProps()` function.

   ```JS
   <AppSupport hashtags={this.props.hashtags} />
   ```

And that concludes the simply contribution made by Redux in the project.

## Codepen

A couple of note on publishing the React project on the platform:

- if you get an error message in the form of `ReactDom` is not defined, check if Babel is enabled. If the error persist you may want to try a different version of the React and ReactDOM dependencies;

- functions are imported from the dependencies as follows:

  ```JS
  const { createStore } = Redux;
  const { Provider, connect } = ReactRedux;
  const Component = React.Component;
  const { default : styled } = styled;
  const { render } = ReactDOM;
  ```
