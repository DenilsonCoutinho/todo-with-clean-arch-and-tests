"use server"

import { CreateTaskUseCase } from "@/core/application/task/create-task-usecase";
import { InfraPrismaTask } from "@/core/infrastructure/infra-prisma-task-repository";
import { revalidatePath } from "next/cache";

export async function createTask(input: { description: string }) {
    const repository = new InfraPrismaTask();
    const createTask = new CreateTaskUseCase(repository);
    await createTask.execute(input);
    revalidatePath('/')
  }