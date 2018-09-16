import React from 'react';
import './css/AppMonitor.css';

// import styled components to style the div, heading and paragraph
import styled from 'styled-components';
// import keyframes to create animations with the same library
import { keyframes } from 'styled-components';


// include a keyframe animation for monitor (a copy of the keyframe animation for the button)
const fadeDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100vh);
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// include a keyframe animation for the heading and the div nesting the paragraph elements
const fadeUp = keyframes`
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;


// style the div for the container of the heading and paragraphs, the heading and the div wrapping the paragraphs through the styled-components library
// include the animations as defined above, and for the heading/paragraphs include this only through a class, added after the button is pressed

// include through pseudo elements two simple circles in the top left section of the monitor
const Monitor = styled.div`
  border-radius: 5px;
  background: var(--color-monitor);
  box-shadow: 0 1px 5px var(--color-bg-d);
  padding: 1rem 1.5rem;
  border-top: 0.8rem solid var(--color-text);
  position: relative;
  animation: ${fadeDown} 0.8s 0.5s cubic-bezier(.25,-0.3,.5,1.5) both;

  &:before, &:after {
    content: '';
    position: absolute;
    top: -0.65rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }
  &:before {
    left: 0.5rem;
    background: #ff925c;
  }
  &:after {
    left: 1.5rem;
    background: #baffa5;
  }
`;

// by default hide and offset the heading and paragraphs
const Heading = styled.h2`
  font-family: var(--font-code);
  font-size: calc(1.5rem + 2.5vh);
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(25vh);

  &.animated {
    animation: ${fadeUp} 0.5s cubic-bezier(.25,-0.3,.5,1.5) forwards;
  }
`;

const Paragraph = styled.div`
  font-size: 1.15rem;
  line-height: 2;
  opacity: 0;
  transform: translateY(25vh);

  &.animated {
    animation: ${fadeUp} 0.5s cubic-bezier(.25,-0.3,.5,1.5) forwards;
  }
`;


// render the monitor displaying the elements of the object, through heading and paragraphs
const AppMonitor = (props) => {
    // destructure the two values from the object in props
    let { heading, description } = props.monitorMessage;

    // create one paragraph for each item of the description property
    let paragraphs = description.map((line, index) => <p key={index}>{line}</p>);

    // render the heading atop the paragraphs elements, nested in a wrapping container (used to animate the paragraph(s) together)
    return(
        <Monitor className="AppMonitor">
            <Heading>{heading}</Heading>

            <Paragraph className="Paragraph">
              { paragraphs }
            </Paragraph>

        </Monitor>
    );
}

export default AppMonitor;
