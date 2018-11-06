import React from 'react';
// import styled components and create a dashboard for the input element
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1.5rem 1.5rem 3rem;
  background: #e10600;
  border-radius: 0 0 40px 40px;
`;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const Input = styled.input`
  // width: 100%;
  // flex-grow: 1;
`;
const Button = styled.button`
  // width: 100%;
  margin: 1rem;
`;

// create a stateless component rendering simply an input element and a button element
const AppInput = (props) => {
  const { title, subtitle, update, handleSubmit, handleInput } = props;
  return (
    <Form className="AppInput" onSubmit={handleSubmit}>
      <Inputs>
        <>
          <label>Title</label>
          <Input type="text" id="title" value={title} onInput={handleInput} placeholder="RACE DAY" />
        </>
        <>
          <label>Subtitle</label>
          <Input type="text" id="subtitle" value={subtitle} onInput={handleInput} placeholder="12:45" />
        </>
        <>
          <label>Update*</label>
          <Input required type="text" id="update" value={update} onInput={handleInput} placeholder="The race is about to start" />
        </>
      </Inputs>
      <Button>Send update</Button>
    </Form>
  );
}

export default AppInput;
