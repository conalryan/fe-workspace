import type { Todo } from './types';

export const getTodos = async (): Promise<{ todos: Todo[] }> => {
  const response = await fetch('https://dummyjson.com/todos');
  return response.json();
};

export const postTodo = async (newTodo: {
  completed: boolean;
  todo: string;
  userId: number;
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
