import styled from "styled-components";

export const Layout = styled.div`
    height: 100vh;
    padding: 2rem 4rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

export const Card = styled.div`
    width: 100%;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: ${({ theme: { elevation } }) => elevation.high};
    background-color: ${({ theme: { colors } }) => colors.light};
`