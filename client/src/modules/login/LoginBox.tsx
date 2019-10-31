import React from "react";

import styled from "../../config/styles";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Box = styled.div`
  padding: 1.5rem;
  border-radius: 4px;
  min-height: 350px;
  width: 350px;
`;

const LoginBox: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Box>{children}</Box>
    </Wrapper>
  );
};

export default LoginBox;
