import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const DELETE_TASK_MUTATION = gql`
  mutation($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

interface Props {
  children: Function;
}

const DeleteTask = (props: Props) => {
  const payload = useMutation(DELETE_TASK_MUTATION);
  return props.children(payload);
};

export default DeleteTask;
export { DELETE_TASK_MUTATION };
