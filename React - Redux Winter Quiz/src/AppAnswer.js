import React from 'react';
// import styled components
import styled from 'styled-components'

// through the class of .hidden also set a height of 0, to avoid vertical overflow from the get-go
const Answer = styled.div`
  text-align: center;
  transition: transform 0.2s ease-out;
  transition-delay: 0.05s;

  &.Hidden {
    transform: scale(0);
    height: 0;
    visibility: none;
    opacity: 0;
  }
`;

const Verdict = styled.h2`
  font-size: 1.4rem;
  margin: 0.8rem 0;
`;
const Correction = styled.p`
  margin: 0.8rem 0 1rem;
  font-size: 1.2rem;
`;

const Explanation = styled.p`
  font-size: 1.1rem;
  line-height: 2;
  text-align: initial;
`;

const Button = styled.button`
  margin: 1rem 0;
  background: none;
  border: 1px solid #252525;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1.2rem;
  font-family: inherit;
  color: inherit;
  transition: all 0.2s ease-out;

  &:hover, &:focus {
    background: #252525;
    color: #fff;
  }
  &:active {
    background: #252525;
    color: #fff;
    transform: scale(1.1);
  }
`;

/*
render whether the answer was correct or not
detail also the explanation behind the question
detail a button to continue to the next question
*/
const AppAnswer = (props) => {
  /** information needed
   * whether the answer is correct
   * the right answer
   * the explanation
   * 
   * additionally
   *  a boolean to show/hide the component
   *  a boolean to detail if the question is the last one
   *  the function to continue after the question
   */ 
  const { isCorrect, isHidden, isLast, nextQuestion, data } = props;
  const { answers, correctAnswer, explanation } = data;
  // show the component adding or omitting a class of Hidden
  const className = (isHidden) ? ' AppAnswer Hidden' : 'AppAnswer';

  // render the answer atop the explanation and a button to move forwards
  return (
    <Answer className={ className }>
    {
      isCorrect
      ?
      <Verdict>Right Answer!</Verdict>
      :
      <>
        <Verdict>Sorry, wrong answer</Verdict>
        <Correction>The right answer was: <strong>{ answers.find(answer => answer.choice === correctAnswer).value }</strong></Correction>
      </>
    }
      <Explanation>{ explanation }</Explanation>
      <Button onClick={ nextQuestion }>{ isLast ? "Continue" : "Check your Score"}</Button>
    </Answer>
  );
}

export default AppAnswer;
