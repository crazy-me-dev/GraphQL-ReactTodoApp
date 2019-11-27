import { css } from "@emotion/core";
import EmotionStyled, { CreateStyled } from "@emotion/styled";

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryShade: string;
    border: string;
    borderDark: string;
    background: string;
    text: string;
    grey100: string;
    grey400: string;
    grey700: string;
  };
  maxWidth: number;
}

const defaultTheme: Theme = {
  id: "theme",
  name: "Default",
  colors: {
    primary: "#FB3535",
    primaryShade: "rgba(251, 53, 53, 0.4)",
    border: "#eee",
    borderDark: "#ccc",
    background: "#fff",
    text: "#333",
    grey100: "#f1f1f1",
    grey400: "#ddd",
    grey700: "#ccc"
  },
  maxWidth: 900
};

const dark: Theme = {
  id: "dark",
  name: "Dark",
  colors: {
    primary: "#FB3535",
    primaryShade: "rgba(251, 53, 53, 0.4)",
    border: "#303030",
    borderDark: "#303030",
    background: "#444",
    text: "#eee",
    grey100: "#f1f1f1",
    grey400: "#ddd",
    grey700: "#ccc"
  },
  maxWidth: 900
};

const blue: Theme = {
  id: "blue",
  name: "Blue",
  colors: {
    primary: "#0099ff",
    primaryShade: "rgba(0, 153, 255, 0.4)",
    border: "#ddd",
    borderDark: "#ccc",
    background: "#f3f3f3",
    text: "#444",
    grey100: "#f1f1f1",
    grey400: "#ddd",
    grey700: "#ccc"
  },
  maxWidth: 900
};

const globalStyles = (theme: Theme) => css`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  html {
    touch-action: manipulation;
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

  form {
    width: 100%;
  }

  ::selection {
    background: ${theme.colors.primary};
    color: #fff;
  }

  *:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem ${theme.colors.primaryShade};
  }

  a {
    color: ${theme.colors.text};
  }

  hr {
    border: none;
    border-top: 1px solid ${theme.colors.border};
    margin: 2rem 0;
  }

  /* Fixes blurry SVGs */
  svg {
    transform: translateZ(0);
  }
`;

const styled = EmotionStyled as CreateStyled<Theme>;

const breakpoints = { medium: 600 };

type BreakpointKeys = keyof typeof breakpoints;

const mq = (breakpoint: BreakpointKeys) => {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`;
};

interface ColorProps {
  theme: Theme;
}
const color = (color: keyof Theme["colors"]) => (props: ColorProps) => {
  return props.theme.colors[color];
};

const themes = {
  defaultTheme,
  dark,
  blue
};

export { globalStyles, themes, mq, color };
export default styled;
