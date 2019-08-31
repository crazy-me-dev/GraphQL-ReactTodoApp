const defaultTheme = {
  colors: {
    panelTop: "#eee",
    primary: "tomato",
    text: "#333"
  },
  padding: "1",
  wideWidth: "920px",
  border: "1px solid rgba(0,0,0,0.05)",
  topPanelHeight: "56px",
  sidebarWidth: "240px"
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
