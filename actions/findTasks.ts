"use server"

import { FindManyTasksUseCase } from "@/core/application/task/find-many-tasks-usecase"
import { InfraPrismaTask } from "@/core/infrastructure/infra-prisma-task-repository"


export async function FindTasks(){
const repository = new InfraPrismaTask()
const findTasks = new FindManyTasksUseCase(repository)
return await findTasks.execute()
}
