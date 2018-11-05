import { createStore } from 'redux';

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

// create the store on the basis of a simple reducer
// reducer simply returning the state, without every modifying it (for now)
const reducer = ((state = initialState) => state);

const store = createStore(reducer);

export default store;