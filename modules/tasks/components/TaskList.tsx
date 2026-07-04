"use client";
import { task } from "@/core/domain/tasks/task-repository";
import UpdateTask from "@/actions/updateTask";
import { useState } from "react";
import { DeleteTask } from "@/actions/deleteTask";
import TaskItem from "./taskItem";
import UpdateTaskDescription from "@/actions/updateTaskDescription";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaskList({ tasks }: { tasks: task[] }) {
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
      console.error("erro ao deletar task", error);
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
    } catch (error) {
      console.error("erro ao atualizar task", error);
    }
  }

  async function deleteTask(id: number) {
    try {
      await DeleteTask(id);
    } catch (error) {
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
                    // <div key={e.id} className="p-4 h-28 border rounded-2xl text-white">
                    //   <div>{e.description}</div>
                    //   <div className="flex items-center gap-1">
                    //     <Switch
                    //       checked={e.done}
                    //       disabled={updatingIds.has(e.id)}
                    //       onCheckedChange={(c) => {
                    //         updateTask(e.id, c);
                    //       }}
                    //       id={`switch-focus-mode-${e.id}`}
                    //     />
                    //     <ButtonDeleteTask deleteTask={() => deleteTask(e.id)} />
                    //     <ButtonEditTask />
                    //   </div>
                    // </div>
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
