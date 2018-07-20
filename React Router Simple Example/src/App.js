import React, { Component } from 'react';
import './App.css';
// import the used components
import Navbar from './Navbar';
import Home from './Home';
import Park from './Park';
import Beach from './Beach';
// import the route element
import { Route } from 'react-router-dom';

// in the single component, render a navigation bar and depending on the URL render different components
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Which Way?</h1>
        {/* render a navigation bar for the elments specified in the navlinks attributes */}
        <Navbar navlinks={["home", "park", "beach"]}/>

        {/* 
        depending on the different paths, render different components
        by default, the app shows the header and navbar exclusively 
        */}
        <Route path="/home" component={Home}/>
        <Route path="/park" component={Park}/>
        <Route path="/beach" component={Beach}/>
              
      </div>
    );
  }
}

export default App;
