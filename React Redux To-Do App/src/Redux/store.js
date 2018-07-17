// import create store to create the store, literally
import { createStore } from 'redux';
// import the action types 
import { ADD_TODO, REMOVE_TODO } from './actionTypes';

// set the initial state to be an empty array
const initialState = {
  todo: []
}

// create a reducer which handles two different actions, following the defined action.type(s)
const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO:
      // for ADD_TODO, append the item found in action.todoItem to a shallow copy of the state's array
      return Object.assign({}, state, {
        todo: [...state.todo, action.todoItem]
      });

    case REMOVE_TODO:
      // for REMOVE_TODO, cut out the item in the array found in the position described by the index
      // as the index is retrieved from a data attribute, it is passed as a string
      // coerce it into a number
      let index = +action.index; 
      let todo = [...state.todo]
      return Object.assign({}, state, {
        todo: todo.slice(0, index).concat(todo.slice(index+1))
      });
    default:
      return state;
  }
};

// create a store for the defined reducer
const store = createStore(todoReducer);

export default store;