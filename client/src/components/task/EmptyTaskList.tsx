import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as StartSVG } from "../../assets/start-illustration.svg";
import styled, { color } from "../../config/styles";

const EmptyTaskList = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <IllustrationContainer>
        <Illustration />
        <Quote>
          “The journey of a thousand miles begins with one step”
          <Cite>- Lao Tzu</Cite>
        </Quote>
      </IllustrationContainer>
      <Instructions>{t("task.startText")}</Instructions>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const IllustrationContainer = styled.div`
  max-width: 300px;
  margin: 2rem auto;
`;

const Illustration = styled(StartSVG)`
  color: ${color("primary")};
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const Quote = styled.blockquote`
  zoom: 1;
  font-size: 1rem;
  opacity: 0.7;
  margin: 0;
`;

const Cite = styled.cite`
  display: block;
  font-weight: bold;
`;

const Instructions = styled.p`
  text-align: center;
  margin: 4rem 0 2rem 0;
  font-size: 1.5rem;
`;

export default EmptyTaskList;
