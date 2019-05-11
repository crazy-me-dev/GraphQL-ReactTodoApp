import styled from "@emotion/styled";

interface Props {
  centered: Boolean;
}

const Box = styled.div`
  padding: 1rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  background: white;
  width: 100%;
  max-width: 600px;
  ${(props: Props) => props.centered && `text-align: center;`}
`;

export default Box;
