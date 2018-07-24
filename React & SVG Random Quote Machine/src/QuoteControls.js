import React from 'react';
import './QuoteControls.css';
import ShareQuote from './ShareQuote';
import GetNewQuote from './GetNewQuote';

// in the controls panel render the components responsible for the buttons
const QuoteControls = (props) => {
  return(
    <div className="QuoteControls">
      <ShareQuote handleShareQuote={props.handleShareQuote} />
      <GetNewQuote handleNewQuote={props.handleNewQuote} />
    </div>
  );
};

export default QuoteControls;
