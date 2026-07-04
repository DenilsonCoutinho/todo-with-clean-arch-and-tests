import { FindTasks } from "@/actions/findTasks";
import CardCreateTask from "@/modules/tasks/components/cardCreateTask";
import TaskList from "@/modules/tasks/components/TaskList";

export default async function Home() {
  const result = await FindTasks();
  const tasks = result || [];
  const doneTasks = tasks.filter((task) => task.done).length;
  const pendingTasks = tasks.length - doneTasks;

  return (
    <main className="min-h-screen bg-[oklch(0.965_0.018_82)] text-foreground">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-10 sm:px-6 sm:py-14">
        <header className="space-y-1">
          <p className="text-sm text-muted-foreground">To-do Turbinated</p>
          <div className="flex items-end justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-normal text-foreground">
              Hoje
            </h1>
            <p className="pb-1 text-sm text-muted-foreground">
              {pendingTasks} pendente{pendingTasks === 1 ? "" : "s"} ·{" "}
              {doneTasks} concluida{doneTasks === 1 ? "" : "s"}
            </p>
          </div>
        </header>

        <section className="space-y-3">
          <CardCreateTask />
          <TaskList tasks={tasks} />
        </section>
      </div>
    </main>
  );
}
