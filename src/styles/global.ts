import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  #root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    background-color: ${({ theme: { colors } }) => colors.bg};
    color: ${({ theme: { colors }}) => colors.dark};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body{
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
  }

  div,input,button {
    margin: 0;
  }

  button {
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 0.5rem;
    background-color: ${({ theme: { colors } }) => colors.main};
    border: none;
    box-shadow: ${({ theme: { elevation } }) => elevation.low};
    font-weight: bold;

    &:hover {
      filter: brightness(95%);
    }
    &:active {
      box-shadow: ${({ theme: { elevation } }) => elevation.ground};
    }
  }

  input {
    box-shadow: inset 1px 1px 2px ${({ theme: { colors } }) => colors.grey};
    border-radius: 8px;
    border: 1px solid ${({ theme: { colors } }) => colors.main};
    display: block;
    margin: 0 0 0.5rem;
    padding: 1rem;
  
    ::placeholder {
      color: ${({theme: { colors } }) => colors.dark};
    }

    &:focus {
      outline: none;
    }
  }

  h1 {
    display: block;
    font-size: 2rem;
    margin-block-start: 0.33rem;
    margin-block-end: 0.83rem;
    margin-inline-start: 0;
    margin-inline-end: 0px;
    font-weight: bold;
    text-align: center;
    color: ${({ theme: { colors }}) => colors.light};
  }

  h2 {
    display: block;
    font-size: 1.5rem;
    margin-block-start: 0;
    margin-block-end: 0.83rem;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: bold;
  }
`