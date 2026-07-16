import { ItaskRepository } from "@/core/domain/tasks/task-repository";
import sanitizeStr from "@/utils/sanitizeStr";
type Input = {
  description: string;
};
export class CreateTaskUseCase {
  constructor(private repository: ItaskRepository) {}

  async execute(input: Input) {
    const description = sanitizeStr(input.description);
    if (!description) {
      throw new Error("A descrição da task é obrigatória.");
    }
   
    await this.repository.createTask(description);
  }
}
