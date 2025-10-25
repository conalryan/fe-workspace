import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getTodos, postTodo } from './api/todos';

export const Todos = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data: query } = useQuery({ queryFn: getTodos, queryKey: ['todos'] });
  console.info('Todos', query);
  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div>
      <ul>
        {query?.todos?.map((todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            todo: 'Do Laundry',
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
};
