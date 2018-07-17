import { createStore } from 'redux';
// REDUX

const initialState = {
  todo: []
}

const addTodoReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todo: [...state.todo, action.todoItem]
      });

    case 'REMOVE_TODO':
      let todo = [...state.todo];
      return Object.assign({}, state, {
        todo: [...todo].slice(0,action.index).concat([...todo].slice(action.index+1))
      });
    default:
      return state;
  }
};

const store = createStore(addTodoReducer);

export default store;