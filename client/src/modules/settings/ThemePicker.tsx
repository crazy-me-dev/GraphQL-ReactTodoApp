import React from "react";
import { css } from "@emotion/core";
import { useTranslation } from "react-i18next";

import { Title } from "../common";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import styled from "../../config/styles";
import { useTheme, ThemeId } from "./ThemeProvider";

const ThemeSelectList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ThemeSelectButtonWrapper = styled.div`
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin-right: 1rem;
  border: 4px solid transparent;
  padding: 0.5rem;
`;

const ThemeSelectButton = styled.button<{ selected: boolean }>`
  transition: inherit;
  border: 2px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  display: flex;
  min-width: 150px;
  &:focus,
  &:hover {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  ${props =>
    props.selected &&
    css`
      transform: scale(1.1);
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
      border-color: ${props.theme.colors.primary};
    `}
`;

const Logo = styled(LogoSVG)`
  fill: ${props => props.theme.colors.primary};
  margin-right: auto;
  transform: translateY(-4px);
  margin-right: 1rem;
`;

const ThemeTitle = styled(Title.H3)`
  margin-bottom: 0;
`;

const ThemePicker: React.FC = () => {
  const { currentTheme, setTheme, themes } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <p data-testid={`currenttheme:${currentTheme.name}`}>
        {t("settings.currentTheme", {
          theme: `${currentTheme.name}`
        })}
      </p>
      <ThemeSelectList>
        {(Object.keys(themes) as Array<ThemeId>).map(themeId => {
          const theme = themes[themeId];
          return (
            <ThemeSelectButtonWrapper key={themeId}>
              <ThemeSelectButton
                selected={currentTheme.id === theme.id}
                theme={theme}
                onClick={() => {
                  setTheme(themeId);
                }}
                data-testid={`selectthemebutton-${themeId}`}
              >
                <Logo theme={theme} />
                <ThemeTitle theme={theme}>{theme.name}</ThemeTitle>
              </ThemeSelectButton>
            </ThemeSelectButtonWrapper>
          );
        })}
      </ThemeSelectList>
    </>
  );
};

export default ThemePicker;
