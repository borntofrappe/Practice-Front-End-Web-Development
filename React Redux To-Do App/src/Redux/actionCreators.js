// import the action types 
import { ADD_TODO, REMOVE_TODO } from './actionTypes';

// export the action creators for the different action types
// ADD_TODO includes a todoItem, which is set to be included in the array found in the store
export const addTodoAction = (todoItem) => {
  return {
    type: ADD_TODO,
    todoItem
  };
};
// REMOVE_TODO includes an index, which allows to remove the clicked item from the array found in the store
export const removeTodoAction = (index) => {
  return {
    type: REMOVE_TODO,
    index
  };
};