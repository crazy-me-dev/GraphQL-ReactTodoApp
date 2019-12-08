import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import AuthContext from "../components/login/AuthContext";
import {
  useLoginWithGoogleMutation,
  useLoginWithCredentialsMutation,
  useLoginWithDemoCredentialsMutation
} from "../components/login/login.requests";
import { Spinner, Button, Logo, Text, Error } from "../components/common";
import { Form, FormItem, TextField } from "../components/common/form";
import LoginBox from "../components/login/LoginBox";
import parseGraphQLError from "../utils/parseGraphQLError";

const GOOGLE_AUTH_KEY = process.env.REACT_APP_GOOGLE_AUTH_KEY
  ? process.env.REACT_APP_GOOGLE_AUTH_KEY
  : "";

const LoginPage: React.FC = props => {
  const loginWithGoogle = useLoginWithGoogleMutation();
  const loginWithCredentials = useLoginWithCredentialsMutation();
  const loginWithDemoCredentials = useLoginWithDemoCredentialsMutation();
  const { user, loading } = useContext(AuthContext);
  const [hasLoader, setHasLoader] = useState(false);
  const [error, setError] = useState<string>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const responseGoogle = (
    e: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("getAuthResponse" in e) {
      try {
        const id_token = e.getAuthResponse().id_token;
        setHasLoader(true);
        loginWithGoogle(id_token);
      } catch (e) {
        setError(parseGraphQLError(e.message));
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setHasLoader(true);
      await loginWithCredentials({ email, password });
    } catch (e) {
      setHasLoader(false);
      setError(parseGraphQLError(e.message));
    }
  };

  const handleDemoLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await loginWithDemoCredentials();
    } catch (e) {
      setError(parseGraphQLError(e.message));
    }
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
    <main>
      <LoginBox>
        <Logo hasName centered />

        <Text centered>{t("login.slogan")}</Text>

        <br />

        {error && (
          <>
            <Error>{t(`error.${error}`)}</Error>
            <br />
          </>
        )}

        <Form onSubmit={handleLogin}>
          <FormItem label={t("common.email")}>
            <TextField value={email} onChange={e => setEmail(e.target.value)} />
          </FormItem>

          <FormItem label={t("common.password")}>
            <TextField
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormItem>

          <FormItem>
            <Button filled fullWidth disabled={!email || !password}>
              {t("login.logIn")}
            </Button>
          </FormItem>
        </Form>

        <Text centered>{t("common.or")}</Text>

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
          <Button fullWidth onClick={handleDemoLogin}>
            {t("login.tryDemo")}
          </Button>
        </FormItem>

        <hr />

        <Text centered>
          {t("login.noAccount")}{" "}
          <Link to="/registration">{t("login.signIn")}</Link>
        </Text>
      </LoginBox>
    </main>
  );
};

export default LoginPage;
