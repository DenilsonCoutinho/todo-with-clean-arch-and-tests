"use client";
import { createTask } from "@/actions/createTask";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CardCreateTask() {
  const [task, setTask] = useState("");
  async function CreateTask(input: { task: string }) {
    await createTask(input);
  }
  return (
    <div className="max-w-96 max-h-42 w-full h-full border rounded-2xl mb-10 p-4">
      <div className="flex flex-col   gap-3">
        <h1 className="text-white">Digite sua tarefa:</h1>
        <Input
          onChange={(e) => setTask(e.target.value)}
          value={task}
          className="py-5 text-white"
        />
        <Button onClick={() => CreateTask({ task })} className="cursor-pointer">
          Salvar
        </Button>
      </div>
    </div>
  );
}
