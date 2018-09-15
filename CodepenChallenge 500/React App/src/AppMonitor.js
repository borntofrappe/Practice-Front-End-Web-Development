import React from 'react';
import './css/AppMonitor.css';

// import styled components to style the div, heading and paragraph
import styled from 'styled-components';
import { keyframes } from 'styled-components';


// include a keyframe animation
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

// define the animation used by the monitor and the one included for the heading/paragraph elements
// include a keyframe animation
const fadeUp = keyframes`
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

// animation to display the text after the first animation of the sgv is included
// animation applied with a class of animated (to shown by default)
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

// render the monitor displaying the elements of the object in a heading + paragraph
const AppMonitor = (props) => {
    // destructure the two values from the object in props
    let { heading, description } = props.monitorMessage;

    let paragraphs = description.map((line, index) => <p key={index}>{line}</p>);

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
