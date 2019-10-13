import React from "react";

import AppHeader from "./AppHeader";
import Container from "./Container";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = props => {
  return (
    <div data-testid="app-container">
      <AppHeader />
      <Container style={{ marginTop: "2rem" }} data-testid="container">
        {props.children}
      </Container>
    </div>
  );
};

export default AppContainer;
