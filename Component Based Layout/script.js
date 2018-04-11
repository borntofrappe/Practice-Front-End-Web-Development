// target the HTML node in which to include React Components
const appContainer = document.querySelector("#app-container");

// build one component each for the sections of the application, with stateless functional components

// navigation bar with a paragraph and three anchor links
const NavigationBarComponent = () => {
  return(
    <div className="navigationBar">    
      <p>Technology Stack</p>
      <a target="_blank" href="https://reactjs.org/">react</a>
      <a target="_blank" href="https://css-tricks.com/snippets/css/complete-guide-grid/">css grid</a>
      <a target="_blank" href="https://css-tricks.com/almanac/selectors/a/after-and-before/">pseudo-elements</a>
    </div>
  );
};

// main section with two headings and a div used to create a heart icon (from yesterday's project, with pseudo-elements)
const MainContentComponent = () => {
  return(
    <div className="mainContent">
      <h2>react + grid</h2>
      <h2>=</h2>
      <div className="heartIcon"></div>
    </div>
  );
};

// footer with a simple paragraph and a nested anchor link
const FooterComponent = () => {
  return(
    <div className="footer">    
      <p>Built freely by 
        <a target="_blank" href="https://twitter.com/borntofrappe">moi</a>
      </p>
    </div>
  );
};


// create the parent component collecting previous portions into a class component
class ApplicationComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  /* remember to always return an element in the render() method */
  render() {
    return(
      <div className="application">
        <NavigationBarComponent />
        <MainContentComponent />
        <FooterComponent />
      </div>
    );
  }
}


// render parent component in the prescribed node
ReactDOM.render(<ApplicationComponent />, appContainer);
