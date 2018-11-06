import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  border-left: 2px dotted #33333322;
  padding: 2rem 1rem 3rem;
  line-height: 2;
  position: relative;
  margin-left: 0.5rem;

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #e10600;
  }
  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 3%;
    width: 92%;
    height: 2rem;
    border-top: #33333388 0.1rem solid;
    border-right: #33333388 0.1rem solid;
    border-top-right-radius: 20px;
  }
`;
const Title = styled.h2`
  font-size: 2rem;
`;
const Subtitle = styled.h3`
  font-size: 1.65rem;
`;
const Update = styled.p`
  font-size: 1.1rem;
`;
// in a stateless component detail each update in a section
// currently considering only paragraph elements
const AppOutput = (props) => {
  const { updates } = props;
  const sectionUpdates = updates.map((update, key) => {
    const { title, subtitle, update: up } = update;

    return (
      <Section key={key}>
        {
          title &&
          <Title>{title}</Title>
        }
        {
          subtitle &&
          <Subtitle>{subtitle}</Subtitle>
        }
        <Update>{up}</Update>
      </Section>
    );
  });
  return (
    <div className="AppOutput">
      {
        sectionUpdates
      }
    </div>
  );
};

export default AppOutput;
