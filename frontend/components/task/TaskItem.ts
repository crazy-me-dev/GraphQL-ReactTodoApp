import { Button } from "../common";

export default ({ task, onDelete }) => (
  <li key={task.id}>
    {task.description}
    <Button onClick={onDelete}>&times;</Button>
  </li>
);
