import { ItaskRepository } from "@/core/domain/tasks/task-repository";
type Input = {
  task: string;
};
export class CreateTaskUseCase {
  constructor(private repository: ItaskRepository) {}

  async execute(input: Input) {
    await this.repository.createTask(input.task);
  }
}
