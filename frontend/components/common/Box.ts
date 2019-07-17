import styled from "@emotion/styled";

interface Props {
  centered: Boolean;
}

const Box = styled.div<Props>`
  padding: 1.5rem;
  box-shadow: 0 0.125rem 0.125rem rgba(0, 0, 0, 0.1),
    0 0 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  background: white;
  width: 100%;
  max-width: 600px;
  ${props => props.centered && `text-align: center;`}
`;

export default Box;
