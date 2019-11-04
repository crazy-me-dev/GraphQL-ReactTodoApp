import React from "react";

import styled, { mq } from "../../config/styles";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
`;

const Box = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 4px;
  min-height: 350px;
  width: 350px;
  ${mq("medium")} {
    margin-top: 10vh;
  }
`;

const LoginBox: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Box>{children}</Box>
    </Wrapper>
  );
};

export default LoginBox;
