import styled from "styled-components";

export const Layout = styled.div`
    height: 100vh;
    padding: 1rem 4rem;
    box-sizing: border-box;
`

export const Card = styled.div`
    padding: 1rem;
    border-radius: 25px;
    box-shadow: ${({ theme }) => `4px 4px 8px ${theme.text}`}
    width: 100%;
    height: 100%;
`