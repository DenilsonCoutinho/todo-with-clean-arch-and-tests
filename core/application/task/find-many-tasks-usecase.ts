import { ItaskRepository } from "@/core/domain/tasks/task-repository";

export class FindManyTasksUseCase {
  constructor(private repository: ItaskRepository) {}

  async execute() {
   return await this.repository.findMany();
  }
}
