import React from 'react';
import './css/AppMain.css';
import styled from 'styled-components';
import SVGShare from './SVGShare';

/* styled component: header */
const MainHeader = styled.h1`
  font-family: var(--font-header);
  font-weight: 300;
  font-size: 2.5rem;
  text-align: center;
`;
/* styled component: textarea */
const MainTextarea = styled.textarea`
  max-width: 400px;
  width: 90vw;
  min-height: 200px;
  margin: 2.5rem 0 1.5rem;
  padding: 1rem;
  background: var(--color-card);
  border-radius: 4px;
  border: none;
  box-shadow: 0 1px 5px var(--color-card);
  color: var(--color-bg-end);
  font-family: inherit;
  font-size: 1.2rem;

  &::placeholder {
    opacity: 0.8;
  }
`;

/* styled component: button
- include a transition for the hover and active state
*/
const MainButton = styled.button`
border: none;
  background: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  color: var(--color-card);
  transition: all 0.25s ease-out;

  &:hover {
    transform: translateY(-0.4rem);
    color: var(--color-bg-end);
    background: var(--color-card);
  }
  &:active {
    transform: scale(1.1) translateY(-0.4rem);
  }

`;

//  render the header atop the textarea and button elements
const AppMain = (props) => {
  return (
    <main className="AppMain">
      <MainHeader>Something to share?</MainHeader>

      <MainTextarea onChange={props.handleChange} type="text" placeholder="Always learning. Always practicing 💪 #100daysofcode #js #react #styled-components #redux" value={props.value}></MainTextarea>

      <MainButton onClick={props.handleShare}>
        <SVGShare />
      </MainButton>
    </main>

  );
}

export default AppMain;
