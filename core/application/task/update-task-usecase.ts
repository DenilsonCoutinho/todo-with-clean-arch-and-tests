import { ItaskRepository } from "@/core/domain/tasks/task-repository";

export class UpdateTaskUseCase {
  constructor(private repository: ItaskRepository) {}

  async execute(id: number, isCheckd: boolean) {
    return this.repository.updateTask(id, isCheckd);
  }
}
