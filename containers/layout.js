import React from 'react';
import styled from 'styled-components';

export const VerticalAlign = styled.div`
    height: 100vh;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const HorizontalAlign = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const JustifyAlign = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: justify;
`;

export const Divider = ( { width = "10vw", height = "10vh" }) => {
    console.log(height);
    console.log(width);
    return <div style={{width, height}}/>
}
