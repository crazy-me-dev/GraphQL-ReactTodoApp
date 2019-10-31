import React from "react";
import { css } from "@emotion/core";

import styled from "../../config/styles";

interface Props {
  centered?: boolean;
}

const Wrapper = styled.p<Props>`
  ${props =>
    props.centered &&
    css`
      text-align: center;
    `}
`;

const Text: React.FC<Props> = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default Text;
