import React from "react";
import styled from "@emotion/styled";

import Login from "./Login";
import Me, { ME_QUERY, IMeQueryResult } from "./Me";
import { Box } from "../common";
import RedirectAfterAuth from "./RedirectAfterAuth";

const FormWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginForm = () => {
  const responseGoogle = (e: any, login: Function) => {
    login({ variables: { token: e.tokenId } });
  };

  return (
    <RedirectAfterAuth to="/dashboard">
      <FormWrapper>
        <Box centered>
          <Me>
            {({ error, loading }: IMeQueryResult) => {
              if (loading) return <p>...</p>;
              if (error) {
                return (
                  <div>
                    <p>{error.message}</p>
                    <Login
                      onComplete={responseGoogle}
                      refetchQueries={[{ query: ME_QUERY }]}
                    />
                  </div>
                );
              }
              return (
                <Login
                  onComplete={responseGoogle}
                  refetchQueries={[{ query: ME_QUERY }]}
                />
              );
            }}
          </Me>
        </Box>
      </FormWrapper>
    </RedirectAfterAuth>
  );
};

export default LoginForm;
