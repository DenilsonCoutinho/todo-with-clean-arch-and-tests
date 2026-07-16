import { InMemoryTaskRepository } from "./in-memory-task-repository";
import { CreateTaskUseCase } from "../create-task-usecase";
import { expect, describe, it, beforeEach } from "vitest";
import { DeleterTaskUseCase } from "../delete-task-usecase";

let repository: InMemoryTaskRepository;
let deleteTask: DeleterTaskUseCase;

beforeEach(() => {
  repository = new InMemoryTaskRepository();
  deleteTask = new DeleterTaskUseCase(repository);
});

describe("Deve Deletar task", () => {
  it("Deve deletar uma task", async () => {
    await repository.createTask("Estudar");
    await deleteTask.execute({ id: 1 });

    const findTask = await repository.findMany();

    expect(findTask).toHaveLength(0);
  });

  it("Deve falhar por não haver o tipo correto do ID", async () => {
    await repository.createTask("Estudar");
    // @ts-expect-error validando com outros tipos incorretos
    const taskDelete = deleteTask.execute({ id: "" });

    await expect(taskDelete).rejects.toThrow("Tarefa não encontrada!");
  });
});
