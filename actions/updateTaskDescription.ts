"use server";
import { UpdateTaskDescriptionUseCase } from "@/core/application/task/update-description-task-usecase";
import { InfraPrismaTask } from "@/core/infrastructure/infra-prisma-task-repository";
import { revalidatePath } from "next/cache";

export default async function UpdateTaskDescription(id: number, description: string) {
  const repository = new InfraPrismaTask();
  const updateTaskDescription = new UpdateTaskDescriptionUseCase(repository);
  await updateTaskDescription.execute(id, description);
  revalidatePath("/")
}
