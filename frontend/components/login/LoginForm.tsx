import React from "react";
import styled from "@emotion/styled";
import Router from "next/router";

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
  const responseGoogle = async (e: any, login: Function) => {
    try {
      await login({ variables: { token: e.tokenId } });
      Router.push("/dashboard");
    } catch (e) {
      // TODO: Tell user that login failed
    }
  };

  return (
    <RedirectAfterAuth to="/dashboard">
      <FormWrapper>
        <Box centered>
          <Me>
            {({ error, loading }: IMeQueryResult) => {
              if (loading) return <p>...</p>;
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
