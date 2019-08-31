import styled from "@emotion/styled";

interface MainContainerProps {
  flex: boolean;
}

const MainContainer = styled.div<MainContainerProps>`
  max-width: ${props => props.theme.wideWidth};
  margin: 0 auto;
  ${props => (props.flex ? "display: flex;" : "")};
  min-height: 50vh;
`;

export default MainContainer;
