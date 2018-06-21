import React, { Component } from 'react';
import './Vignette.css';

class Vignette extends Component {

    render() {
      return (
        // in each figure element include 
        // - a caption with the appropriate element
        // - the illustration, theoretically with an img or svg element, but here practically drawn with HTML and CSS properties
        <figure className={this.props.vignetteClass}>
            <figcaption className="vignette__caption">
                {/* include the caption specified by the parent component */}
                {this.props.figCaption}
            </figcaption>
            
            <div className="vignette__illustration">
            {/* for the illustration, draw a scene with HTML elements and CSS properties */}

                {/* for the particulars of scene #1:
                - a header element including explanatory text 
                - a div nesting an HTML-CSS drawn visual */}
                <h2 className="illustration__text">
                    {/* include the text specified by the parent component */}
                    {this.props.illustrationText}
                </h2>

                <div className="illustration__visual">
                {/* the visual is made up of a computer screen, in which a simple UI is drawn 
          the focus of the computer screen and where the detail lies ought to be the top of the screen itself, where extensions reside */}
                    <div className="computer">
                        {/* divide the UI in a navigation bar and a display right underneath it */}         
                        <div className="computer__navbar">
                            {/* in the navbar include a couple of divs to draw browser's extensions  */}
                            <div className="navbar--extension"></div>
                            <div className="navbar--extension"></div>
                        </div>

                        <div className="computer__display">
                            {/* in the display include one div to draw the arrow of the mouse cursor and a simple rectangle which symbolizes an open window */}
                            <div className="display--cursor">
                            </div>
                            <div className="display--tab">
                            {/* include different content depending on the class name of the vignette */}
                                {this.props.vignetteClass === "vignette vignette--one" && <h3>Search for...</h3>} 
                                {this.props.vignetteClass === "vignette vignette--two" && 
                                <ul>
                                    <li>something</li>
                                    <li>something</li>
                                    <li>something</li>
                                </ul>} 
                                {this.props.vignetteClass === "vignette vignette--three" && 
                                <ul>
                                    <li>etwas</li>
                                    <li>etwas</li>
                                    <li>etwas</li>
                                </ul>} 
                                {this.props.vignetteClass === "vignette vignette--four" && 
                                <ul>
                                    <li>quelque chose</li>
                                    <li>quelque chose</li>
                                    <li>quelque chose</li>
                                </ul>} 
                            </div>
                        </div>
                        {/* close the computer__display div */}
                    </div>
                    {/* close the computer div */}
                </div>
                {/* close the illustration__visual div */}
            </div>
            {/* close the vignette div with the illustration */}
        </figure>
      );
    }
  }
  
  export default Vignette;