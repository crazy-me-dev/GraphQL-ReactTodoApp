import React, { useState, useContext } from "react";

const SideMenuContext = React.createContext({
  isSideMenuOpen: false,
  setSideMenuOpen: (state: boolean) => {}
});

const SideMenuProvider: React.FC = ({ children }) => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    <SideMenuContext.Provider
      value={{
        isSideMenuOpen,
        setSideMenuOpen: isOpen => {
          setSideMenuOpen(isOpen);
        }
      }}
    >
      {children}
    </SideMenuContext.Provider>
  );
};
const SideMenuConsumer = SideMenuContext.Consumer;

const useSideMenu = () => {
  return useContext(SideMenuContext);
};

export { SideMenuConsumer, SideMenuProvider, useSideMenu };
