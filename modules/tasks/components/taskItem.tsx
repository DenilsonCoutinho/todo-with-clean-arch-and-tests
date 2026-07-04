import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { task } from "@/core/domain/tasks/task-repository";
import { Check, Pen, Trash, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
interface ItaskItem {
  task: task;
  updateIsDoneTask: (id: number, checked: boolean) => void;
  deleteTask: (id: number) => void;
  updatingIds: Set<number>;
  isEdinting: boolean;
  setIsEditing: () => void;
  onCancelEditing: () => void;
  onSave:()=>void
  onChangeDescription:(v:string)=>void
}

export default function TaskItem({
  task,
  updateIsDoneTask,
  deleteTask,
  updatingIds,
  isEdinting,
  setIsEditing,
  onChangeDescription,
  onSave,
  onCancelEditing
}: ItaskItem) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    if (isEdinting) {
      setDescription(task.description);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [isEdinting, task.description]);
  return (
    <>
      <div
        key={task.id}
        className="px-4 py-3 text-foreground transition-colors hover:bg-[oklch(0.965_0.018_82)]"
      >
        {isEdinting ? (
          <Input
            ref={inputRef}
            onChange={(e) => {onChangeDescription(e.target.value);setDescription(e.target.value)}}
            className="isDisabled h-10 bg-background"
            value={description}
          ></Input>
        ) : (
          <div
            className={`text-sm leading-6 ${task.done ? "text-muted-foreground line-through decoration-primary/70" : "text-foreground"}`}
          >
            {task.description}
          </div>
        )}
        {isEdinting ? (
          <div className="mt-2 flex items-center gap-2">
            <Check onClick={onSave} className="size-5 cursor-pointer text-primary"/>
            <X onClick={onCancelEditing} className="size-5 cursor-pointer text-destructive"/>
          </div>
        ) : (
          <div className="mt-2 flex items-center gap-1.5">
            <Switch
              checked={task.done}
              disabled={updatingIds.has(task.id)}
              onCheckedChange={(c) => {
                updateIsDoneTask(task.id, c);
              }}
              id={`switch-focus-mode-${task.id}`}
            />
            <Button
              onClick={() => deleteTask(task.id)}
              disabled={updatingIds.has(task.id)}
              size="icon-sm"
              variant="destructive"
              className="cursor-pointer bg-transparent text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash />
            </Button>

            <Button
              onClick={setIsEditing}
              disabled={updatingIds.has(task.id)}
              size="icon-sm"
              variant="ghost"
              className="cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <Pen />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
