import { Button } from '@mui/material';

import type { Todo } from '../../api/todos';

import { useAddTodo, useTodos } from '../../queries/todos';

export const Todos = () => {
  const { data: query } = useTodos();
  const mutation = useAddTodo();

  return (
    <div>
      <ul>
        {query?.todos?.map((todo: Todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>

      <Button
        onClick={() => {
          mutation.mutate({
            completed: false,
            todo: 'Do Laundry',
            userId: 5,
          });
        }}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default Todos;