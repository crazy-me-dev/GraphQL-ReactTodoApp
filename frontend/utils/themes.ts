const defaultTheme = {
  colors: {
    primary: "tomato"
  },
  wideWidth: "800px"
};

const darkTheme = {
  ...defaultTheme,
  ...{
    colors: {
      primary: "#333"
    }
  }
};

export { defaultTheme, darkTheme };
