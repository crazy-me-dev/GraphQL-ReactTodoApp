import React from "react";

import AppHeader from "./AppHeader";
import Container from "./Container";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = props => {
  return (
    <div>
      <AppHeader />
      <Container style={{ marginTop: "2rem" }}>{props.children}</Container>
    </div>
  );
};

export default AppContainer;
