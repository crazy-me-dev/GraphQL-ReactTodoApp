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
  useLoginWithCredentialsMutation
} from "./login.requests";
import { Spinner, Button, Logo } from "../common";
import { FormItem, TextField } from "../common/form";
import LoginBox from "./LoginBox";

const GOOGLE_AUTH_KEY = process.env.REACT_APP_GOOGLE_AUTH_KEY
  ? process.env.REACT_APP_GOOGLE_AUTH_KEY
  : "";

const LoginRoute: React.FC = props => {
  const loginWithGoogle = useLoginWithGoogleMutation();
  const loginWithCredentials = useLoginWithCredentialsMutation();
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
      <Logo hasName hasPadding isCentered />

      <form onSubmit={handleLogin}>
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
          <Button>Log in</Button>
        </FormItem>
      </form>

      <GoogleLogin
        clientId={GOOGLE_AUTH_KEY}
        buttonText={t("login.googleButton")}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        data-testid="google-login"
      />

      <p>
        Don’t have an account? <Link to="/registration">Sign in</Link>
      </p>
    </LoginBox>
  );
};

export default LoginRoute;
