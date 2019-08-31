import styled from "@emotion/styled";

import { Container as C } from "../common";

type Align = "left" | "center" | "right";

interface Props {
  children: React.ReactNode;
  align?: Align;
  theme?: any;
}

const aligns = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};

const Container = styled(C)<Props>`
  align-items: center;
  display: flex;
  height: ${(props: Props) => props.theme.topPanelHeight};
  justify-content: ${(props: Props) =>
    props.align ? aligns[props.align] : "flex-start"};
`;

const Wrapper = styled.div<Props>`
  background-color: ${props => props.theme.colors.panelTop};
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1), 0 0 0.25rem rgba(0, 0, 0, 0.2);
`;

const TopPanel = (props: Props) => (
  <Wrapper {...props}>
    <Container {...props}>{props.children}</Container>
  </Wrapper>
);

export default TopPanel;
