import React from 'react';
import './css/AppResult.css';
import SVGTwitter from './SVGTwitter';

// import styled components
// import styled from 'styled-components'


/*
render a simple stateless component highlighting the score of the quiz
additionally detail a link to share the result on twitter 
*/
const AppResult = (props) => {
  /** information needed
   * number of correct answers
   * number of toal questions
   */ 
  const { correct, total } = props;
  const tweet = `https://twitter.com/intent/tweet?text=Answered%20correctly%20to%20${correct}%20questions%20out%20of%20${total}.%20Your%20turn.`;
  
  return (
    <div className="AppResult">
      <h2>You have answered correctly to</h2>
      <h1>{correct} questions out of {total}</h1>

      <a href={tweet}>
        Feel free to brag about it <SVGTwitter />
      </a>
    </div>
  );
}

export default AppResult;
