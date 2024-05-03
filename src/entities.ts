export type User = {
  name: string;
};

export type Task = {
  id: string;
  title: string;
  state: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
