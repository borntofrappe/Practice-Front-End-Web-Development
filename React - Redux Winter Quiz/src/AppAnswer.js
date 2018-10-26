import React from 'react';
// import './css/AppAnswer.css';
// import styled components
import styled from 'styled-components'

const Answer = styled.div`
  padding: 1rem 2rem;
  box-shadow: 0 1px 5px 1px rgba(191, 191, 191, 0.8);
  text-align: center;
  transition: transform 0.2s ease-out;
  transition-delay: 0.05s;

  &.Hidden {
    transform: scale(0);
    visibility: none;
    opacity: 0;
  }
`;

const Verdict = styled.h2`
  text-align: center;
  margin: 0.5rem 0;
`;

const Explanation = styled.p`
  line-height: 2;
  text-align: initial;
`;

const Button = styled.button`
  margin: 1rem 0;
  background: none;
  border: 1px solid #252525;
  padding: 0.5rem 1rem;
  border-radius: 4px;
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
detail the right answer in this last case 
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
  return (
    <Answer className={className}>
    {
      isCorrect
      ?
      <Verdict>Right Answer!</Verdict>
      :
      <>
        <Verdict>Sorry, wrong answer</Verdict>
        <p>The right answer was <strong>{answers.find(answer => answer.answer === correctAnswer).value}</strong></p>
      </>
    }
      <Explanation>{explanation}</Explanation>
      <Button onClick={nextQuestion}>{ isLast ? "Continue" : "Check your Score"}</Button>
    </Answer>
  );
}

export default AppAnswer;
