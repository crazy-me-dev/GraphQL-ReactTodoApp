import React from "react";

import styled, { color } from "../../../config/styles";
import { ReactComponent as CheckSVG } from "../../../assets/check.svg";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Wrapper = styled.label`
  position: relative;
  display: flex;
`;

const CheckboxInput = styled.input`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: -1;
  opacity: 0;

  &:checked + span {
    background: ${color("primary")};
    border-color: ${color("primary")};
  }
  &:focus + span {
    border-color: transparent;
    box-shadow: 0 0 0 0.2rem ${color("primaryShade")};
  }
`;

const CheckboxText = styled.span`
  margin-left: 1rem;
`;

const CheckboxHelper = styled.span`
  transition: all 0.2s;
  position: relative;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
`;

const CheckIcon = styled(CheckSVG)`
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: ${color("background")};
`;

const Checkbox = ({ children, ...rest }: Props) => {
  return (
    <Wrapper>
      <CheckboxInput type="checkbox" {...rest} />
      <CheckboxHelper>
        <CheckIcon />
      </CheckboxHelper>
      {children && <CheckboxText>{children}</CheckboxText>}
    </Wrapper>
  );
};

export default Checkbox;
