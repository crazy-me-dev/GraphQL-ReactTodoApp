type RefetchQueries = Array<RefetchQuery>;

interface RefetchQuery {
  query: string;
}

interface Project {
  id?: string;
  name?: string;
  tasks: Task[];
}

interface Task {
  id?: string;
  description?: string;
}
