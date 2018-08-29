import React, { Component } from 'react';
// import './css/App.css';
// import the components to be rendered in the page
import Main from './Main';
import MainSingle from './MainSingle';
// import route and switch from the routing dependency
import { Route, Switch } from 'react-router-dom';

// in the app stateful component, manage the state of the application and render the appropriate components
class App extends Component {
  constructor(props) {
    super(props);
    // for the state, include an array collecting the different cards, as well as an id for the individual card and an object detailing information for specific cards
    this.state = {
      cards: [],
      id: "",
      card: {}
    }
    // bind a method to handle a click on a card in the grid and a click on the back button (to switch between components)
    this.handleClick = this.handleClick.bind(this);
  }

  // on click, update the ID according to its original value
  // if id is an empty string (such is the instance when a click on one of the grid item is regsitered), set the id to the data-key attribute of the pressed grid item
  // else,set it back to an empty string (such is the instance when a click on the "back" button is carried through)
  handleClick(e) {
    if(this.state.id === "") {
      let id = e.target.getAttribute("data-key");
      this.setState({
        id: id
      });
      // call a function which populates the page with information on the specific grid item
      this.populateComponent(id);
    }
    else {
      // reset the value of the ID sting as well as the card object to remove the selected card from the single view
      // otherwise the pre-existing card would lie on the page before being substituted by the new card
      this.setState({
        id: "",
        card: {}
      });
    }
  }

  // in componentDidMount retrieve data from the API and trigger a re-rendering of the component
  // populate the page with the grid of cards
  componentDidMount() {
      // create a variable for the URL and variables in which to include data from the API call
      // the following URL refers to all cards from the base1 set
      const URLGrid = "https://api.pokemontcg.io/v1/cards?setCode=base1";
      // create an array in which to store the different cards
      let cards = [];

      // fetch information from the URLGrid
      // return value: the data
      fetch(URLGrid)
        // format the data to work with a JSON object
        // input: data from the request
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
        // the cards property of the state now holds an array of URL images
        .then(() => {
        this.setState({
          cards: cards
        });
      });
  }

  // with the populateComponent function, retrieve information for the specific card, and add its information to the state
  // the re-rendering triggered will be highlighted in the single view component
  populateComponent(URLPath) {
    // create a variable for the URL, this is tailored according to the ID property (updated on click), passed as argument of the function
    const URLCard = `https://api.pokemontcg.io/v1/cards/${URLPath}`;

    // create an object in which to include data from the API call
    let card = {};

    // fetch the information from the URLCard
    // return value: the data
    fetch(URLCard)
    // format the data to work with a JSON object
    // argument: data from the request
    // return value: json object
    .then((response) => {
      return response.json();
    })
    // retrieve from the JSON object the information required for the project
    // argument: json object
    // logic: copy the object found under json.card, which details the properties of the specific card, in the created variable
    .then((json) => {
      card = Object.assign({}, json.card);
      console.log(card);
    })
    // update the state of the application with the retrieved data
    // the card property of the state now holds an object with information on the specific card
    .then(() => {
      this.setState({
        card: card
      });
    });
  }

  // in App.js, render a Switch element which details the components in different routes
  // in each Route element, include a **path** property detailing the precise path of the application
  render() {
    return (
      <div className="App">
        <Switch>
          {/* the flag of `exact` is used the root path to display the connected component exclusively when the page is in the root path
          without it, App.js would render the selected component in any path */}
          {/* render is a property which allows the rendering of selected components
          in the instance of the particular project, in refers to the Main or Main single components (one referring to the grid of cards, the other to the view of the specific card)
          include through properties the required information:
          - the cards array and the handleclick method for the grid card
          - the card object and the handleClick method for the single view
          */}
          <Route exact path="/" render={() => <Main cards={this.state.cards} handleClick={this.handleClick}/>} />
          <Route path="/details" render={() => <MainSingle card={this.state.card} handleClick={this.handleClick}/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
