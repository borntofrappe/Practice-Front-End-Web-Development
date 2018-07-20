import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import MainSingle from './MainSingle';
import { Route, Switch } from 'react-router-dom';

// in the app stateful component, render in a switch element two possible routes
// using the flag of `exact` for the root path allows to display the connected component exclusively when the page is in the root path
// otherwise the component would be included alongside the new one
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      id: "",
      card: {}
    }
    this.handleClick = this.handleClick.bind(this);
    this.removeId = this.removeId.bind(this);
  }

  handleClick(e) {
    let id = e.target.getAttribute("data-key");
    console.log(id);
    this.setState({
      id: id
    });
  }
  removeId() {
    this.setState({
      id: ""
    });
  }

  // in componentDidMount retrieve data from the API and trigger a re-rendering of the component
  componentDidMount() {
      // create a variable for the URL and variables in which to include data from the API call
      const URL = "https://api.pokemontcg.io/v1/cards?setCode=base1";
      let cards = [];

      // create a request for the prescribed URL
      let request = new Request(URL);

      // fetch the return value from the request
      // return value: the data
      fetch(request)
        // format the data to work with a JSON object
        // argument: data
        // return value: json object
        .then((response) => {
          return response.json();
        })
        // retrieve from the JSON object the information required for the project; for now solely the URL of the images found in the cards array
        // argument: json object
        // logic: loop through the cards array and push each imageURL property in the variable created for the data 
        .then((json) => {
          cards = [...json.cards];

        })
        // update the state of the application with the retrieved data
        // this point is better discussed in the following section
        .then(() => {
        this.setState({
          cards: cards
        });
      });    
  }

  componentDidUpdate() {
    if(this.state.id) {
      // create a variable for the URL and variables in which to include data from the API call
      const URL = "https://api.pokemontcg.io/v1/cards/" + this.state.id;

      let card = {};
      // create a request for the prescribed URL
      let request = new Request(URL);

      // fetch the return value from the request
      // return value: the data
      fetch(request)
      // format the data to work with a JSON object
      // argument: data
      // return value: json object
      .then((response) => {
        return response.json();
      })
      // retrieve from the JSON object the information required for the project; for now solely the URL of the images found in the cards array
      // argument: json object
      // logic: loop through the cards array and push each imageURL property in the variable created for the data 
      .then((json) => {
        card = Object.assign({}, json.card);
      })
      .then(() => {
        this.setState({
          card: card
        });
      });
    }
  }
  
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Main cards={this.state.cards} handleClick={this.handleClick}/>} />
          <Route path="/details" render={() => <MainSingle card={this.state.card} removeId={this.removeId}/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
