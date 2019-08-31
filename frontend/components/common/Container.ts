import styled from "@emotion/styled";

interface ContainerProps {
  flex?: boolean;
}

const Container = styled.div<ContainerProps>`
  max-width: ${props => props.theme.wideWidth};
  width: 100%;
  margin: 0 auto;
  ${props => (props.flex ? "display: flex;" : "")};
`;

export default Container;
