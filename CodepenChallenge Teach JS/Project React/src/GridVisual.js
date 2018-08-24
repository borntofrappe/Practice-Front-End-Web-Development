import React from 'react';
import './css/GridVisual.css';
// import styled components 
import styled from 'styled-components';

// style the heading and paragraph to display them boldy in the page
const Heading = styled.h2`
  font-size: calc(3rem + 1vw);
  font-family: var(--font-heading);
`;
const Brief = styled.p`
  font-size: calc(1rem + 0.5vw);
  max-width: 350px;
  line-height: 2;
`

// style pre and code to show the code snippet with light text on a dark background
// allow for horizontal overflow when needed
const Pre = styled.pre`
  color: var(--color-grid);
  background: var(--color-background);
  padding: 0.5rem 1rem 0.5rem 0;
  border-radius: 10px;
  margin: 1rem;
  width: 100%;
  overflow-x: auto;
`;
const Code = styled.code`
  font-family: var(--font-code);
  font-weight: 300;
  line-height: 1.5;
`;

/* with a stateless component, render the information stored in the object, through appropriate elements
elements are rendered in the following format 

<div>
  <div>
    <h2></h2>
    <p></p>
  </div>
  <pre>
    <code>
    </code>
  </pre>
</div>
*/
const GridVisual = (props) => {
  let heading = props.data.heading;
  let brief = props.data.brief;
  let snippet = props.data.snippet;
  
  console.log(heading);
  return(
    <div className="GridVisual">

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

export default GridVisual;
