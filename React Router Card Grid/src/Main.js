import React, { Component } from 'react';
import './Main.css';
import Header from './Header';
import CardGrid from './CardGrid';
// import CardSingle from './CardSingle';

/*
in the main component render: 
- by default, components responsible for the header and grid of cards
- on click, components responsible for an updated header and a single card
*/ 

const URL = "https://api.pokemontcg.io/v1/cards?setCode=base1";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgURL: []
    }
  }

  componentDidMount() {
    let jsonURL = [];

    var myRequest = new Request(URL);

    fetch(myRequest).then((response) => {
      return response.json();
    }).then((json) => {
      let cards = json.cards;
      cards.forEach(card => jsonURL.push(card.imageUrl));
    }).then(() => {
      this.setState({
        imgURL: jsonURL
      });
    });

    
  }

  render() {
    return (
      <div className="Main">
        {/*
        the header component displays h1 and h2 elements based on the attributes included
        the grid component displays div cards with CSS grid, below the headers
        the single component displays a single div card with additional information, based no the attributes included
        
        possible combinations allowed by react router: 

        DEFAULT
        <Header title="pokémon cards" subtitle="back from 1999"/>
        <CardGrid cards={[1,2,3,4,5,6,7,8,9,10,11,12]} />

        DETAILS
        <Header title="pokémon details" />
        <CardSingle name="charmander" details={["Number: 7","Type: Fire", "Attack: Ember", "Attack: Growl"]}/>
        */}

        <Header title="pokémon cards" subtitle="back from 1999"/>
        <CardGrid cards={this.state.imgURL}/>
      </div>
    );
  }
}

export default Main;
