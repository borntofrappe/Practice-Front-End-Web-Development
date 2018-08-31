import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// render the stateful component responsible for the entire app
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
