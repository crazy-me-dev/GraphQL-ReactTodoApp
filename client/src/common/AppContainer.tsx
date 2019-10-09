import React from "react";

import AppHeader from "./AppHeader";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = props => {
  return (
    <div
      style={{
        background: "whitesmoke",
        border: "1px solid #333"
      }}
    >
      <AppHeader />
      <div style={{ padding: "1rem" }}>{props.children}</div>
    </div>
  );
};

export default AppContainer;
