import React, { Component } from 'react';
import './css/App.css';
import SVGTheme from './SVGTheme';
import AppMain from './AppMain';
import AppSupport from './AppSupport';
import styled from 'styled-components';

/* absolute position the button in the top right corner */
const ButtonTheme = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: none;
  border: none;
  overflow: hidden;

  svg {
    opacity: 0.7;
    transition: all 0.2s ease-out;
    transform: rotate(-35deg);
  }
  &:hover svg {
    opacity: 1;
    transform: scale(1.1) rotate(-5deg);
  }
  &:active svg {
    opacity: 1;
    transform: scale(1.2) rotate(-55deg);
  }
`;

// in the stateful component manage the state, for the theme behind the app and the buttons displayed in the supporting section
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
      hashtags: [
        '100daysofcode',
        'react',
        'js',
        'frontend'
      ],
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleTheme = this.handleTheme.bind(this);
  }

  componentDidUpdate() {
    const root = document.documentElement;
    const isDark = this.state.isDark;
    if(isDark) {
      root.style.setProperty('--color-bg-start', this.state.theme[0].bgStart);
      root.style.setProperty('--color-bg-end', this.state.theme[0].bgEnd);
    }
    else {
      root.style.setProperty('--color-bg-start', this.state.theme[1].bgStart);
      root.style.setProperty('--color-bg-end', this.state.theme[1].bgEnd);
    }
  }

  handleTheme() {
    this.setState({
      isDark: !this.state.isDark
    });
  }


  handleChange(e) {
    let value = e.target.value;
    this.setState({
      value: value
    });
  }
  handleShare() {
    let value = this.state.value;
    console.log(value);
  }

  render() {
    return (
      <div className="App">
        <ButtonTheme className="AppTheme" onClick={this.handleTheme}>
          <SVGTheme isDark={this.state.isDark}/>
        </ButtonTheme>

        <AppMain handleChange={this.handleChange} handleShare={this.handleShare} value={this.state.value} />

        <AppSupport hashtags={this.state.hashtags}/>
      </div>
    );
  }
}

export default App;
