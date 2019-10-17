import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useTheme } from "emotion-theming";
import styled, { Theme } from "../../config/styles";

import { Container, Button } from "../common";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import AuthContext from "../login/AuthContext";
import { LOGOUT_MUTATION } from "../login/loginRequests";

const AppHeaderWrapper = styled.header`
  padding: 0.5rem;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

const LogOutButton = () => {
  const [logOut] = useMutation(LOGOUT_MUTATION);

  return (
    <AuthContext.Consumer>
      {({ user, refetchUser }) => {
        if (!user) return null;

        return (
          <Button
            onClick={() => {
              logOut({
                awaitRefetchQueries: true,
                update: () => {
                  refetchUser();
                }
              });
            }}
          >
            Logout
          </Button>
        );
      }}
    </AuthContext.Consumer>
  );
};

const AppHeader: React.FC = props => {
  const theme = useTheme<Theme>();

  return (
    <AppHeaderWrapper data-testid="app-header">
      <Container
        style={{
          display: "flex",
          justifyContent: "flex-start"
        }}
      >
        <LogoSVG
          style={{
            fill: theme.colors.primary,
            marginRight: "auto",
            transform: "translateY(-4px)"
          }}
        />
        <Link to="/settings">Settings</Link>
        <LogOutButton />
      </Container>
    </AppHeaderWrapper>
  );
};

export default AppHeader;
