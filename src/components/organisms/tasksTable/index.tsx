import type { DragEvent } from "react";
// hooks
import useFirebaseActions from "@/lib/hooks/useFirebaseActions";
// components
import TaskItem from "@/components/molecules/taskItem";
// types
import type { TaskForApp } from "@/lib/types/tasks";

export default function TasksTable({ tasks }: { tasks: TaskForApp[] | null }) {
  const { switchTaskStatus } = useFirebaseActions();

  function allowDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function drag(e: DragEvent<HTMLDivElement>, tableID: string) {
    e.dataTransfer.setData("taskID", e.currentTarget.id);
    e.dataTransfer.setData("tableID", tableID);
  }

  function drop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const taskID = e.dataTransfer.getData("taskID");
    const oldTableID = e.dataTransfer.getData("tableID");
    const newTableID = e.currentTarget.id;

    if (oldTableID !== newTableID) {
      switchTaskStatus(newTableID, taskID);
    }
  }

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
      <div className="flex min-h-[180px] w-full flex-col rounded-sm bg-zinc-200 p-2 transition-all">
        <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
          To Do
        </h2>
        <div
          id="toDoTable"
          onDrop={(e) => drop(e)}
          onDragOver={(e) => allowDrop(e)}
          className="flex h-full flex-col justify-start"
        >
          {tasks
            .filter((task) => task.status === "To Do")
            .map((task) => (
              <TaskItem
                key={task.id}
                data={task}
                dragEvent={(e) => drag(e, "toDoTable")}
              />
            ))}
        </div>
      </div>

      <div className="flex min-h-[180px] w-full flex-col rounded-sm bg-zinc-200 p-2 transition-all">
        <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
          In Progress
        </h2>
        <div
          id="inProgressTable"
          onDrop={(e) => drop(e)}
          onDragOver={(e) => allowDrop(e)}
          className="flex h-full flex-col justify-start"
        >
          {tasks
            .filter((task) => task.status === "In Progress")
            .map((task) => (
              <TaskItem
                key={task.id}
                data={task}
                dragEvent={(e) => drag(e, "inProgressTable")}
              />
            ))}
        </div>
      </div>

      <div className="flex min-h-[180px] w-full flex-col rounded-sm bg-zinc-200 p-2 transition-all">
        <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
          Completed
        </h2>
        <div
          id="completedTable"
          onDrop={(e) => drop(e)}
          onDragOver={(e) => allowDrop(e)}
          className="flex h-full flex-col justify-start"
        >
          {tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <TaskItem
                key={task.id}
                data={task}
                dragEvent={(e) => drag(e, "completedTable")}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
