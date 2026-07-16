"use client";
import { createTask } from "@/actions/createTask";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function CardCreateTask() {
  const [task, setTask] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  async function CreateTask(input: { description: string }) {
    try {
      await createTask(input);
      toast.success("Tarefa criada com sucesso!", {
        style: {
          background: "green",
          color: "white",
        },
      });
      setTask("");
    } catch (error) {
      if (error instanceof Error) {
        toast.success(error.message, {
          style: {
            background: "red",
            color: "white",
          },
        });
      }
      requestAnimationFrame(() => {
        ref.current?.focus();
        ref.current?.select();
      })

      console.error("Erro ao cria task", error);
    }
  }
  return (
    <Card className="rounded-xl border-border/80 bg-[oklch(0.995_0.006_82)] py-0 shadow-sm [--card-spacing:0]">
      <CardContent className="p-2">
        <div className="flex gap-2">
          <Input
            ref={ref}
            onChange={(e) => setTask(e.target.value)}
            value={task}
            placeholder="Adicionar tarefa"
            className="h-10 border-0 bg-transparent px-2 text-foreground shadow-none focus-visible:ring-0"
          />
          <Button
            onClick={() => CreateTask({ description: task })}
            size="icon"
            className="size-10 cursor-pointer rounded-lg bg-[oklch(0.62_0.16_38)] text-white hover:bg-[oklch(0.56_0.16_38)]"
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
