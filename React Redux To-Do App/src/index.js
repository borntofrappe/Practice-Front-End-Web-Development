import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import the provide, to wrap the parent component with the logic of the redux store
import { Provider } from 'react-redux';
// import the redux store
import store from './Redux/store';

// render the only stateful component in the single div found in the HTML document, wrapped in the redux provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
