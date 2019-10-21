import React, { useState, createContext, useContext } from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import { Global } from "@emotion/core";

import { themes, globalStyles } from "../../config/styles";

export type ThemeId = keyof typeof themes;

const ThemeContext = createContext({
  currentTheme: themes["defaultTheme"],
  setTheme: (themeId: ThemeId) => {},
  themes
});

const ThemeProvider: React.FC = ({ children }) => {
  const [themeId, setTheme] = useState<ThemeId>("defaultTheme");
  const currentTheme = themes[themeId];

  const themeContextValues = {
    currentTheme,
    setTheme,
    themes
  };

  return (
    <ThemeContext.Provider value={themeContextValues}>
      <EmotionThemeProvider theme={currentTheme}>
        <Global styles={globalStyles(currentTheme)} />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
export { useTheme };
