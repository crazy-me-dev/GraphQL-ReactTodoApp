import styled from "@emotion/styled";

const Button = styled.button`
  transition: all 0.2s;
  padding: 0.5rem 1rem;
  border: none;
  color: white;
  background-color: orangered;
  border-radius: 1rem;
  &:hover {
    cursor: pointer;
    background-color: grey;
  }
`;

export default Button;
