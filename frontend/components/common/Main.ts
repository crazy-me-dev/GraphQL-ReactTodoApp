import styled from "@emotion/styled";

const Main = styled.div`
  flex: 1;
  padding: ${props => props.theme.padding * 2}rem;
  margin-left: ${props => props.theme.sidebarWidth};
`;

export default Main;
