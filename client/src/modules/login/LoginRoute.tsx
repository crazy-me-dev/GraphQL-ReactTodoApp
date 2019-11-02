import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import AuthContext from "./AuthContext";
import {
  useLoginWithGoogleMutation,
  useLoginWithCredentialsMutation,
  useLoginWithDemoCredentialsMutation
} from "./login.requests";
import { Spinner, Button, Logo, Text } from "../common";
import { Form, FormItem, TextField } from "../common/form";
import LoginBox from "./LoginBox";

const GOOGLE_AUTH_KEY = process.env.REACT_APP_GOOGLE_AUTH_KEY
  ? process.env.REACT_APP_GOOGLE_AUTH_KEY
  : "";

const LoginRoute: React.FC = props => {
  const loginWithGoogle = useLoginWithGoogleMutation();
  const loginWithCredentials = useLoginWithCredentialsMutation();
  const loginWithDemoCredentials = useLoginWithDemoCredentialsMutation();
  const { user, loading } = useContext(AuthContext);
  const [hasLoader, setHasLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const responseGoogle = (
    e: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("getAuthResponse" in e) {
      const id_token = e.getAuthResponse().id_token;
      setHasLoader(true);
      loginWithGoogle(id_token);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginWithCredentials({ email, password });
  };

  if (user) return <Redirect to="/" />;

  if (loading || hasLoader) {
    return (
      <LoginBox>
        <Spinner />
      </LoginBox>
    );
  }

  return (
    <LoginBox>
      <Logo hasName centered />

      <Text centered>Login in and organize your life!</Text>

      <br />

      <Form onSubmit={handleLogin}>
        <FormItem label="Email">
          <TextField value={email} onChange={e => setEmail(e.target.value)} />
        </FormItem>

        <FormItem label="Password">
          <TextField
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormItem>

        <FormItem>
          <Button filled fullWidth>
            Log in
          </Button>
        </FormItem>
      </Form>

      <Text centered>or</Text>

      <FormItem>
        <GoogleLogin
          clientId={GOOGLE_AUTH_KEY}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          data-testid="google-login"
          render={renderProps => (
            <Button
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {t("login.googleButton")}
            </Button>
          )}
        />
      </FormItem>

      <FormItem>
        <Button
          fullWidth
          onClick={() => {
            loginWithDemoCredentials();
          }}
        >
          {t("login.tryDemo")}
        </Button>
      </FormItem>

      <hr />

      <Text centered>
        Don’t have an account? <Link to="/registration">Sign in</Link>
      </Text>
    </LoginBox>
  );
};

export default LoginRoute;
