import React from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import styled from "@emotion/styled";
import { ReactComponent as LogoSVG } from "../assets/logo.svg";

import AuthContext from "./AuthContext";
import { ME_QUERY } from "./loginRequests";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Box = styled.div`
  padding: 4rem 2rem;
  border-radius: 4px;
  min-height: 350px;
  width: 350px;
  box-shadow: 0 0.1rem 0.6rem rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LOGIN_WITH_GOOGLE_MUTATION = gql`
  mutation LoginWithGoogle($id_token: String!) {
    loginWithGoogle(id_token: $id_token) {
      id
      name
    }
  }
`;

const GOOGLE_AUTH_KEY = process.env.REACT_APP_GOOGLE_AUTH_KEY
  ? process.env.REACT_APP_GOOGLE_AUTH_KEY
  : "";

const LoginRoute: React.FC<RouteComponentProps> = props => {
  const [loginWithGoogle] = useMutation<{}, { id_token: string }>(
    LOGIN_WITH_GOOGLE_MUTATION
  );

  const responseGoogle = (
    e: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("getAuthResponse" in e) {
      const id_token = e.getAuthResponse().id_token;
      loginWithGoogle({
        variables: {
          id_token
        },
        refetchQueries: [{ query: ME_QUERY }]
      });
    }
  };
  return (
    <AuthContext.Consumer>
      {({ user }) => {
        if (user) return <Redirect to="/" noThrow={true} />;
        return (
          <Wrapper>
            <Box>
              <LogoSVG style={{ fill: "tomato" }} />
              <GoogleLogin
                clientId={GOOGLE_AUTH_KEY}
                buttonText={"Login with Google"}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Box>
          </Wrapper>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default LoginRoute;
