import { css } from "@emotion/core";
import styled from "../../config/styles";

interface Props {
  filled?: boolean;
}

const Button = styled.button<Props>`
  font-weight: bold;
  letter-spacing: 0.04em;
  transition: all 0.2s;
  color: ${props => props.theme.colors.primary};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  padding: 0.25rem 1rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  ${props =>
    props.filled &&
    css`
      color: white;
      background-color: ${props.theme.colors.primary};
    `}
`;

export default Button;
