import { ItaskRepository } from "@/core/domain/tasks/task-repository";

export class UpdateTaskDescriptionUseCase {
  constructor(private repository: ItaskRepository) {}

  async execute(id: number, description: string) {
   return  this.repository.updateDescriptionTask(id, description);
  }
}
