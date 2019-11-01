import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styled, { mq, color } from "../../config/styles";
import { Container } from "../common";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import { useSideMenu } from "../project/SideMenuProvider";
import LogOutButton from "../login/LogOutButton";

const AppHeaderWrapper = styled.header`
  padding: 0.5rem 0;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

const FirstItemContainer = styled.div`
  margin-right: auto;
`;

const Logo = styled(LogoSVG)`
  display: none;
  fill: ${color("primary")};

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
