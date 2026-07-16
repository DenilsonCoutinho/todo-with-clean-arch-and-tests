import { ItaskRepository } from "@/core/domain/tasks/task-repository";

export class DeleterTaskUseCase {
  constructor(private repository: ItaskRepository) {}

  async execute(input: { id: number }) {
    if (!input.id) throw new Error("Tarefa não encontrada!");

    return this.repository.deleteTask(input.id);
  }
}
