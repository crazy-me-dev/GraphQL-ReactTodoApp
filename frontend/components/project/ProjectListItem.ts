import styled from "@emotion/styled";

const ProjectListItem = styled.li`
  padding: 0.2rem;
  display: flex;
  align-items: center;
  span {
    flex: 1;
  }
  button {
    transition: all 0.2s;
    opacity: 0;
    pointer-events: none;
    border: none;
    background: transparent;
    border-radius: 50%;
    &:hover {
      background: #eee;
    }
  }
  &:hover {
    button {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

export default ProjectListItem;
