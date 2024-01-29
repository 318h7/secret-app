import styled from "styled-components";

export const Layout = styled.div`
    height: 100vh;
    padding: 2rem 4rem;
    box-sizing: border-box;
`

export const Card = styled.div`
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: ${({ theme: { colors } }) => `2px 2px 4px ${colors.text}`};
`