"use server"

import { DeleterTaskUseCase } from "@/core/application/task/delete-task-usecase";
import { InfraPrismaTask } from "@/core/infrastructure/infra-prisma-task-repository";
import { revalidatePath } from "next/cache";

export async function DeleteTask(id: number) {
    const repository = new InfraPrismaTask();
    const createTask = new DeleterTaskUseCase(repository);
    await createTask.execute({id});
    revalidatePath('/')
  }