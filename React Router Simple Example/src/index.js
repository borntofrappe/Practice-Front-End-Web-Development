import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

// render the single component responsible for the application in between a Router element
ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));
    
registerServiceWorker();
