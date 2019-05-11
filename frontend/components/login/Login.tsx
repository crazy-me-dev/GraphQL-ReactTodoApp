import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import GoogleLogin from "react-google-login";

const GOOGLE_AUTH_KEY = process.env.GOOGLE_AUTH_KEY;

const LOGIN_WITH_GOOGLE_MUTATION = gql`
  mutation LOGIN_WITH_GOOGLE_MUTATION($token: String!) {
    loginWithGoogle(id_token: $token) {
      id
      name
      email
    }
  }
`;

const Login = ({ refetchQueries, onComplete }) => (
  <React.Fragment>
    <h2>Log in</h2>
    <Mutation
      mutation={LOGIN_WITH_GOOGLE_MUTATION}
      refetchQueries={refetchQueries}
    >
      {(login, { error, loading }) => {
        return (
          <GoogleLogin
            clientId={GOOGLE_AUTH_KEY}
            buttonText="Log in with Google Account"
            onSuccess={e => onComplete(e, login)}
            onFailure={onComplete}
            cookiePolicy={"single_host_origin"}
          />
        );
      }}
    </Mutation>
  </React.Fragment>
);

export default Login;
export { LOGIN_WITH_GOOGLE_MUTATION };
