import React from "react";

import Container from "./Container";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = props => {
  return (
    <Container style={{ marginTop: "2rem" }} data-testid="app-container">
      {props.children}
    </Container>
  );
};

export default AppContainer;
