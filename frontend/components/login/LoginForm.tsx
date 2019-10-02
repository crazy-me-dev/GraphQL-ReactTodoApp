import React from "react";
import styled from "@emotion/styled";
import Router from "next/router";

import Login from "./Login";
import { ME_QUERY } from "./Me";
import useMeQuery from "./useMeQuery";
import { Box } from "../common";

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
  console.log(this);
  const { data, error, loading } = useMeQuery();

  if (loading) return <p>...</p>;

  return (
    <FormWrapper>
      <Box centered>
        <Login
          onComplete={responseGoogle}
          refetchQueries={[{ query: ME_QUERY }]}
        />
      </Box>
    </FormWrapper>
  );
};

export default LoginForm;
