import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import the element wrapping the main component to include the routing logic
import { BrowserRouter as Router } from 'react-router-dom';

// render the single component responsible for the navigation bar, wrapped in the router element
ReactDOM.render(
  <Router>
    <App />
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
