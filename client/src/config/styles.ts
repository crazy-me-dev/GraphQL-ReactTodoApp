import { css } from "@emotion/core";
import EmotionStyled, { CreateStyled } from "@emotion/styled";

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    border: string;
    borderDark: string;
    background: string;
    text: string;
    grey: {
      "100": string;
      "400": string;
      "700": string;
    };
  };
  maxWidth: number;
}

const defaultTheme: Theme = {
  id: "theme",
  name: "Default",
  colors: {
    primary: "#FB3535",
    border: "#eee",
    borderDark: "#ccc",
    background: "#fff",
    text: "#333",
    grey: {
      "100": "#f1f1f1",
      "400": "#ddd",
      "700": "#ccc"
    }
  },
  maxWidth: 900
};

const dark: Theme = {
  id: "dark",
  name: "Dark",
  colors: {
    primary: "#FB3535",
    border: "#303030",
    borderDark: "#303030",
    background: "#444",
    text: "#eee",
    grey: {
      "100": "#f1f1f1",
      "400": "#ddd",
      "700": "#ccc"
    }
  },
  maxWidth: 900
};

const blue: Theme = {
  id: "blue",
  name: "Blue",
  colors: {
    primary: "#0099ff",
    border: "#ddd",
    borderDark: "#ccc",
    background: "#f3f3f3",
    text: "#444",
    grey: {
      "100": "#f1f1f1",
      "400": "#ddd",
      "700": "#ccc"
    }
  },
  maxWidth: 900
};

const globalStyles = (theme: Theme) => css`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: ${theme.colors.background};
  }

  input,
  select,
  button,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
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
    color: ${theme.colors.text};
  }

  hr {
    border: none;
    border-top: 1px solid ${theme.colors.border};
  }
`;

const styled = EmotionStyled as CreateStyled<Theme>;

const breakpoints = { medium: 600 };

type BreakpointKeys = keyof typeof breakpoints;

const mq = (breakpoint: BreakpointKeys) => {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`;
};

const themes = {
  defaultTheme,
  dark,
  blue
};

export { globalStyles, themes, mq };
export default styled;
