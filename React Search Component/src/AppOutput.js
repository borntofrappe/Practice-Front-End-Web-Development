import React from 'react';
import styled from 'styled-components';
import './css/AppOutput.css';

// styled component for the paragraphs
// taking each a portion of the parent's width (the parent is a flex container)
// on smaller viewports removing the fourth item, being the fourth column
const Field = styled.p`
  margin: 0 0.5rem;
  font-size: 1.2rem;
  text-transform: capitalize;
  flex-grow: 1;
  width: 0;
  
  &:nth-of-type(4) {
    @media(max-width: 700px) {
      display: none;
    }
  }

  @media(max-width: 700px) {
      font-size: 0.9rem;
  }
`;

/* in a stateless component render a container for each array item and nest within one paragraph for each value of the nested object */
const AppOutput = (props) => {

  // add first a makeshift entry to introduce the containers which follow
  const output = props.output;
  output.unshift({name: "Name", dates: ["Dates"], type: "Type", area: "Area"});
  const Output = output.map((storm, index) => {
    return (
      <div className="AppOutput" key={index}>
        <Field>{storm.name}</Field>
        {/* the _date_ property holds an array of values, so be sure to join them into a string */}
        <Field>{storm.dates.join(", ")}</Field>
        <Field>{storm.type}</Field>
        <Field>{storm.area}</Field>
      </div>
    );
  });
  return(
    <React.Fragment>
      {
        Output
      }
    </React.Fragment>
  );
}

export default AppOutput;
