// app/types/task.ts
export type TaskType = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  important: boolean;
};
