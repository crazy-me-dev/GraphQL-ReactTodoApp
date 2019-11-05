import { css } from "@emotion/core";

import styled from "../../config/styles";

interface Props {
  centered?: boolean;
}

const defaultHeadingSettings = css`
  margin: 0 0 1rem 0;
`;

const H1 = styled.h1<Props>`
  ${defaultHeadingSettings};
  font-size: 2rem;
  ${props => (props.centered ? "text-align: center;" : "")}
`;

const H2 = styled.h2<Props>`
  ${defaultHeadingSettings};
  font-size: 1.5rem;
  ${props => (props.centered ? "text-align: center;" : "")}
`;

const H3 = styled.h2<Props>`
  ${defaultHeadingSettings};
  font-size: 1.25rem;
  ${props => (props.centered ? "text-align: center;" : "")}
`;

export default {
  H1,
  H2,
  H3
};
