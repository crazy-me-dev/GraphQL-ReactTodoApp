import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_TASK_MUTATION = gql`
  mutation($data: TaskInput!) {
    createTask(data: $data) {
      id
      description
    }
  }
`;

interface Props {
  children: Function;
}

const AddTask = (props: Props) => {
  const payload = useMutation(ADD_TASK_MUTATION);
  return props.children(payload);
};

export default AddTask;
export { ADD_TASK_MUTATION };
