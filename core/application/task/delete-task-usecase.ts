import { ItaskRepository } from "@/core/domain/tasks/task-repository";

export class DeleterTaskUseCase {
  constructor(private repository: ItaskRepository) {}

  async execute(id: number) {
    return this.repository.deleteTask(id);
  }
}
