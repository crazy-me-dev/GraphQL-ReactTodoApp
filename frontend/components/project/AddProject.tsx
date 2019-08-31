import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_PROJECT_MUTATION = gql`
  mutation($name: String!) {
    createProject(name: $name) {
      id
      name
    }
  }
`;

interface Props {
  children: Function;
}

const AddProject = (props: Props) => {
  const payload = useMutation(ADD_PROJECT_MUTATION);
  return props.children(payload);
};

export default AddProject;
export { ADD_PROJECT_MUTATION };
