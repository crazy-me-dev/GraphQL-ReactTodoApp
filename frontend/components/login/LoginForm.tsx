import React from "react";
import styled from "@emotion/styled";

import Login from "./Login";
import Logout from "./Logout";
import Me, { ME_QUERY } from "./Me";
import { Box } from "../common";
import RedirectAfterAuth from "./RedirectAfterAuth";

const FormWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type User = {
  id: String;
  name: String;
  email: String;
};

interface MeData {
  me: User;
}

const LoginForm = () => {
  const responseGoogle = (e: any, login: Function) => {
    login({ variables: { token: e.tokenId } });
  };

  return (
    <RedirectAfterAuth to="/dashboard">
      <FormWrapper>
        <Box centered>
          <Me>
            {({ data, error, loading, refetch }) => {
              const me = data ? data.me : null;

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
