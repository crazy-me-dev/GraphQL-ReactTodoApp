import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as NotFoundSVG } from "../assets/not-found-illustration.svg";
import styled, { color } from "../config/styles";
import { Container } from "../components/common";

const PageNotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container data-testid="page-404">
      <Center>
        <Heading>{t("notFound.title")}</Heading>
        <Illustration />
        <HomeLink to="/">{t("notFound.button")}</HomeLink>
      </Center>
    </Container>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Heading = styled.h1`
  margin-bottom: 3rem;
`;

const Illustration = styled(NotFoundSVG)`
  color: ${color("primary")};
  max-width: 400px;
  height: auto;
`;

const HomeLink = styled(Link)`
  margin-top: 3rem;
  font-size: 1.5rem;
  color: ${color("primary")};
  border-bottom: 0.1em solid ${color("primary")};
  text-decoration: none;
`;

export default PageNotFoundPage;
