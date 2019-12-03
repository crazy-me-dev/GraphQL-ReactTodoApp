import React from "react";

import Container from "./Container";
import styled from "../../config/styles";

interface AppContainerProps {
  children: React.ReactNode;
  flex?: boolean;
}

const AppContainer: React.FC<AppContainerProps> = ({ children, ...rest }) => {
  return (
    <main>
      <Wrapper {...rest} data-testid="app-container">
        {children}
      </Wrapper>
    </main>
  );
};

const Wrapper = styled(Container)<AppContainerProps>`
  margin-top: 4rem;
  margin-bottom: 3rem;
  display: ${props => (props.flex ? "flex" : "block")};
`;

export default AppContainer;
