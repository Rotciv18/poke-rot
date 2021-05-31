import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body, input, button {
    font-size: 14px;
    font-family: Roboto, sans-serif;
  }
`;
