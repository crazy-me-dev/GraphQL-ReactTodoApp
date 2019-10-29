import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import styled from "../../config/styles";
import AuthContext from "./AuthContext";
import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import { Input, Button, Spinner } from "../common";
import { useRegisterNewUserMutation } from "./login.requests";

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

const fieldsDefaultState = {
  email: "",
  name: "",
  password: ""
};

const RegistrationRoute = () => {
  const registerNewUser = useRegisterNewUserMutation();
  const [fields, setFields] = useState(fieldsDefaultState);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [hasLoader, setHasLoader] = useState(false);
  const { user, loading } = useContext(AuthContext);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerNewUser({ ...fields, termsAccepted });
    setFields(fieldsDefaultState);
    setTermsAccepted(false);
    setHasLoader(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newFields = { ...fields };
    const index = e.target.name as keyof typeof fields;
    newFields[index] = e.target.value;
    setFields(newFields);
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

        <form onSubmit={handleFormSubmit}>
          <label>
            <div>Email</div>
            <Input
              placeholder="john@doe.com"
              value={fields.email}
              name="email"
              onChange={handleInputChange}
            />
          </label>

          <label>
            <div>Name</div>
            <Input
              placeholder="John Doe"
              value={fields.name}
              name="name"
              onChange={handleInputChange}
            />
          </label>

          <label>
            <div>Password</div>
            <Input
              type="password"
              value={fields.password}
              name="password"
              onChange={handleInputChange}
            />
          </label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={e => {
                  setTermsAccepted(e.currentTarget.checked);
                }}
              />{" "}
              <Link to="terms">I accept the terms</Link>
            </label>
          </div>

          <Button>Sign in</Button>

          <p>
            Or just <Link to="/login">log in</Link>
          </p>
        </form>
      </Box>
    </Wrapper>
  );
};

export default RegistrationRoute;
