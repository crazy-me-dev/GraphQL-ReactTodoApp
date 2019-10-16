import { injectGlobal } from "emotion";
import EmotionStyled, { CreateStyled } from "@emotion/styled";

export interface Theme {
  colors: {
    primary: string;
    link: string;
    text: string;
    grey: {
      "100": string;
      "400": string;
      "700": string;
    };
  };
  maxWidth: number;
}

export const theme: Theme = {
  colors: {
    primary: "#FB3535",
    link: "#333",
    text: "#333",
    grey: {
      "100": "#f1f1f1",
      "400": "#ddd",
      "700": "#ccc"
    }
  },
  maxWidth: 900
};

injectGlobal`
  *, ::after, ::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  input,
  select,
  button,
  body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    line-height: 1.5;
    font-size: 16px;
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: ${theme.colors.primary};
    color: #fff;
  }

  a {
    color: ${theme.colors.link}
  }

  hr {
    border: none;
    border-top: 1px solid ${theme.colors.grey[400]};
  }
`;

const styled = EmotionStyled as CreateStyled<Theme>;
export default styled;
