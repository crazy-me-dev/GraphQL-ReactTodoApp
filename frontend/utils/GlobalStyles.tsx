import { Global, css } from "@emotion/core";

const styles = css`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    background: whitesmoke;
  }
  html,
  button,
  input,
  select,
  textarea {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-size: 100%;
    line-height: 1.5;
    color: #444;
  }
  h1,
  h2,
  h3,
  h4 {
    font-weight: 400;
    margin: 0 0 1rem 0;
  }

  h2 {
    letter-spacing: 0.03em;
  }
`;

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;
