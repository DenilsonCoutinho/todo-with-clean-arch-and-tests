import { prisma } from "@/lib/prisma";
import { ItaskRepository, Task } from "../domain/tasks/task-repository";

export class InfraPrismaTask implements ItaskRepository {
  async createTask(task: string): Promise<void> {
    await prisma.task.create({
      data: {
        description: task,
        done: false,
      },
    });
  }

  async findMany(): Promise<null | Task[]> {
    const result = await prisma.task.findMany({ 
      orderBy:{
        id:"asc"
      }
    });
    return result;
  }
  
  async updateIsCheckedTask(id: number,isCheckd:boolean): Promise<void> {
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
