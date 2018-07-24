import React from 'react';
import './QuoteFrame.css';

// include the SVG responsible for the frame and the text 
// remember react uses camelCase properties such as `viewBox` (and not `viewbox`)
// furthermore, remember comments need wrapping {curly braces} ONLY inside HTML elements

/**
 * IMPORTANT ISSUE
 * as the SVG is built (with the chosen viewbox and font-sizes for the text), only about 25 characters can fit in a single line
 * the wrapping can be achieved by breaking props.quote.text into an array of strings, each at most 25 characters long 
 * following this step, it is possible to include tspan elements for the different array items, altering their y coordinate to display them one after the other
 */

const QuoteFrame = (props) => {
  // store the values for the component in two variables
  let quoteText = props.quote.text;
  let quoteAuthor = props.quote.author;

  // divide the string into an array of strings of length smaller than a prescribed threshold
  let arrWords = quoteText.split(" "); // array of words

  let tempString = ""; // string to store the multiple words
  let arrStrings = []; // array in which to store strings up to a certain height

  // loop through the array of words
  for(let i = 0; i < arrWords.length; i++) {
    // append the words to the temporary string, including a white space to separate teh words
    tempString += arrWords[i] + " ";
    // if the temporary string is more than 18 characters long
    if(tempString.length >= 18) {
      // push the string to the array of string, excluding the white space unnecessarily included at the end 
      arrStrings.push(tempString.substring(0, tempString.length-1));
      // re-initialize the temporary string to an empty string
      tempString = "";
    }

    // replicate the same pushing/re-initializing at the end of the array, if the temporary string is not empty (catch all solution for the last array item) 
    if(i === arrWords.length - 1 && tempString !== "") {
      arrStrings.push(tempString.substring(0, tempString.length-1));
      tempString = "";
    }
  }

  
  return(
    /*
    in the wrapping SVG, include a viewbox equal to 1000+20 and 720+20
    this to later move the contents of the SVG in the frame and avoid cropping, while having nice round coordinates for the circle and path elements (1000*700)
    inspired by the way D3.js works with axes 
    */
  
    <svg viewBox="0 0 1020 720" className="QuoteFrame">
      {/*
      include a pattern which gives the impression of a texture, by including small circles side by side 
      reduce the opacity to avoid an excessive overlay
      */}     
      <defs>
        <pattern id="texture" x="0" y="0" width="5" height="3.5" patternUnits="userSpaceOnUse">
          <circle cx="2.8" cy="1.75" r="1.75" fill="#191919"stroke="none" opacity="0.3"/>
        </pattern>
      </defs>

      {/*
      with a group element
      - move the contents 10 to the right and 10 to the bottom, allowing the contents to work on a 1000*700 frame, while at the same time avoiding cropping at the edges
      - set stroke and fill properties shared by all SVG elements (stroke width is different for the circle elements and the frame, fill is actually altered for the path element as to include the texture)
      */} 
      <g transform="translate(10,10)" stroke="#b6b5b8" fill="none">
        {/*
        draw one circle for each corner 
        */} 
        <g strokeWidth="6">
          <circle cx="10" cy="10" r="10"/>
          <circle cx="990" cy="10" r="10"/>
          <circle cx="10" cy="690" r="10"/>
          <circle cx="990" cy="690" r="10"/>
        </g>
        {/*
        include a text element for the quote 
        stroke to give weight to the characters

        for the chosen frame and font-size (4.5rem), approximately 25 characters can stay on a single line
        include tspan elements when this length is exceeded 
        tspan with a dy element pushing each successive tspan by 100, to avoid overlaps and distance the lines (4 lines seems to be an upper threshold, something which can be tested in JS)
        
        with text anchor set to middle, even if the text varies in length it gets still displayed centered in the frame
        */} 
        
        <g stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="#fff">
          <text x="500" y="150" textAnchor="middle" className="text text__quote">
            {/* loop through the array of strings to display each one of them on a separate line */}
            {
              arrStrings.map((arrString, index) => {
                if(index === 0) {
                  return(
                    <tspan key={index} x="500" dy="0">{arrString}</tspan>
                  );
                }
                else {
                  return(
                    <tspan key={index} x="500" dy="100">{arrString}</tspan>
                  );
                }
              })
            }
          </text>
          
          {/*
          include a text element for the author
          same text anchor chosen for the quote, to center the author right below it
          position it in the bottom section of the screen, but high enough to include the bottom decoration
          */} 
          
          <text textAnchor="middle" x="500" y="560" className="text text__author">{quoteAuthor}</text>
        </g>
        
        {/*
        include the bottom decoration with simple path elements 
        stroke-linecap to avoid square linecaps, which might be too much
        */} 
        
        <path strokeLinecap="round" strokeWidth="10" d="M 200 580 H 800"/>
        <path strokeLinecap="round" strokeWidth="8" d="M 280 610 H 450 A 50 50 0 0 0 550 610 H 720"/>
        <circle strokeWidth="8" cx="500" cy="620" r="10"/>

        {/*
        draw the frame with a path element, alternating straight lines and arcs for the inset corners 
        position the path after the other SVG elements to have the fill overlayed on said elements
        */} 
            
        <path fill="url(#texture)" strokeWidth="8" d="M 50 0 H 950 A 50 50 0 0 0 1000 50 V 650 A 50 50 0 0 0 950 700 H 50 A 50 50 0 0 0 0 650 V 50 A 50 50 0 0 0 50 0 Z"/>
      </g>
    </svg>
  );
};

export default QuoteFrame;
