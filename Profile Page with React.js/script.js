// target the HTML element in which to include the components
const targetNode = document.querySelector("#app");

// the page is divided into three sections, nested in a parent component
// additional components are manufactured for the bite-size components of each section

// define stateless functional components for the SVG graphics used in the project
const ExploreProfilesGraphic = () => <svg className="svg--eye" width="40" height="40" viewBox="0 0 40 40">
          <circle cx="50%" cy="50%" r="50%" />
          <ellipse cx="50%" cy="50%" ry="20%" rx="30%"/>
          <circle cx="50%" cy="50%" r="15%" />
        </svg>;

const ModifyProfileGraphic = () => <svg className="svg--plus" width="40" height="40" viewBox="0 0 40 40">
          <path d="M 0 20 h 40 Z"/>
          <path d="M 20 0 v 40 Z"/>
        </svg>;

const ProductIconGraphic = () => <svg className="svg--icon" width="40" height="40" viewBox="0 0 40 40">
          <circle cx="50%" cy="50%" r="50%" />
          <ellipse cx="50%" cy="50%" ry="20%" rx="30%"/>
          <ellipse cx="50%" cy="50%" ry="30%" rx="20%"/>
        </svg>;

const PlaceholderImageGraphic = () => <svg className="svg--placeholder--img" width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50%" cy="60%" r="30%" />
          <circle cx="30%" cy="35%" r="18%" />
          <circle cx="70%" cy="35%" r="18%" />
        </svg>;


// the navigation bar includes two graphics nested in anchor link elements
const NavigationBar = () => {
  return(
    <nav className="navigation-bar">
      <a href="#" title="Explore Profiles">
        <ExploreProfilesGraphic />
      </a>
      <a href="#" title="Modify Profile">
        <ModifyProfileGraphic />
      </a>
    </nav>
  );
};

// define two components to make up the main, central, content section
// pass props as arguments as to access the properties passed from the parent component
const ContentProfile = (props) => {
  return (
    <div className="content-profile">
      <PlaceholderImageGraphic />
      <h3>{props.name}</h3>
      <p>{props.bio}</p>
    </div>
  );
};

const ContentAbout = (props) => {
  return (
    <div className="content-about">
      <h2>About</h2>
      <p>{props.about}</p>
    </div>
  );
};


// content section, made up of two components for the profile (image, name and short bio) and an about section (about, filler text)
const ContentSection = (props) => {
  return(
    <div className="content">
      <ContentProfile name = {props.name} bio = {props.bio} />
      <ContentAbout about = {props.about} />
    </div>
  );
};


// footer with filler information and the remaining graphic nested in an anchor link element
const Footer = () => {
  return(
    <footer className="footer">
      <p>2018/22/4</p>
      <ProductIconGraphic />
      <a href="#">
        <p>contact</p>
      </a>
    </footer>
  );
};


// in the main, parent component include in the state few keys for some of the text included in the page; pass the state as property for other components to use
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Vyro Uxta',
      bio: 'Playing random video games',
      about: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor nostrum facilis modi similique quos neque, suscipit nobis maiores placeat? Iure voluptates quos praesentium numquam totam nesciunt dolor! Quos, natus commodi. Fuga dolores dolore asperiores sit ab, illum dolor, fugiat nulla quia aliquam libero consectetur iste eligendi incidunt possimus neque placeat!'
    }
  }
  render(){
    return(
      <div className="app__container">
        <NavigationBar />
        <ContentSection name= {this.state.name} bio = {this.state.bio} about = {this.state.about}/>
        <Footer />
      </div>
    );
  }
};

// render the main parent component in the sigle div present in the markup document
ReactDOM.render(<AppContainer />, targetNode);
