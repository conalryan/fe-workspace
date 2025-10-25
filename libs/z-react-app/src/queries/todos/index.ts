import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getTodos, postTodo } from '@/api/todos';

export const useTodos = () => useQuery({ queryFn: getTodos, queryKey: ['todos'] });

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
