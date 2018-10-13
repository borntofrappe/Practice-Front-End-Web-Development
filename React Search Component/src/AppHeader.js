import React from 'react';
import styled from 'styled-components';

// style components for the headings
// thin main heading
const HeaderTitle = styled.h1`
  font-family: var(--font-header);
  font-weight: 300;
  font-size: 2.5rem;
`;

// upppercase subheading
const HeaderDescription = styled.h3`
  font-family: var(--font-header);
  margin: 0.75rem 0 1.5rem;
  text-transform: uppercase;
  font-size: 3rem;
  text-align: center;
`;
/* in a stateless component render the heading elements which introduce the application */
const AppHeader = () => (
  <div className="AppHeader">
    <HeaderTitle>Is there a storm with your name?</HeaderTitle>
    <HeaderDescription>Find out!</HeaderDescription>
  </div>
);

export default AppHeader;
