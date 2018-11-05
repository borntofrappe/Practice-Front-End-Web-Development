import React, { Component } from 'react';
import './css/App.css';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SVGTheme from './SVGTheme';
import AppMain from './AppMain';
import AppSupport from './AppSupport';

/* styled component: theme button
- absolute position the button in the top left corner
- add transition for the changes on hover and when active
- on smaller viewports scale down the button
*/
const AppButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: none;
  border: none;
  transition: all 0.2s ease-out;
  transform: rotate(-35deg);
  opacity: 0.7;

  &:hover {
    opacity: 1;
    transform: scale(1.1) rotate(-5deg);
  }
  &:active {
    opacity: 1;
    transform: scale(1.2) rotate(-305deg);
  }

  @media (max-width: 600px) {
    width: 48px;
    height: 48px;
  }
`;

/* in the stateful component
- manage the state of the application
this concerning the state not considered by redux
(redux is responsible solely for the array of strings for the hashtags)
- render the necessary elements
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDark: true,
      theme: [
        {
          name: 'dark',
          bgStart: '#4d1894',
          bgEnd: '#21046c',
        },
        {
          name: 'light',
          bgStart: '#71a0f6',
          bgEnd: '#5181db',
        }
      ],
      // hashtags: [
      //   '100daysofcode',
      //   'js',
      //   'react',
      //   'styledComponents',
      //   'redux'
      // ],
      value: ''
    };
    this.handleTheme = this.handleTheme.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleHashtag = this.handleHashtag.bind(this);
  }


  // function which toggles between light and dark theme
  handleTheme() {
    // retrieve the boolean value and store a reference to its alternate value
    const isDark = !this.state.isDark;

    // update the state, changing the SVG icon displayed on screen
    this.setState({
      isDark: isDark
    });

    // update the custom CSS properties modifying the colors of the app
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--color-bg-start', this.state.theme[0].bgStart);
      root.style.setProperty('--color-bg-end', this.state.theme[0].bgEnd);
    }
    else {
      root.style.setProperty('--color-bg-start', this.state.theme[1].bgStart);
      root.style.setProperty('--color-bg-end', this.state.theme[1].bgEnd);
    }
  }

  // function which keeps track of the textarea value
  handleChange(e) {
    // update the value with the input received through the onChange listener
    const value = e.target.value;
    this.setState({
      value: value
    });
  }

  // function which allows to share the value of the textaera on twitter
  handleShare() {
    // consider the value of the textarea element
    let value = this.state.value;
    if (value) {
      // build the tweet through regular expressions and open a new window with the tweet

      /* define regular expressions to
      1. find the hashtags
      1. find the url
      1. find the whitespace, at the beginning, end and otherwise in the middle of the string
      */
      const regex = {
        hashtags: /#\S+/g,
        url: /http[s]?.+/g,
        whitespace: /\s/g,
        initialWhitespace: /^\s+/,
        finalWhitespace: /\s+$/
      };

      // retrieve the values for the hashtags and url parameters
      // ! remember that .match() returns an array of results, if existing
      const hashtags = value.match(regex.hashtags);
      const url = value.match(regex.url);

      // format the text by removing the hashtags, the url, the whitespace at either end
      value = value
        .replace(regex.hashtags, '')
        .replace(regex.url, '')
        .replace(regex.initialWhitespace, '')
        .replace(regex.finalWhitespace, '')
        // format the remaining whitespace to include the escape sequence for whitespace
        .replace(regex.whitespace, '%20');

      // create the URL making up the tweet detailing the text
      let tweet = `https://twitter.com/intent/tweet?text=${value}`;
      // add the hashtags/ url if present
      // ! .match() returns an array
      if (hashtags) {
        // ! the URL demands hashtags as comma-separated values, added to the _hashtags_ parameter
        const hashtagString = hashtags.map(hashtag => hashtag.substring(1)).join(',');
        tweet += `&hashtags=${hashtagString}`;
      }
      if (url) {
        // ! the URL requires the URL to be included through the _url_ parameter
        const urlString = url[0];
        tweet += `&url=${urlString}`;
      }

      window.open(tweet);
    }

  }

  // function which allows to add the text found in the button elements to the textarea value
  handleHashtag(e) {
    // consider the value of the textarea and the text of the pressed button
    const value = this.state.value;
    const hashtag = `#${e.target.textContent}`;

    // create a new value out of the existing value, updated with the button's text and a space if needed
    const newValue = (value[value.length - 1] === " ") ? `${value}${hashtag}` : `${value} ${hashtag}`;
    this.setState({
      value: newValue
    })
  }

  /*
  render:
  - the button responsible for the theme of the application
  - the component nesting the header, textarea and button allowing to share on twitter
  - the component nesting the series of buttons
  */
  render() {
    return (
      <div className="App">
        <AppButton className="AppTheme" onClick={this.handleTheme}>
          {/* the SVG component shows the correct icon depending on the boolean value stored in the state */}
          <SVGTheme isDark={this.state.isDark} />
        </AppButton>

        <AppMain value={this.state.value} handleChange={this.handleChange} handleShare={this.handleShare} />

        {/* include the array of strings as mapped from the redux store */}
        <AppSupport hashtags={this.props.hashtags} handleHashtag={this.handleHashtag} />
      </div>
    );
  }
}

// map the state from the redux object to props
const mapStateToProps = state => ({
  hashtags: state.hashtags
});

// connect the mapping function including the data in the props object
export default connect(mapStateToProps)(App);
