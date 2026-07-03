export type task = {
  description: string;
  done: boolean;
  id: number;
};

export interface ItaskRepository {
  createTask(task: string): Promise<void>;
  findMany(): Promise<null | task[]>;
  findTaskChecked(): Promise<null | task>;
  updateTask(id: number,isCheckd:boolean): Promise<void>;
  deleteTask(id: number): Promise<void>;
}
