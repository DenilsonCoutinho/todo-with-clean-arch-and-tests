import { beforeEach, describe, expect, it } from "vitest";
import { UpdateTaskUseCase } from "../update-ischecked-task-usecase";
import { InMemoryTaskRepository } from "./in-memory-task-repository";

let repository: InMemoryTaskRepository;
let updateTask: UpdateTaskUseCase;

beforeEach(() => {
  repository = new InMemoryTaskRepository();
  updateTask = new UpdateTaskUseCase(repository);
});

describe("UpdateTaskUseCase", () => {
  it("deve marcar uma task como concluida", async () => {
    await repository.createTask("Estudar testes");

    await updateTask.execute(1, true);

    const tasks = await repository.findMany();
    expect(tasks?.[0]).toEqual({
      id: 1,
      description: "Estudar testes",
      done: true,
    });
  });

  it("deve marcar uma task como pendente novamente", async () => {
    await repository.createTask("Estudar testes");
    await updateTask.execute(1, true);

    await updateTask.execute(1, false);

    const tasks = await repository.findMany();
    expect(tasks?.[0]).toEqual({
      id: 1,
      description: "Estudar testes",
      done: false,
    });
  });

  it("nao deve alterar outras tasks", async () => {
    await repository.createTask("Estudar testes");
    await repository.createTask("Revisar UI");

    await updateTask.execute(2, true);

    const tasks = await repository.findMany();
    expect(tasks).toEqual([
      {
        id: 1,
        description: "Estudar testes",
        done: false,
      },
      {
        id: 2,
        description: "Revisar UI",
        done: true,
      },
    ]);
  });
});
