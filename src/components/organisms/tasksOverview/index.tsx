// types
import type { TaskForApp } from "@/lib/types/tasks";
// components
import TaskTable from "@/components/organisms/taskTable";

export default function TasksOverview({
  tasks,
}: {
  tasks: TaskForApp[] | null;
}) {
  if (!tasks || tasks.length < 1) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center">
        <h1 className="text-center text-xl capitalize">
          No tasks, so create a new one!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <TaskTable id="toDoTable" tasks={tasks} taskType="To Do" />
      <TaskTable id="inProgressTable" tasks={tasks} taskType="In Progress" />
      <TaskTable id="completedTable" tasks={tasks} taskType="Completed" />
    </div>
  );
}
