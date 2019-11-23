import React from "react";
import { keyframes } from "@emotion/core";

import styled, { color } from "../../config/styles";

interface Props {
  isCentered?: boolean;
}

const Spinner: React.FC<Props> = () => {
  return (
    <Wrapper isCentered>
      <SpinnerDot />
      <SpinnerDot />
      <SpinnerDot />
    </Wrapper>
  );
};

const bounce = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1) translateY(-.4rem);
  }

  10%, 90% {
    opacity: 1;
  }

  50% {
    transform: scale(1) translateY(.4rem);
  }
`;

const Wrapper = styled.div<Props>`
  padding: 2rem;
  display: flex;
  justify-content: center;
  margin: ${props => (props.isCentered ? "0 auto" : "0")};
`;

const SpinnerDot = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0.25rem;
  background: ${color("primary")};
  border-radius: 50%;
  &:nth-of-type(1) {
    animation: ${bounce} 1.2s -0.5s ease infinite;
  }
  &:nth-of-type(2) {
    animation: ${bounce} 1.2s -0.3s ease infinite;
  }
  &:nth-of-type(3) {
    animation: ${bounce} 1.2s -0.1s ease infinite;
  }
`;

export default Spinner;
