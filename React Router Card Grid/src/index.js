import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// render the stateful component responsible for the entire app in the single div found in the HTML document
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
