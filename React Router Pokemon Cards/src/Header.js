import React from 'react';
import './css/Header.css';
// import styled components
import styled from 'styled-components';

// style the headers through the styled components library
const Title = styled.h1`
  font-size: calc(3rem + 2vw);
`;
const Subtitle = styled.h3`
  font-size: calc(1.8rem + 1vw);
  color: var(--color-accent);
  font-weight: bold;
`;

// with a stateless functional component render h1 and h2 elements, depending on the values retrieved from props
const Header = (props) => {
  let title = props.title,
    subtitle = props.subtitle;
  return(
    <div className="Header">
      {/* render header elements with the values found in props, if existing */}
      {
        title
        &&
        <Title>{title}</Title>
      }
      {
        subtitle
        &&
        <Subtitle>{subtitle}</Subtitle>
      }
    </div>
  );
}

export default Header;