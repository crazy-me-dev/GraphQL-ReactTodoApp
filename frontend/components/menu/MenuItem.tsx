import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.li<Props>`
  padding: 1px;
`;

const MenuItem = (props: Props) => (
  <Wrapper>
    <a>{props.children}</a>
  </Wrapper>
);

export default MenuItem;
