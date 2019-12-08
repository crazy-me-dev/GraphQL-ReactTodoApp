import React from "react";

import styled, { color } from "../../config/styles";

const Error: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  padding: 1rem 1rem 1rem 1.5rem;
  border-left: 0.25rem solid ${color("primary")};
  color: ${color("primary")};
`;

export default Error;
