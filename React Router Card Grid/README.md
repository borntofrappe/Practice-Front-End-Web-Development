The project is currently being built locally, through the `create-react-app` utility. Link to a live pen soon to follow.

<!-- Link to the work-in-progress pen right [here](). -->

# Preface

The purpose of this project is the creation of a simple application to view trading cards from the first set of pokemon cards, released in 1999.

This to practice, among many topics and in no particular order, with:

- **React Router**;

- requesting data from a public **API**;

- **CSS grid**.

The overall project was inspired by [WesBos](https://twitter.com/wesbos?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) [course on Redux](https://www.youtube.com/playlist?list=PLu8EoSxDXHP5uyzEWxdlr9WQTJJIzr6jy), in which he works on a two-page application. A two-page application with a grid of photos in one page and single photo alongside a few details in another page. In the project, he uses exactly React Router, which spurred me to create something similar leveraging the same library.


# [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

For the design of the grid, I tried to create a simple layout for a deck of cards rotated now to the right, now to the left. This as to give the impression of a scattered set of cards, thrown without much care on an hypothetical table.

To achieve this effect, I simply included a different `rotate` value for the `transform` property, affecting multiple selections through the `nth-of-type()` pseudo-selector. This allowed me to style all cards in one way, every other item in another, every third in yet another fashion and so on. As the declarations follow one another from the smallest to the biggest `nth` value, there is no risk of having the smallest value override all bigger selections. The later the `transform` property is defined, the higher the priority in the stylesheet.

The grid itself is built with just a couple of grid-related properties. Each nested element spans `240px` in width and `320px` in height, absolute measures specified for the columns, as many as can possibly fit in the screen's width, and for the rows, leveraging the implicit grid:

```CSS
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 240px);
  grid-auto-rows: 320px;
  grid-gap: 40px;
}
```

A considerable gap is also included to avoid the occasional overlap between items with opposing rotation.

# [React Components](https://reactjs.org/docs/thinking-in-react.html)

The application is built with the following components:

- `index.js` renders the entire application, through the `App.js` component;

- `App.js` nests the only, for now, component in `Main.js`;

- `Main.js` houses the components rendered on the page. The components are rendered differently depending on the logic behind React Router. Once the library is included that is.

- `Header.js` displays header elements. It displays a title and a subtitle, if the parent component passes matching attributes that is. The whole thing is rather neat, so it warrants a separate mention. 
  
  In the parent component, properties for `title` and `substitles` are included in the `Header` component.

  ```JS
  <Header title="pokémon cards" subtitle="back in 1999" />
  ```

  In `Header`, `<h1>` and `<h3>` elements are included with the values of the mentioned properties. Through conditional logic, they are rendered solely if the attributes do exist.

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

- `CardGrid.js` displays a grid of cards. It is shown by default and showcases cards from the Pokemon Trading Card Game API (once the API call is carried out). Upon clicking on each card, it is supplemented by `CardSingle.js` (once the React Router library is included).

- `CardSingle.js` displays a single card, the one clicked/tapped in the previous screen (again, once the API is included). This while providing: 

  1. a way back to `CardGrid.js`;
  1. arbitrary information retrieved from the API, alongside the no-longer-rotated image of the card.


# Data from [Pokemon TCG Developers](https://docs.pokemontcg.io/#documentationgetting_started)

There exist a [public API](https://docs.pokemontcg.io/) whic allows to retrieve information pertaining pokemon cards, from the trading card game. For the project at hand, particular requests are included to retrieve the required information, but prior to discussing the appropriate end-points, a section on how the data is retrieved and included in the project is helpful.

## Fetch

In order to display HTML elements on the basis of data retrieved from the public API, it is necessary to include _asynchronous_ logic. This practically means that the application needs to populate document once the information is actually retrieved. Without this logic React would render inexact components, for instance rendering an empty `<div>` without incluing any nested element.

With JavaScript, it is possible to implement _asynchronous_ logic through the [**fetch API**](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch). Detailed research on the API is warranted, but for the project at hand, the following notes will suffice:

- the fetch API allows to include processes which are carried out in sequence, one after the other and only when a process is completed. If you were to include a timeout, to provide a contrived example, the process which follows will run only after the preceding timeout completes its logic;

- one way to use the fetch API is by passing a URL to the `fetch()` method; once a URL pointing toward a JSON object is passed as argument, the method returns an object;

- once a return value is obtained from the `fetch()` method, it is possible to _chain_ several operations. By including the `then()` method, each operation follows with the aforementioned sequential pattern. 

- each `then()` method passes as argument the return value of the method on which it is applied. After applying some logic, it allows to return a new value, which can be included on yet another `then()` method or simply update existing variables/logic.

The example created for the project might help clear any confusion around this prolonged list on notes:

```JS
// create a variable for the URL and a variable in which to include data from the API call
const URL = "https://api.pokemontcg.io/v1/cards?setCode=base1";

let imgURL = [];

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
  let cards = json.cards;
  cards.forEach(card => jsonURL.push(card.imageUrl));
  })
  // update the state of the application with the retrieved data
  // this point is better discussed in the following section
  .then(() => {
  this.setState({
    imgURL: imgURL
  });
});
```

## `componetDidMount()`

Through the discussed _fetch API_, it is possible to include data in the application. In React, as to include the now obtained data in the DOM, it is possible to use the lifecycle method `componetDidMount()` in conjunction with the method `this.setState()`.

`componetDidMount()` runs once the component is mounted, included on the page. It allows to include the data from the API call in an existing structure.

`this.setState()` updates the state and most importantly, it triggers a re-render of the affected components. 

Once the fetch API has retrieved the data and said data is included in the state, React updates the existing component with the information which now is available.

```JS
// inside of the component
componentDidMount() {
  // fetch API
}
```

## API Call

**CardGrid** 

Starting with the grid of cards, a request to all cards from the first set (dated 1999) allows to retrieve the URL of the images which are showcased in each grid item. This through the following endpoint:

```code
https://api.pokemontcg.io/v1/cards?setCode=base1
```

A call to such endpoint returns a rather sizable object. In this object there exist a `cards` array. In such array, and for every card found in the API call, there exist a property of `imageUrl` nesting the exact URL which can be included in the grid items, to display the different images.

**CardSingle**

For the single-card-view, another request can be made to a more specific endpoint, in the following URL:

```code
https://api.pokemontcg.io/v1/cards/base1-45
```

Most importantly, beside the standard `https://api.pokemontcg.io/v1/cards/` preface, different cards are included according to the different path included afterwards. This path matches exactly with the card's `id`, which is also returned, for all cards, in the more general endpoint.

This allows to connect one endpoint to the other. The logic is as follows:

- alongside the `imageUrl` value, include in each grid item information related to the `id` value. This can also come in handy as to include the unique `key` for each item.

- when the visitor interacts with the different grid items, perform an API all to `https://api.pokemontcg.io/v1/cards/` + `id`.

That being said, for the `CardSingle` component the following details are retrieved from the API call:

- `card.name` (string)
- `card.nationalPokedexNumber` (number)
- `card.imageUrl` (string)
- `card.types`, which is actually an array of types (array of strings)
- `card.attacks`, which is an array nesting an object for each attack, with a helpful property of `name` (array of objects, objects with several key-value pairs).


# [React Router](https://reacttraining.com/react-router/web/guides/philosophy)

