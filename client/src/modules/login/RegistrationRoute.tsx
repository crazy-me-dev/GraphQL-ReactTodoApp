import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import AuthContext from "./AuthContext";
import { Button, Spinner, Logo, Text } from "../common";
import { Form, FormItem, TextField, Checkbox } from "../common/form";
import { useRegisterNewUserMutation } from "./login.requests";
import LoginBox from "./LoginBox";

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
      <LoginBox>
        <Spinner />
      </LoginBox>
    );
  }

  return (
    <LoginBox>
      <Logo hasName centered />

      <Text centered>Create a brand new account</Text>

      <br />

      <Form onSubmit={handleFormSubmit}>
        <FormItem label="Email">
          <TextField
            placeholder="john@doe.com"
            value={fields.email}
            name="email"
            onChange={handleInputChange}
          />
        </FormItem>

        <FormItem label="Name">
          <TextField
            placeholder="John Doe"
            value={fields.name}
            name="name"
            onChange={handleInputChange}
          />
        </FormItem>

        <FormItem label="Password">
          <TextField
            type="password"
            value={fields.password}
            name="password"
            onChange={handleInputChange}
          />
        </FormItem>

        <FormItem>
          <Checkbox
            checked={termsAccepted}
            onChange={e => {
              setTermsAccepted(e.currentTarget.checked);
            }}
          >
            I accept <Link to="terms">the terms</Link>
          </Checkbox>
        </FormItem>

        <Button filled fullWidth>
          Sign in
        </Button>

        <hr />

        <Text centered>
          Or just <Link to="/login">log in</Link>
        </Text>
      </Form>
    </LoginBox>
  );
};

export default RegistrationRoute;
