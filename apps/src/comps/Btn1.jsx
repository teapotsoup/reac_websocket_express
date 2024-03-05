import styled from 'styled-components';

export const Btn1 = styled.button`
    box-sizing: border-box;
    border: 2px solid currentColor;
    border-radius: 3rem;
    background-color: white;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    overflow: hidden;
    padding: 20px;
    position: relative;
    text-decoration: none;
    transition: .2s transform ease-in-out;
    will-change: transform;
    z-index: 0;
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;

    &::after {
        background-color: green;
        border-radius: 3rem;
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(-100%, 0) rotate(10deg);
        transform-origin: top left;
        transition: .2s transform ease-out;
        will-change: transform;
        z-index: -1;
    }

    &:hover::after {
        transform: translate(0, 0);
    }

    &:hover {
        border: 2px solid transparent;
        color: white;
        transform: scale(1.05);
        will-change: transform;
    }
`;
