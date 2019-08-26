import styled from "@emotion/styled";

type Align = "left" | "center" | "right";

interface Props {
  children: React.ReactNode;
  align: Align;
}

const aligns = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};

const Wrapper = styled.div<Props>`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: ${props =>
    props.align ? aligns[props.align] : "flex-start"};
`;

const TopPanel = (props: Props) => (
  <Wrapper {...props}>{props.children}</Wrapper>
);

export default TopPanel;
