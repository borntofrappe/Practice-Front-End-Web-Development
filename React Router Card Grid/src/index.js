import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

// render the stateful component responsible for the entire app in the single div found in the HTML document
ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('root'));
registerServiceWorker();
