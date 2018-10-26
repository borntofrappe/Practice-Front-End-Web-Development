import React from 'react';
import './css/AppQuestion.css';
// import styled components
import styled from 'styled-components'

const Question = styled.div`
  padding: 1rem 2rem;
  box-shadow: 0 1px 5px 1px rgba(191, 191, 191, 0.8);

`;

const Query = styled.h2`
  text-align: center;
  margin: 1rem 0 1.5rem;
  font-weight: 300;
  font-size: 1.4rem;
`;
const Answers = styled.ol`
  line-height: 4;
  list-style: none;
  font-size: 1.2rem;
  counter-reset: special-counter;

  li {
    margin-left: 2rem;
    padding-left: 1.5rem;
    counter-increment: special-counter;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:before {
      content: counter(special-counter);
    position: absolute;
    right: calc(100% - 0.5rem);
    top: 50%;
    background: #252a37;
    color: #fff;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    transform: translateY(-50%);
    transition: all 0.2s ease-out;
    }
    &:hover:before {
      border: 1px solid #fff;
      background: #999;
    }
    &:hover {
      background: #99999944;
    }
  }
`;


const AppQuestion = (props) => {
  /** information needed
   * question
   * answers 
   * 
   * additionally
   *  the function to show the answer for the connected question
   */ 
  const { question, answers } = props.data;
  const { showAnswer } = props;

  // create a series of list items, one for each possible option
  const answersOptions = answers.map(answer => 
    <li 
      key={answer.answer} 
      answer={answer.answer}
      onClick={showAnswer}>
        {answer.value}
    </li>
    );

  // render the question and the answers in an ordered list
  return (
    <Question className="AppQuestion">
      <Query>{question}</Query>
      <Answers>
        {answersOptions}
      </Answers>
    </Question>
  );
}

export default AppQuestion;
