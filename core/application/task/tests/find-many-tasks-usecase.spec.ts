import { beforeEach, describe, expect, it } from "vitest";
import { FindManyTasksUseCase } from "../find-many-tasks-usecase";
import { InMemoryTaskRepository } from "./in-memory-task-repository";

let repository: InMemoryTaskRepository;
let findManyTasks: FindManyTasksUseCase;

beforeEach(() => {
  repository = new InMemoryTaskRepository();
  findManyTasks = new FindManyTasksUseCase(repository);
});

describe("FindManyTasksUseCase", () => {
  it("deve retornar uma lista vazia quando nao houver tasks", async () => {
    const tasks = await findManyTasks.execute();

    expect(tasks).toEqual([]);
  });

  it("deve listar todas as tasks criadas", async () => {
    await repository.createTask("Estudar testes");
    await repository.createTask("Revisar UI");

    const tasks = await findManyTasks.execute();

    expect(tasks).toEqual([
      {
        id: 1,
        description: "Estudar testes",
        done: false,
      },
      {
        id: 2,
        description: "Revisar UI",
        done: false,
      },
    ]);
  });
});
