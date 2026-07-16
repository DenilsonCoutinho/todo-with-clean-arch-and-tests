export type Task = {
  description: string;
  done: boolean;
  id: number;
};

export interface ItaskRepository {
  createTask(description: string): Promise<void>;
  findMany(): Promise<null | Task[]>;
  updateIsCheckedTask(id: number,isCheckd:boolean): Promise<void>;
  updateDescriptionTask(id: number,description:string): Promise<void>;
  deleteTask(id: number): Promise<void>;
}
