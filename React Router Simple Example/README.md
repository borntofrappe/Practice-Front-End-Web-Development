Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/mjREXy/).

# React Router

## Include Library

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

And that's wraps up one of the simplest examples of routing. The project includes on top of this structure simply a bit of styling. 

