import React from "react";

import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import styled from "../../config/styles";

interface LogoProps {
  hasName?: boolean;
  hasPadding?: boolean;
  isCentered?: boolean;
}

const LogoWrapper = styled.div<LogoProps>`
  display: flex;
  align-items: center;
  padding: ${props => (props.hasPadding ? "0 0 4rem 0" : "0")};
  margin: ${props => (props.isCentered ? "0 auto" : "0")};
`;

const LogoIcon = styled(LogoSVG)`
  display: inline-block;
  fill: ${props => props.theme.colors.primary};
  width: 2.5rem;
  height: 2.5rem;
  transform: translateY(-0.25rem);
`;

const AppName = styled.span`
  font-weight: 900;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  letter-spacing: 0.04em;
  color: ${props => props.theme.colors.text};
`;

const Logo: React.FC<LogoProps> = ({ hasName, hasPadding }) => {
  return (
    <LogoWrapper hasPadding isCentered>
      <LogoIcon />
      {hasName && <AppName>Check!t</AppName>}
    </LogoWrapper>
  );
};

export default Logo;
