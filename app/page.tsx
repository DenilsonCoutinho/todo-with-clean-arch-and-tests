import { FindTasks } from "@/actions/findTasks";
import CardCreateTask from "@/modules/tasks/components/cardCreateTask";
import TaskList from "@/modules/tasks/components/TaskList";

export default async function Home() {
  const result = await FindTasks();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <CardCreateTask />
      <TaskList tasks={result || []} />
    </div>
  );
}
