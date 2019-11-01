import { css } from "@emotion/core";
import styled, { color } from "../../config/styles";

interface Props {
  filled?: boolean;
  fullWidth?: boolean;
}

const Button = styled.button<Props>`
  font-weight: bold;
  letter-spacing: 0.04em;
  transition: all 0.2s;
  color: ${color("primary")};
  background: transparent;
  border: 1px solid ${color("primary")};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 0 0 ${color("primary")};

  &:hover {
    background: ${color("primary")};
    color: white;
  }

  ${props =>
    props.filled &&
    css`
      color: white;
      background-color: ${props.theme.colors.primary};
    `}

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      &:hover,
      &:focus {
        box-shadow: 0 0 0 0.2rem ${props.theme.colors.primary};
      }
    `}
`;

export default Button;
