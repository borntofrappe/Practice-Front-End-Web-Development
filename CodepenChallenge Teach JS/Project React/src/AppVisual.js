import React from 'react';
import './css/AppVisual.css';
import styled from 'styled-components';

const Heading = styled.h2`
  font-size: calc(3rem + 1vw);
  font-family: var(--font-heading);
`;
const Brief = styled.p`
  font-size: calc(1rem + 0.5vw);
  max-width: 350px;
  line-height: 2;
`
const Pre = styled.pre`
  padding: 0.5rem 1rem 0.5rem 0;
  margin: 1rem;
  background: var(--color-background);
  border-radius: 10px;
  color: var(--color-grid);
  // max-width: 400px;
  width: 100%;
  overflow-x: auto;
`;
const Code = styled.code`
  font-family: var(--font-code);
  font-weight: 300;
  line-height: 1.5;

  @media and (max-width: 450px) {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

// with a stateless Component, information stored in the array of objects
const AppVisual = (props) => {
  let heading = props.data.heading;
  let brief = props.data.brief;
  let snippet = props.data.snippet;
  
  console.log(heading);
  return(
    <div className="AppVisual">
      <div className="VisualText">
        {
          heading &&
          <Heading>{heading}</Heading>
        }
        {
          brief &&
          <Brief>{brief}</Brief>
        }
      </div>
      {
        snippet &&
        <Pre className="VisualCode">
          <Code>
            {snippet}
          </Code>
        </Pre>
      }

    </div>
  );
}

export default AppVisual;
