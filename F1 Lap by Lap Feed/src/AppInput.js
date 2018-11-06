import React from 'react';
// import styled components and create a dashboard for the input elements
import styled from 'styled-components';

// position the input elements and the button side by side
const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem 2.5rem;
  background: #e10600;
  box-shadow: 0 1px 5px #e10600;
  border-radius: 0 0 40px 40px;
  margin-bottom: 1.5rem;
`;
// stretch the input elements to take the majority of the horizontal space
// display the input elements horizontally
const Inputs = styled.div`
flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
// display the labels boldy on the red background
const Label = styled.label`
  font-family: "KoHo", sans-serif;
  font-size: 1.4rem;
  color: #fff;
  margin: 0.5rem 0;
  text-transform: uppercase;
`;
const Input = styled.input`
  background: #fff;
  border: none;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1.1rem;
`;
// include a round circle and an arrow pointing downwards through pseudo elements
const Button = styled.button`
  margin: 0 1rem;
  width: 52px;
  height: 52px;
  background: #fff;
  border: none;
  border-radius: 50%;
  position: relative;
  font-size: 0;

  &:before {
    position: absolute;
    content: '';
    top: 25%;
    height: 40%;
    width: 4px;
    left: 50%;
    transform: translateX(-50%);
    background: #e10600;
    transition: all 0.2s ease-out;
  }
  &:after {
    position: absolute;
    content: '';
    top: 65%;
    left: 50%;
    transform: translateX(-50%);
    border-top: 10px solid #e10600;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
    transition: all 0.2s ease-out;
  }
  &:hover:before {
    height: 35%;
  }
  &:hover:after {
    top: 60%;
  }
  &:active:before {
    height: 40%;
  }
  &:active:after {
    top: 65%;
  }
`;

// create a stateless component rendering simply an input element and a button element
const AppInput = (props) => {
  const { title, subtitle, update, handleSubmit, handleInput } = props;
  return (
    <Form className="AppInput" onSubmit={handleSubmit}>
      <Inputs>
        <>
          <Label>Title</Label>
          <Input type="text" id="title" value={title} onInput={handleInput} placeholder="RACE DAY" />
        </>
        <>
          <Label>Subtitle</Label>
          <Input type="text" id="subtitle" value={subtitle} onInput={handleInput} placeholder="12:45" />
        </>
        <>
          <Label>Update*</Label>
          <Input required type="text" id="update" value={update} onInput={handleInput} placeholder="The race is about to start" />
        </>
      </Inputs>
      <Button>Send update</Button>
    </Form>
  );
}

export default AppInput;
