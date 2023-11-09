export type Todo = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  complete: boolean;
  project: string;
};

export type Project = {
  _id: string;
  name: string;
};
