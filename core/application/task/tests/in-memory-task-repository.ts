import { ItaskRepository, Task } from "@/core/domain/tasks/task-repository";

export class InMemoryTaskRepository implements ItaskRepository {
  private tasks: Task[] = [];
  private id = 1;

  async createTask(description: string): Promise<void> {
    const task: Task = {
      description: description,
      id: this.id,
      done: false,
    };
    this.tasks.push(task);
    this.id++;
  }

  async deleteTask(id: number): Promise<void> {
    const findTask = this.tasks.find((e) => e.id === id);
    this.tasks = this.tasks.filter((e) => e.id !== findTask?.id);
  }

  async findMany(): Promise<null | Task[]> {
    return this.tasks;
  }
  async findTaskChecked(): Promise<null | Task> {
    return null;
  }

  async updateDescriptionTask(id: number, description: string): Promise<void> {
   this.tasks = this.tasks.map(e => {
      if (e.id === id) {
        return {
          ...e,
          description: description,
        };
      }
      return e
    });

  }

  async updateIsCheckedTask(id: number, isCheckd: boolean): Promise<void> {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: isCheckd,
        };
      }

      return task;
    });
  }
}
