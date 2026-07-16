"use server";
import { UpdateTaskUseCase } from "@/core/application/task/update-ischecked-task-usecase";
import { InfraPrismaTask } from "@/core/infrastructure/infra-prisma-task-repository";
import { revalidatePath } from "next/cache";

export default async function UpdateTask(id: number, isChecked: boolean) {
  const repository = new InfraPrismaTask();
  const updateTask = new UpdateTaskUseCase(repository);
  await updateTask.execute(id, isChecked);
  revalidatePath("/")
}
