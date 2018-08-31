import React from 'react';
import './css/AppSlides.css';
import styled from 'styled-components';


const Title = styled.h2`
    text-transform: uppercase;
    font-size: 2.5rem;
    transform: rotate(-5deg);
`;

const Description = styled.p`
    font-size: 1.5rem;
    max-width: 450px;
    line-height: 2;

`;
const Code = styled.code`
    font-family: var(--font-code);
    padding: 0.75rem 1.25rem;
    color: var(--color-bg);
    border-radius: 4px;
    background: var(--color-text);
`;

// render the title, description and code elements, if present
const AppSlides = (props) => {
    const title = props.slide.title;
    const description = props.slide.description;
    const code = props.slide.code;
    return(
        <section className="AppSlide">
            {
                title &&
                <Title>{title}</Title>
            }
            {
                description &&
                <Description>{description}</Description>
            }
            {
                code &&
                <Code>{code}</Code>
            }
        </section>
    );
}

export default AppSlides;
