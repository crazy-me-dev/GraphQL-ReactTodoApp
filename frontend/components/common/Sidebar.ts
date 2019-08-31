import styled from "@emotion/styled";

const Sidebar = styled.div`
  width: 100%;
  max-width: ${props => props.theme.sidebarWidth};
  border-right: ${props => props.theme.border};
  position: fixed;
  top: ${props => props.theme.topPanelHeight};
  padding: ${props => props.theme.padding}rem;
  bottom: 0;
`;

export default Sidebar;
