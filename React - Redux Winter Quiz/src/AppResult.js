import React from 'react';
import SVGTwitter from './SVGTwitter';

// import styled components
import styled from 'styled-components'

const Result = styled.div`
  text-align: center;
`;
const Proclamation = styled.h2`
  font-size: 1.2rem;
  margin: 0.8rem 0;
`;
const Score = styled.h1`
  font-weight: 300;
  margin: 1rem 0 2rem;
`;
const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-family: inherit;
  color: inherit;
  padding: 0.5rem 0;
  transition: all 0.2s ease-out;

  svg {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin: 0 0.5rem;
    fill: inherit;
    transition: all 0.2s ease-out;
  }

  &:hover svg {
    background: #333;
    fill: #fff;
  }
`;
/*
render a stateless component highlighting the score of the quiz
additionally detail a link to share the result on twitter 
*/
const AppResult = (props) => {
  /** information needed
   * number of correct answers
   * number of toal questions
   */ 
  const { correct, total } = props;
  // create the tweet detailing the text in the appropriate attribute
  const tweet = `https://twitter.com/intent/tweet?text=Answered%20correctly%20to%20${correct}%20questions%20out%20of%20${total}.%20Your%20turn.`;
  
  // render a header describing the number of correct answers given, atop an anchor link to share the score on twitter
  return (
    <Result className="AppResult">
      <Proclamation>You have answered correctly to</Proclamation>
      <Score>{correct} questions out of {total}</Score>

      <Link href={tweet}>
        Feel free to brag about it <SVGTwitter />
      </Link>
    </Result>
  );
}

export default AppResult;
