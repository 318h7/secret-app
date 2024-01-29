import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  #root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    background-color: ${({ theme }) => theme.colors.bg};

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

  
  h1 {
    display: block;
    font-size: 2rem;
    margin-block-start: 0.33rem;
    margin-block-end: 0.83rem;
    margin-inline-start: 0;
    margin-inline-end: 0px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.light};
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