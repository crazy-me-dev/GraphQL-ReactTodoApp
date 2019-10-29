import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styled from "../../config/styles";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import AuthContext from "./AuthContext";
import {
  useLoginWithGoogleMutation,
  useLoginWithCredentialsMutation
} from "./login.requests";
import { Spinner, Input, Button } from "../common";

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
      <Wrapper>
        <Box>
          <Spinner />
        </Box>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Box>
        <LogoSVG style={{ fill: "tomato" }} />

        <form onSubmit={handleLogin}>
          <label>
            <div>email</div>
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </label>

          <label>
            <div>password</div>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <div>
            <Button>Log in</Button>
          </div>
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
      </Box>
    </Wrapper>
  );
};

export default LoginRoute;
