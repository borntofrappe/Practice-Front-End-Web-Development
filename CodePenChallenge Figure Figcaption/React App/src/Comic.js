import React, { Component } from 'react';
import Vignette from './Vignette';
import './Comic.css';


class Comic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      figCaption: [
        'Life with React \' Dev Tools',
        '1st Time',
        '2nd Time',
        'n-th Time'
      ],
      illustrationText: [
        'Enough learning for today, time to browse the web...',
        'Uh, neat... this icon lights up when React is used',
        'This site too...I am sure learning something popular',
        'Somehow I feel a tad... conditioned'
      ],
      vignetteClass: [
        'vignette vignette--one',
        'vignette vignette--two',
        'vignette vignette--three',
        'vignette vignette--four'
      ]
    }
  }
    
    render() {
      return (
        // in a wrapping container include multiple figure elements nesting each scene
        <div className="comic">
        {/* with css position each vignette in a grid, side by side on large devices, on top of one another as the width of the screen is reduced */}
          <Vignette figCaption={this.state.figCaption[0]} illustrationText={this.state.illustrationText[0]} vignetteClass={this.state.vignetteClass[0]}/>
          <Vignette figCaption={this.state.figCaption[1]} illustrationText={this.state.illustrationText[1]} vignetteClass={this.state.vignetteClass[1]}/>
          <Vignette figCaption={this.state.figCaption[2]} illustrationText={this.state.illustrationText[2]} vignetteClass={this.state.vignetteClass[2]}/>
          <Vignette figCaption={this.state.figCaption[3]} illustrationText={this.state.illustrationText[3]} vignetteClass={this.state.vignetteClass[3]}/>

        </div>
      );
    }
  }
  
  export default Comic;