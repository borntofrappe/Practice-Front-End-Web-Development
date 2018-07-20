/*
TODO: revise project and document better the codebase

it works though!
*/

The project is currently being built locally, through the `create-react-app` utility. Link to a live pen soon to follow.

<!-- Link to the work-in-progress pen right [here](). -->

# Preface

The purpose of this project is the creation of a single page application to view trading cards from the first set of pokemon cards, released in 1999.

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

A considerable gap is also included to avoid the occasional overlap between items with opposing rotation. You can see the layout in this [example pen](https://codepen.io/borntofrappe/full/VBPKQm).

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

For React Router, you can sample [this live pen](https://codepen.io/borntofrappe/full/mjREXy). It showcases the simple Routing features which are included in this larger project. In the connected documentation on Github, I already discussed Routing, so I'll just pase in here the notes and lessons learned while building the small example.

In order to use the React library it is first necessary to install the dependency:

```code
npm install react-router-dom
```

Or through `yarn`

```code
yarn add react-router-dom
```

## Routing Basics

In one of its simplest form, a _Router_ allows to redirect the application toward different _url_, toward different paths. Such as `www.someurl.com` and `www.someurl.com/somepath`.

To achieve this feat, the following process is put into place.

1. wrap the main component in between a `<Router>` element. 

    Instead of rendering a single component for instance:

    ```JS
    ReactDOM.render(<App />, document.getElementById('root'));
    ```

    Render the `<Router>` element, nesting the single component

    ```JS
    ReactDOM.render(
        <Router>
            <App/>
        </Router>, document.getElementById('root'));
    ```

    **Important note**

    Here `App` is wrapped around `Router`, but the library, in its latest version, provides two different routing elements in `BrowserRouter` and `NativeRouter`, presumably for React and React native respectively. If you are a fan of brevity, it is possible to rename the package as you import it. Because you do need to import it in your development environment.

    ```JS
    import { BrowserRouter as Router } from 'react-router-dom';
    ```

1. From the component in which you wish to prompt the routing, include a '<Link>' element. 

    The mentioned element functions much alike an anchor link, and as a matter of fact it is rendered as an '<a>' element in the HTML. Here include the 'to' attribute which redirects toward the desired path.

    For instance, when including a navigation bar, you might be used to include anchor link elements redirecting elsewhere on the same page. In React, one way to render such a navigation bar can be acheived as follows:

    '''JS
    class App extends Component {
    render() {
        return (
        <div className="App">
            {/* render one anchor link element for each specified text */}
            <Navbar navlinks={["welcome", "projects", "social"]}/>
        </div>
        );
    }
    }

    const Navbar = (props) => {
        return(
            <nav>
            {/* loop through the array to render an anchor link element for each item */}
            {
                props.navlinks.map((navlink, index) => <a href="#" key={index}>{navlink}</a>)
            }
            </nav>
        );    
    }
    '''

    The '<Link>' element can be included instead of the '<a>' element with minor modifications.

    '''JS
    const Navbar = (props) => {
        return(
            <nav>
            {/* loop through the array to render a link element for each item */}
            {
                props.navlinks.map((navlink, index) => <Link to={navlink} key={index}>{navlink}</Link>)
            }
            </nav>
        );    
    }
    '''

    It is just a matter of including the appropriate attribute(s). Just remember to import the element from the library:

    '''JS
    import { Link } from 'react-router-dom'
    '''

1. With the '<Link>' elements set up, specify the actual components which are to be rendered in the different paths, with '<Route>' elements. 

  Through '<Route>' elements you detail 1) the path under which the Route is rendered and 1) the component to be rendered if the path is met.

  For the project at hand for instance:

  '''JS
  <Route path="/welcome" component={Welcome}/>
  <Route path="/projects" component={Projects}/>
  <Route path="/social" component={Social}/>
  '''

  Just remember to import both the <Route> element from the 'react-router-dom' library and the different components to be rendered in the different paths.

  '''JS
  import Welcome from './Welcome';
  import Projects from './Projects';
  import Social from './Social';

  import { Route } from 'react-router-dom'
  '''
