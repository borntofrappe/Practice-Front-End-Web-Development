import React, { Component } from 'react';
import './App.css';
// import the two components responsible for the application
import QuoteFrame from './QuoteFrame';
import QuoteControls from './QuoteControls';

/*
in the single stateful component, include two components, to render 
1. a frame in which to display a quote, text and author 
1. a container for 'controls', with buttons to get a new quote & sharing the quote on twitter respectively
*/
class App extends Component {
  // in the state include the quote as an object with text and author properties
  // the text and author fields are filled with a call to the quote API
  // bind also the methods for the page's functionalities
  constructor(props) {
    super(props);
    this.state = {
      quote: {
        text: '',
        author: ''
      }
    }
    this.handleShareQuote = this.handleShareQuote.bind(this);
    this.handleNewQuote = this.handleNewQuote.bind(this);
  }

  // define a function to include a new quote
  handleNewQuote() {
    /*
    included to test the function
    */
    // let text = "Life is really simple, but we insist of making it complicated";
    // let author = "Confucius";
    // this.setState({
    //   quote: {
    //     text: text,
    //     author: author
    //   }
    // });
    
    const URL = "https://talaikis.com/api/quotes/random/";

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
      // if the quote in the json object is less than 75 characters long, proceed to update the state with the obtained values
      // else call the function once more to find a new quote (this may cause the application to stall momentarily as it loops through quotes to find one short enough)
      .then((json) => {
        if(json.quote.length>75) {
          this.handleNewQuote();
        }
        else {
          this.setState({
            quote: {
              text: json.quote,
              author: json.author
            }
          });
        }
      });
  }

  // define a function to share the quote on twitter
  handleShareQuote() {
    // retrieve the text and author from state, include them in the tweet to be shared
    let text = this.state.quote.text;
    let author = this.state.quote.author;

    let tweet = `"${text}" - ${author} `;
    
    var url = `https://twitter.com/intent/tweet?hashtags=wisdom&text=${tweet}`;
    window.open(url);

  }

  // in componentDidMount retrieve data from the API to immediately trigger a re-rendering of the component, with the quote
  componentDidMount() {
      this.handleNewQuote();
  }
  
  
  /*
  render the frame and the controls' panel 
  - passing to the frame the information needed to display the quote
  - passing to the controls' panel the methods used to 1) get a new quote and 1) share the quote on twitter
  */
  render() {
    return (
      <div className="App">
        <QuoteFrame quote={this.state.quote}/>
        <QuoteControls handleShareQuote={this.handleShareQuote} handleNewQuote={this.handleNewQuote}/>
      </div>
    );
  }
}

export default App;
