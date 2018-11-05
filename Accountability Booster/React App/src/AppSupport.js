import React from 'react';
import './css/AppSupport.css';
import styled from 'styled-components';


/* styled component: hashtag buttons
- include a transition for the hover and active state
- slightly modify the appearance on smaller viewports
*/
const SupportButton = styled.button`
  background: var(--color-card);
  border: none;
  padding: 1rem 0.5rem;
  border-radius: 4px;
  box-shadow: 0 1px 5px var(--color-card);
  font-family: inherit;
  font-weight: bold;
  color: var(--color-bg-start);
  transition: all 0.2s ease-out;

  &:hover {
    color: var(--color-card);
    background: var(--color-bg-start);
    box-shadow: 0 2px 5px 2px var(--color-card);
  }

  &:active {
    transform-origin: bottom center;
    transform: scaleY(0.98) translateY(2px);
    box-shadow: 0 2px 5px var(--color-card);
  }

  @media (max-width: 600px) {
    margin: 0.8rem;
    padding: 0.5rem 1rem;
  }
`;

// render one button for each string in the array of hashtags
const AppSupport = (props) => {
  return (
    <section className="AppSupport">
      {
        props.hashtags.map((hashtag, index) => {
          return <SupportButton key={index} onClick={props.handleHashtag}>{hashtag}</SupportButton>
        })
      }
    </section>

  );
}

export default AppSupport;
