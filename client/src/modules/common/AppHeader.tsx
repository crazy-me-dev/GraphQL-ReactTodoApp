import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/core";

import styled, { mq, color, Theme } from "../../config/styles";
import { Container, SROnly } from "../common";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import { ReactComponent as ThreeDotsSVG } from "../../assets/three-dots.svg";
import { useSideMenu } from "../project/SideMenuProvider";
import useLogOut from "../login/useLogOut";

const AppHeader: React.FC = props => {
  const { setSideMenuOpen } = useSideMenu();
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const { logOut } = useLogOut();

  return (
    <AppHeaderWrapper data-testid="app-header">
      <Container>
        <AppHeaderContainter>
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

          <MenuContainer>
            <MenuToggle
              onClick={() => {
                setShowMenu(showMenu => !showMenu);
              }}
            >
              <MenuIcon />
              <SROnly>{t("common.menu")}</SROnly>
            </MenuToggle>
            <Menu show={showMenu}>
              <MenuItemLink to="/settings">{t("settings.title")}</MenuItemLink>
              <MenuDivider />
              <MenuItemButton
                data-testid="logout-button"
                onClick={() => logOut()}
              >
                {t("common.logout")}
              </MenuItemButton>
            </Menu>
          </MenuContainer>
        </AppHeaderContainter>
      </Container>
    </AppHeaderWrapper>
  );
};

const AppHeaderWrapper = styled.header`
  padding: 0.5rem 0;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

const AppHeaderContainter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const MenuIcon = styled(ThreeDotsSVG)`
  fill: currentColor;
  height: 24px;
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

const MenuContainer = styled.div`
  position: relative;
`;

const MenuToggle = styled.button`
  transition: all 0.2s;
  border: none;
  background: transparent;
  line-height: 1;
  transform: translateY(2px);
  &:hover {
    color: ${color("primary")};
  }
`;

const Menu = styled.nav<{ show: boolean }>`
  transition: all 0.2s;
  background: ${color("background")};
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  padding: 0.5rem 1rem;
  border: 1px solid ${color("border")};
  border-radius: 0.25rem;
  min-width: 160px;

  opacity: 0;
  transform: translateY(1rem);
  pointer-events: none;

  ${props =>
    props.show &&
    css`
      pointer-events: auto;
      opacity: 1;
      transform: translateY(0);
    `}}
`;

const MenuItem = (props: { theme: Theme }) => css`
  display: block;
  margin: 0.5rem 0;
  text-decoration: none;
  border: none;
  padding: 0;
  background: transparent;
  color: ${props.theme.colors.text};
  cursor: pointer;

  &:hover {
    color: ${props.theme.colors.primary};
  }
`;

const MenuItemLink = styled(Link)`
  ${MenuItem}
`;

const MenuItemButton = styled.button`
  ${MenuItem}
`;

const MenuDivider = styled.hr`
  margin: 0.5rem 0;
  border: none;
  border-top: 1px solid ${color("border")};
`;

export default AppHeader;
