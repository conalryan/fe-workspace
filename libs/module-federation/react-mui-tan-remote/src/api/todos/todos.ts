import type { Todo } from './types';

export const getTodos = async () => {
  const response = await fetch('https://dummyjson.com/todos');
  return response.json();
};

export const postTodo = async (newTodo: {
  completed: boolean;
  todo: string;
  userId: number;
}): Promise<Todo> => {
  const response = await fetch('https://dummyjson.com/todos/add', {
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  return response.json();
};
