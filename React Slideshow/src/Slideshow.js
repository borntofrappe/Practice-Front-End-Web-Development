import React from 'react';
import './css/Slideshow.css';

// for the slideshow CompositionEvent, render the elements, if present in the current slide
const Slideshow = (props) => {

  // title, subtitle, header refer all to a string, and are rendered in single elements
  // text and code relates to array of strings, and rendered with multiple elements, if needed
  let title = props.slide.title;
  let subtitle = props.slide.subtitle;
  let header = props.slide.header;
  let text = props.slide.text;
  let code = props.slide.code;

  return(
    <div className="Slideshow">
      {
        title &&
        <h1>{ title }</h1>
      }

      {
        subtitle &&
        <h3>{ subtitle }</h3>
      }
      {
        header &&
        <h2>{ header }</h2>
      }
      {
        text &&
        text.map((text, index) => <p key={index}>{text}</p>)
      }
      {
        code &&
        code.map((code, index) => <code key={index}>{code}</code>)
      }
    </div>
  );
  
}

export default Slideshow;
