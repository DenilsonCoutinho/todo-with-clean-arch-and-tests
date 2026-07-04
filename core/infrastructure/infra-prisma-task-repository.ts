import { prisma } from "@/lib/prisma";
import { ItaskRepository, task } from "../domain/tasks/task-repository";

export class InfraPrismaTask implements ItaskRepository {
  async createTask(task: string): Promise<void> {
    await prisma.task.create({
      data: {
        description: task,
        done: false,
      },
    });
  }

  async findMany(): Promise<null | task[]> {
    const result = await prisma.task.findMany({ 
      orderBy:{
        id:"asc"
      }
    });
    return result;
  }
  async findTaskChecked(): Promise<null | task> {
    return null;
  }
  async updateTask(id: number,isCheckd:boolean): Promise<void> {
     await prisma.task.update({
      where:{
        id:id
      },
      data: {
        done: isCheckd,
      },
    });

  }

   async updateDescriptionTask(id: number,description:string): Promise<void> {
     await prisma.task.update({
      where:{
        id:id
      },
      data: {
        description: description,
      },
    });

  }
  async deleteTask(id: number): Promise<void> {
     await prisma.task.delete({
      where:{
        id:id
      },
    });
  }
}
