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

## Code Structure

In the challenges @freecodecamp, the syntax behind Redux and React was included in the same file. Given the structure of the development environment set up by `create-react-app`, and a bit of research on Redux docs, it is however advisable to separate the logic of the different libraries. It is also helpful to separate the different components of the Redux library: the store, the action types, the action creators, among many. 

## Redux code

While I still need to lean about the ideal structure, in the project I decided to separate exactly the specified sub-components, in a `Redux` folder. 

- in `store.js`, the store for the application is created on the basis of a reducer and initial state;

- in `actionTypes.js`, the action types of the store are simply defined and exported as `const` values;

- in `actionCreators.js`, the functions returning the different actions are defined. These define the two actions which can be dispatched to the store as to update the state. The store needs in exchange to account for such actions.

A bit of discussion is perhaps warranted on each file, especially as this is just the first actual project which incorporates redux.

**actionTypes.js**

Starting with perhaps the most straightforward and easiest-to-grasp file, in `actionTypes.js` the types of the different actions are defined and exported, as previously mentioned.

```JS
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
```

Separating these `const` values in a specific file allows to later include the types in the files which require them (store and actionCreators for starters).

**actionCreators.js**

In `actionCreators.js`, the functions returning the possible actions are defined and exported.

They are exported to be later included in the React components which require them (more on that later). They are defined as simple arrow functions returning an object.

An object returning a mandatory `type` and including each a value which is used to complete the action.

For the `ADD_TODO` action, a `todoItem` is also included to specify the string which will be pushed to the store.

For the `REMOVE_TODO` action, an `index` is passed as argument as to provide the index of the element to be removed.

_Small Note_:

With ES6 syntax, it is possible to include a property bearing the value of the argument without assigning it any value.

Simply put, instead of this:

```JS
const addTodoAction = (todoItem) => {
  return {
    type: ADD_TODO,
    todoItem: todoItem
  };
};
```

You can write more concisely as follows:

```JS
const addTodoAction = (todoItem) => {
  return {
    type: ADD_TODO,
    todoItem
  };
};
```

You just need to include a property name matching that of the argument (in the example `todoItem`).

**store.js**

`store.js` is where a reducer defines and manages how the state is initialized and later managed. 

A reducer is simply a function which takes as argument the state and an action which is dispatched to the store. It returns then a copy of the state, and possibly updates the same state on the basis of the `action.type` value.

For the  project at hand, the defined action types of `ADD_TODO` and `REMOVE_TODO` trigger updates on the defined state. 

State is initially set to be an object with a single array. For the simple use case, the state could be just an array, but I have chosen an object as it is more capable of handling potential future updates to the store. Also a good excuse to practice with `Object.assign()`, which is quite new to me.

```JS
const initialState = {
  todo: []
}
```

Based on the state, the action types add and remove items through the spread operator and functions of `slice()` and `concat()`.

A few notes on how the functionality is achieved:

- `Object.assign()` accepts as argument a target object and one or more source objects. It returns the target object augmented by the properties of the source objects. This means that missing properties will be added, while existing properties will be updated with the source values.

- the `...spread` operator allows to return a shallow copy (one level deep) of an array. It allows to easily copy the contents of an array, while at the same time include a few new ones.

Given all this reasoning, `store.js` defines the initial state, defines the reducer and then creates the store, through the `createStore()` function. This function simply takes as argument the reducer function just discussed.

```JS
const store = createStore(todoReducer);
```

The store is finally exported, for those React components which need to include the state it holds and manages.

## React Code

Once the store is set up, it is necessary to couple the redux logic with the react component logic. It is theoretically possible to `dispatch` actions to the store manually, but the application needs to automatically update the store as new items are added and removed.

**index.js**

In the main file, which renders the single `App` component in the HTML document, the redux logic can be included through a `<Provider>` component. This wraps the component which requires the state defined through Redux and takes as attribute the `store` Redux defines.

```JS
<Provider store={store}>
    <App />
</Provider>
```

**App.js**

Where the state is actually needed (and for the project at hand this means solely in `App.js`), the action creators are imported alongside a `connect` function. This function allows to couple the stateful component with the action creators. It allows to include in `props` the  state and dispatching actions, to include and update the state found in the store.

`connect` takes as argument two functions which are used to inject the state and the action creators in the `props` of the component. These are usually labeled `mapStateToProps()` and `mapDispatchToProps()`, but more on that later.

After taking these arguments, the same function can be immediately run on the component, which is then rendered with the now incorporated redux logic.

```JS
App = connect(mapStateToProps, mapDispatchToProps)(App);
```

Logic in terms of state and action creators, each accessible through `props` in the manner specified by the two functions.

_mapStateToProps()_

The first function takes as argument `state` and returns in an object the state required by the component. In this instance, it returns the array found under `state.todo`

```JS
const mapStateToProps = (state) => {
  return {todo: state.todo}
};
```

With this function, the state is then accessible all throughout the component, in `props.todo`.

_mapDispatchToProps()_

The second function takes as argument `dispatch` and returns in an object two functions, each enacting an action creator. These functions potentially take an argument (if the action creators require one) and 'dispatch' the action creator by passing it in a `dispatch()` function.

```JS
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todoItem) => {
      dispatch(addTodoAction(todoItem))
    },
    removeTodo: (index) => {
      dispatch(removeTodoAction(index))
    }
  }
};
```

Once set up, the action creators are then accessible all throughout the component, in `props.addTodo()` and `props.removeTodo()` respectively. 

In the logic of the component, it is indeed possible to see how both state and the action creators are thusly included.

- the `handleSubmit()` method dispatches the adding action creator with the value retrieved from the input element

  ```JS
  handleSubmit(e) {
    e.preventDefault();
    let form = e.target;
    let input = form.querySelector("input");
    let inputValue = input.value;
    

    if(inputValue !== "") {
      this.props.addTodo(inputValue);
      input.value = "";
    }
  }
  ```

- the `handleClick()` method dispatches the removing action creator, passing the value which identifies the index of the clicked item

  ```JS
  handleClick(e) {
    let indexOfClicked = e.target.getAttribute("data-key");
    this.props.removeTodo(indexOfClicked);
  }
  ```

- the child component `OutputArea` receives the array from the state, to be mapped and displayed

  ```JS
  <OutputArea todo={this.props.todo} handleClick={this.handleClick} />
  ```

And that concludes the first stunt with the Redux library. Complex, hard to set up, but understandable in each small, incremental step.

Definitely much more useful for lager applications. Applications which to more than adding a list of items to an unordered list.


# Animation

With React and Redux, the application does work, but lacks a certain je-ne-sais-quoi in that the list items are added and removed without pause, without transition.

Luckily, the React community has a helpful library to include such transition, in [React Transition Group](https://reactcommunity.org/react-transition-group/). The library itself warrants a more careful read, but for the sake of the project, it allows to include an animation thanks to two components:

- TransitionGroup

- CSSTransition