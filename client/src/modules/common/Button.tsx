import styled from "../../config/styles";

const Button = styled.button`
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
`;

export default Button;
