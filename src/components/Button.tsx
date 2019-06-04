import styled from "styled-components";

const ButtonSt = styled.button`
    border: none;
    background: rgb(111, 255, 176);
    color: rgb(68, 68, 68);
    display: flex;
    outline: none;
    flex-direction: column;
    flex-grow: 0;
    border-radius: 48px;
    padding: 6px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: rgb(86, 230, 151);
    }
`;

export default ButtonSt;
