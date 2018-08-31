import React from 'react';
import './css/AppControls.css';
import Arrow from './Arrow';
import styled from 'styled-components';

/*
style the button to show the SVG icon exclusively
rotate the first button to show the arrow pointing left
on hover "trigger" the buttons moving them opposite the way the point
when pressed, move them back to their original position
*/
const Button = styled.button`
    border: none;
    background: none;
    outline: none;
    width: 36px;
    height: 36px;
    transition: all 0.2s ease-out;

    &:nth-of-type(1) {
        transform: rotateY(180deg);
    }

    &:nth-of-type(1):hover {
        border-right-color: var(--color-bg);
        margin-left: 4px;
    }

    &:nth-of-type(1):active {
        margin-left: 0;
    }

    &:nth-of-type(2):hover {
        border-left-color: var(--color-bg);
        margin-right: 4px;
    }
    &:nth-of-type(2):active {
        margin-right: 0;
    }

`;

// render in a stateless component one button for "prev" and "next" actions, to move to the next/previous slide
const AppControls = (props) => {
    return(
        <div className="AppControls">
            <Button onClick={props.handleButton} className="prev">
                <Arrow/>
            </Button>
            <Button onClick={props.handleButton} className="next">
                <Arrow/>
            </Button>
        </div>
    );
}

export default AppControls;
