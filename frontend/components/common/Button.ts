import styled from "@emotion/styled";

interface Props {
  hello: string;
}

const Button = styled.button<Props>`
  transition: all 0.2s;
  padding: 0.5rem 1rem;
  border: none;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 0.25rem;
  &:hover {
    cursor: pointer;
    background-color: grey;
  }
`;

export default Button;
