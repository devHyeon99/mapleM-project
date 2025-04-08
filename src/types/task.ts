import { TaskCategory } from './enums';

export interface Task {
  name: string;
  do: boolean;
}

export type TaskData = Record<TaskCategory, Task[]>;
