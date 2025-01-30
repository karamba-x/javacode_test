export interface ITask {
  id: number;
  title: string;
  date: string;
  priority: 0 | 1 | 2 | 3;
  completed: boolean;
  userId: number;
}

export interface IFilterTask {
  userId: number | null,
  completed: boolean | null,
}