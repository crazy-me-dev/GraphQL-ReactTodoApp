import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useTranslation } from "react-i18next";

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

const FirstItemContainer = styled.div`
  margin-right: auto;
`;

const Logo = styled(LogoSVG)`
  display: none;
  fill: ${props => props.theme.colors.primary};

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
  const { user, refetchUser } = useContext(AuthContext);
  const { t } = useTranslation();

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
      data-testid="logout-button"
    >
      {t("common.logout")}
    </Button>
  );
};

const AppHeader: React.FC = props => {
  const { setSideMenuOpen } = useSideMenu();
  const { t } = useTranslation();

  return (
    <AppHeaderWrapper data-testid="app-header">
      <Container
        style={{
          display: "flex",
          justifyContent: "flex-start"
        }}
      >
        <FirstItemContainer>
          {props.children || (
            <>
              <Link to="/">
                <Logo data-testid="logo" />
              </Link>
              <OpenSideMenu
                onClick={() => {
                  setSideMenuOpen(true);
                }}
                data-testid="open-side-menu"
              >
                &#9776;
              </OpenSideMenu>
            </>
          )}
        </FirstItemContainer>

        <Link to="/settings">{t("settings.title")}</Link>
        <LogOutButton />
      </Container>
    </AppHeaderWrapper>
  );
};

export default AppHeader;
