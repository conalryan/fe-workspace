import { getTodos, postTodo } from '@/api/todos';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTodos = () => {
  return useQuery({ queryKey: ['todos'], queryFn: getTodos });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
