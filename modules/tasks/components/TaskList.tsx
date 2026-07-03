"use client";
import { task } from "@/core/domain/tasks/task-repository";
import { Switch } from "@/components/ui/switch";
import UpdateTask from "@/actions/updateTask";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteTask } from "@/actions/deleteTask";
import { Trash } from "lucide-react";

export default function TaskList({ tasks }: { tasks: task[] }) {
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());

  async function updateTask(id: number, isChecked: boolean) {
    setUpdatingIds((current) => new Set(current).add(id));

    await UpdateTask(id, isChecked);
    setUpdatingIds((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }

  async function deleteTask(id: number) {
    await DeleteTask(id);
  }

  return (
    <div className="max-w-96 max-h-96  overflow-y-scroll flex flex-col gap-3 w-full">
      {tasks &&
        tasks.map((e) => {
          return (
            <div key={e.id} className="p-4 h-28 border rounded-2xl text-white">
              <div>{e.description}</div>
              <div>{e.id}</div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={e.done}
                  disabled={updatingIds.has(e.id)}
                  onCheckedChange={(c) => {
                    updateTask(e.id, c);
                  }}
                  id={`switch-focus-mode-${e.id}`}
                />
                <ButtonDeleteTask deleteTask={() => deleteTask(e.id)} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

function ButtonDeleteTask({ deleteTask }: { deleteTask: () => void }) {
  return (
    <Button
      onClick={deleteTask}
      className="bg-red-600 text-white  flex justify-center rounded-2xl cursor-pointer"
    >
      <Trash/>
    </Button>
  );
}
