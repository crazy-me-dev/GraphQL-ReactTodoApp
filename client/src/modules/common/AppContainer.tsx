import React from "react";

import Container from "./Container";
import styled from "../../config/styles";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = props => {
  return <Wrapper data-testid="app-container">{props.children}</Wrapper>;
};

const Wrapper = styled(Container)`
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export default AppContainer;
