import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const DELETE_PROJECT_MUTATION = gql`
  mutation($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }
`;

interface Props {
  children: Function;
}

const deleteProject = (props: Props) => {
  const payload = useMutation(DELETE_PROJECT_MUTATION);
  return props.children(payload);
};

export default deleteProject;
export { DELETE_PROJECT_MUTATION };
