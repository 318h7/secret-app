import styled from "styled-components";

export const Layout = styled.div`
    height: 100vh;
    padding: 1rem 4rem;
    box-sizing: border-box;
`

export const Card = styled.div`
    padding: 1rem;
    border-radius: 25px;
    box-shadow: ${({ theme }) => `2px 2px 4px ${theme.text}`};
`