import { css } from "@emotion/core";

import styled from "../../config/styles";

const defaultHeadingSettings = css`
  margin: 0 0 1rem 0;
`;

export const H1 = styled.h1`
  ${defaultHeadingSettings};
  font-size: 2rem;
`;

export const H2 = styled.h2`
  ${defaultHeadingSettings};
  font-size: 1.5rem;
`;

export const H3 = styled.h2`
  ${defaultHeadingSettings};
  font-size: 1.25rem;
`;

export default {
  H1,
  H2,
  H3
};
