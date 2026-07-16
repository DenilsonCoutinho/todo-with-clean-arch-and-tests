import { InMemoryTaskRepository } from "./in-memory-task-repository";
import { CreateTaskUseCase } from "../create-task-usecase";
import { expect, describe, it, beforeEach } from "vitest";

let repository: InMemoryTaskRepository;
let createTaks: CreateTaskUseCase;

beforeEach(() => {
  repository = new InMemoryTaskRepository();
  createTaks = new CreateTaskUseCase(repository);
});

describe("CreateTaskUseCase", () => {
  it("Deve criar uma task removendo espaços no início e no fim da descrição", async () => {
    await createTaks.execute({ description: "   Estudar testes    " });

    const task = await repository.findMany();
    expect(task).toHaveLength(1);
    expect(task?.[0]).toEqual({
      description: "Estudar testes",
      id: 1,
      done: false
    });
  });

  it("Não deve criar uma task sem descrição", async () => {
   await expect(async () => {
      await createTaks.execute({ description: "" });
    }).rejects.toThrow("A descrição da task é obrigatória.");
  });
});
