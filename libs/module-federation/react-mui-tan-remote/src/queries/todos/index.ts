
import { useMutation, useQuery } from '@tanstack/react-query';

import { getTodos, postTodo } from '../../api/todos';
import { queryClient } from '../queryClient';

export const useTodos = () => useQuery({ queryFn: getTodos, queryKey: ['todos'] }, queryClient);

export const useAddTodo = () => useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
