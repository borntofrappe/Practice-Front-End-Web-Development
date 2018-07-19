The project is currently being built locally, through the `create-react-app` utility. Link to a live pen soon to follow.

<!-- Link to the work-in-progress pen right [here](). -->

# Preface

The purpose of this project is the creation of a simple application to view trading cards from the first set of pokemon cards, released in 1999.

This to practice, among many topics and in no particular order, with:

- **React Router**;

- requesting data from a public **API**;

- **CSS grid**.

The overall project was inspired by [WesBos](https://twitter.com/wesbos?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) [course on Redux](https://www.youtube.com/playlist?list=PLu8EoSxDXHP5uyzEWxdlr9WQTJJIzr6jy), in which he works on a two-page application. A two-page application with a grid of photos in one page and single photo alongside a few details in another page. In the project, he uses exactly React Router.


# [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

For the design of the grid, I tried to create a simple layout for a deck of cards, rotated now to the right, now to the left. This as to give the impression of a scattered set of cards, thrown without much care on an hypothetical table.

To achieve this effect, I simply included a rotation on different cards, affecting multiple selections thanks to the `nth-of-type()` pseudo selector. This allowed me to style all cards in one way, every other item in another, every third in yet another fashion and so on. As the declarations follow one another from the smallest to the biggest `nth` value, there is no risk of having the smallest value override all bigger selections.

The grid itself is built with a very simple layout in mind. Each nested element spans `240px` in width and `320px` in height:

```CSS
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 240px);
  grid-auto-rows: 320px;
  grid-gap: 40px;
}
```

A considerable gap is included to avoid the occasional overlap between items with opposing rotation. You can find the layout, alongside a simple header container.

# [React Components](https://reactjs.org/docs/thinking-in-react.html)

The application is built with the following components in mind:

- `index.js` renders the entire application, through the `App` component;

- `App.js` nests the only, for now, component in `Main`;

- `Main.js` houses the components rendered on the page. The components are rendered differently depending on the logic behind React Router.

- `Header.js` displays header elements. It displays a title and a subtitle element, if the parent component passes matching attributes that is.

  The whole thing is rather neat, so it warrants a separate mention. In the parent component, properties for `title` and `substitles` are included in the `Header` component.

  ```JS
  <Header title="pokémon cards" subtitle="back in 1999" />
  ```

  In `Header`, `<h1>` and `<h3>` elements are included with the values of the mentioned properties. Through conditional logic, they are rendered solely if these attributes exist.

  ```JS
  const Header = (props) => {
    return(
      <div className="Header">
        {
          props.title 
          &&
          <h1>{props.title}</h1>
        }
        {
          props.subtitle 
          &&
          <h3>{props.subtitle}</h3>
        }
      </div>
    );
  }
  ```

  Neat-o.

- `CardGrid.js` displays a grid of cards. It is shown by default and showcases cards from the Pokemon Trading Card Game API. Upon clicking on each card, it is supplemented by `CardSingle.js`.

- `CardSingle.js` displays a single card, the one clicked/tapped in the previous screen. This while providing: 

  1. a way back to `CardGrid.js`;
  1. arbitrary information retrieved from the API, alongside the no-longer-rotated image of the card.


# Data from [Pokemon TCG Developers](https://docs.pokemontcg.io/#documentationgetting_started)

In the referenced page, there exist a public API whic allows to retrieve information pertaining pokemon cards, from the trading card game.

For the project at hand, different requests need to be carried out depending on the page actually being displayed.

## Asynchronous Call

In order to display HTML elements on the basis of data retrieved from the public API, it is necessary to include _asynchronous_ logic. This practically means that the application needs to populate document once the information is actually retrieved. Without this logic React would render inexact components, without including the data which would be retrieved a tad too late.


```JS
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
```

## API Endpoint

Starting with the grid of cards, a request to all cards from the first set (dated 1999) allows to retrieve the URL of the images which are showcased in each grid item.

With the following URL:

```code
https://api.pokemontcg.io/v1/cards?setCode=base1
```

A rather sizable object is obtained. In this object there exist a `cards` array. In such array, and for every card found in the API call, there exist a property of `imageUrl` nesting the exact URL which can be included in the grid items, to display the different images.

# [React Router](https://reacttraining.com/react-router/web/guides/philosophy)

