import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
// import browserrouter from the routing dependency
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// render the stateful component responsible for the entire app wrappped in a router component
ReactDOM.render(
    <Router>
      <App />
    </Router>, document.getElementById('root'));
registerServiceWorker();
