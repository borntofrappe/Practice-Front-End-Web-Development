// import the createStore() function
import { createStore } from 'redux';

// import the data found in the same folder
import data from './data.js';

// set the initial state
const initialState = {
  data: data
}


// create the store, currently simply returning the initial state
const reducer = (state = initialState) => state;
const store = createStore(reducer);

// export the store
export default store;