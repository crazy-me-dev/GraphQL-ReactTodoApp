import React from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import AuthContext from "./AuthContext";
import { ME_QUERY } from "./loginRequests";

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
          <div>
            <GoogleLogin
              clientId={GOOGLE_AUTH_KEY}
              buttonText={"Login with Google"}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default LoginRoute;
