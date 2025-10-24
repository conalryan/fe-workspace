import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export const getTodos = async (): Promise<{ todos: Todo[] }> => {
  const response = await fetch('https://dummyjson.com/todos');
  return response.json();
};

export const postTodo = async (newTodo: {
  id: number;
  todo: string;
}): Promise<Todo> => {
  const response = await fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  return response.json();
};

export const Todos = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data: query } = useQuery({ queryKey: ['todos'], queryFn: getTodos });
  console.log('Todos', query);
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
