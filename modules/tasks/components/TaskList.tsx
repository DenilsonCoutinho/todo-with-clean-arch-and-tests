"use client";
import { Task } from "@/core/domain/tasks/task-repository";
import UpdateTask from "@/actions/updateTask";
import { useState } from "react";
import { DeleteTask } from "@/actions/deleteTask";
import TaskItem from "./taskItem";
import UpdateTaskDescription from "@/actions/updateTaskDescription";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());
  const [isEditing, setIsEditing] = useState<number | null>();
  const [description, setDescription] = useState<string>('');

  async function cancelEditing() {
    setIsEditing(null)
  }

  async function updateDescriptionTask(id: number, description: string) {
  try {
      await UpdateTaskDescription(id,description);
      setIsEditing(null)
      toast.success("Tarefa editada com sucesso!",{
        style:{
          background:"green",
          color:"white"
        }
      })
    } catch (error) {
      if(error instanceof Error){
        toast.error("Tarefa editada com sucesso!",{
        style:{
          background:"red",
          color:"white"
        }
      })
      }
      console.error("erro ao editar task", error);
    }
  
  }

  async function updateIsDoneTask(id: number, isChecked: boolean) {
    try {
      setUpdatingIds((current) => new Set(current).add(id));
      await UpdateTask(id, isChecked);
      setUpdatingIds((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
       toast.success("Status atualizado com sucesso!",{
        style:{
          background:"green",
          color:"white"
        }
      })
    } catch (error) {
      if(error instanceof Error){
        toast.error("erro ao atualizar task!",{
        style:{
          background:"red",
          color:"white"
        }
      })}
      console.error("erro ao atualizar task", error);
    }
  }

  async function deleteTask(id: number) {
    try {
      await DeleteTask(id);
      toast.success("Tarefa deletar com sucesso!",{
        style:{
          background:"green",
          color:"white"
        }
      })
    } catch (error) {
      
     if(error instanceof Error){
        toast.error("Tarefa deletar com sucesso!",{
        style:{
          background:"red",
          color:"white"
        }
      })}
      
      console.error("erro ao deletar task", error);
    }
  }

  return (
    <Card className="rounded-xl border-border/80 bg-[oklch(0.995_0.006_82)] py-0 shadow-sm [--card-spacing:0]">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Tarefas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {tasks.length ? (
          <div className="max-h-[560px] overflow-y-auto">
            <div className="flex flex-col divide-y divide-border/70">
              {tasks &&
                tasks.map((task) => {
                  return (
                    <TaskItem
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      updateIsDoneTask={updateIsDoneTask}
                      updatingIds={updatingIds}
                      setIsEditing={() => setIsEditing(task.id)}
                      isEdinting={isEditing === task.id}
                      onSave={()=>updateDescriptionTask(task.id,description)}
                      onChangeDescription={(e)=>setDescription(e)}
                      onCancelEditing={cancelEditing}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            Nenhuma tarefa por aqui.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
