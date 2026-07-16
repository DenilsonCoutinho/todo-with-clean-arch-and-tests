import { InMemoryTaskRepository } from "./in-memory-task-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { UpdateTaskDescriptionUseCase } from "../update-description-task-usecase";

let repository: InMemoryTaskRepository;
let updateDescriptionTask: UpdateTaskDescriptionUseCase;

beforeEach(() => {
  repository = new InMemoryTaskRepository();
  updateDescriptionTask = new UpdateTaskDescriptionUseCase(repository);
});

describe("Deve atualizar descrição da task", () => {
  it("atualiza descrição da task", async () => {
    await repository.createTask("Estudar");
    await updateDescriptionTask.execute(1, "Salvar a inglaterra!");
    const findTask = await repository.findMany();
    
    expect(findTask![0]).toEqual({
      id: 1,
      description: "Salvar a inglaterra!",
      done:false
    });
  });
});
