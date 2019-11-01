import React from "react";
import { css } from "@emotion/core";

import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import styled, { color } from "../../config/styles";

interface LogoProps {
  hasName?: boolean;
  centered?: boolean;
}

const LogoWrapper = styled.div<LogoProps>`
  display: flex;
  align-items: center;
  ${props =>
    props.centered &&
    css`
      display: flex;
      justify-content: center;
    `};
`;

const LogoIcon = styled(LogoSVG)`
  display: inline-block;
  fill: ${color("primary")};
  width: 2.5rem;
  height: 2.5rem;
  transform: translateY(-0.25rem);
`;

const AppName = styled.span`
  font-weight: 900;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  letter-spacing: 0.04em;
  color: ${color("text")};
`;

const Logo: React.FC<LogoProps> = ({ hasName }) => {
  return (
    <LogoWrapper centered>
      <LogoIcon />
      {hasName && <AppName>Check!t</AppName>}
    </LogoWrapper>
  );
};

export default Logo;
