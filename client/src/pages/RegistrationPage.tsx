import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthContext from "../components/login/AuthContext";
import { Button, Spinner, Logo, Text, Error } from "../components/common";
import { Form, FormItem, TextField, Checkbox } from "../components/common/form";
import { useRegisterNewUserMutation } from "../components/login/login.requests";
import LoginBox from "../components/login/LoginBox";
import parseGraphQLError from "../utils/parseGraphQLError";

const fieldsDefaultState = {
  email: "",
  name: "",
  password: ""
};

const RegistrationPage = () => {
  const [error, setError] = useState<string>();
  const registerNewUser = useRegisterNewUserMutation();
  const [fields, setFields] = useState(fieldsDefaultState);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [hasLoader, setHasLoader] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const { t } = useTranslation();

  const notFilled =
    !termsAccepted || !fields.email || !fields.name || !fields.password;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerNewUser({ ...fields, termsAccepted });
      setFields(fieldsDefaultState);
      setTermsAccepted(false);
      setHasLoader(true);
    } catch (e) {
      setError(parseGraphQLError(e.message));
    }
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

      <Text centered>{t("registration.title")}</Text>

      <br />

      {error && (
        <>
          <Error>{t(`error.${error}`)}</Error>
          <br />
        </>
      )}

      <Form onSubmit={handleFormSubmit}>
        <FormItem label={t("common.email")}>
          <TextField
            placeholder={t("common.emailPlaceholder")}
            value={fields.email}
            name="email"
            onChange={handleInputChange}
          />
        </FormItem>

        <FormItem label={t("common.name")}>
          <TextField
            placeholder={t("common.namePlaceholder")}
            value={fields.name}
            name="name"
            onChange={handleInputChange}
          />
        </FormItem>

        <FormItem label={t("common.password")}>
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
            {t("registration.iAccept")}{" "}
            <Link to="terms">{t("registration.termsLinkLabel")}</Link>
          </Checkbox>
        </FormItem>

        <Button filled fullWidth disabled={notFilled}>
          {t("registration.signIn")}
        </Button>

        <hr />

        <Text centered>
          {t("registration.footer")}{" "}
          <Link to="/login">{t("registration.logInLinkLabel")}</Link>
        </Text>
      </Form>
    </LoginBox>
  );
};

export default RegistrationPage;
