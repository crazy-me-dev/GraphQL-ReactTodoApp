import { css } from "@emotion/core";

import styled from "../../config/styles";

const defaultHeadingSettings = css`
  margin: 0 0 1rem 0;
`;

export const H1 = styled.h1`
  ${defaultHeadingSettings};
`;

export const H2 = styled.h2`
  ${defaultHeadingSettings};
`;

export default {
  H1,
  H2
};
