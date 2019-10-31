import styled from "../../../config/styles";

const Input = styled.input`
  transition: all 0.2s;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  background-color: transparent;
  width: 100%;
  max-width: 400px;
`;

export default Input;
