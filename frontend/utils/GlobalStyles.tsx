import { Global, css } from "@emotion/core";

const styles = css`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    background: white;
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
    color: #666;
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
  .text-small {
    font-size: 0.8em;
    margin-left: 0.5rem;
  }
  .text-light {
    opacity: 0.5;
  }
  hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
`;

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;
