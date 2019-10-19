import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import styled, { mq } from "../../config/styles";

import { Container, Button } from "../common";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import AuthContext from "../login/AuthContext";
import { LOGOUT_MUTATION } from "../login/loginRequests";
import { useSideMenu } from "../project/SideMenuProvider";

const AppHeaderWrapper = styled.header`
  padding: 0.5rem 0;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

const Logo = styled(LogoSVG)`
  display: none;
  fill: ${props => props.theme.colors.primary};
  margin-right: auto;
  transform: translateY(-4px);

  ${mq("medium")} {
    display: inline-block;
  }
`;

const OpenSideMenu = styled.button`
  margin-right: auto;
  background: transparent;
  border: none;
  padding: 0;
  font-size: 1.25rem;

  ${mq("medium")} {
    display: none;
  }
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
  const { setSideMenuOpen } = useSideMenu();

  return (
    <AppHeaderWrapper data-testid="app-header">
      <Container
        style={{
          display: "flex",
          justifyContent: "flex-start"
        }}
      >
        <Logo />
        <OpenSideMenu
          onClick={() => {
            setSideMenuOpen(true);
          }}
        >
          &#9776;
        </OpenSideMenu>

        <Link to="/settings">Settings</Link>
        <LogOutButton />
      </Container>
    </AppHeaderWrapper>
  );
};

export default AppHeader;
