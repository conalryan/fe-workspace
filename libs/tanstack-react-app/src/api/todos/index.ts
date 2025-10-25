export interface Todo {
  completed: boolean;
  id: number;
  todo: string;
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
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  return response.json();
};