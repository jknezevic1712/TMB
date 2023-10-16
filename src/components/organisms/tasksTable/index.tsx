import { type DragEvent } from "react";
// hooks
import useStore from "@/lib/hooks/useStore";
import useFirebaseActions from "@/lib/hooks/useFirebaseActions";
// components
import TaskItem from "@/components/molecules/taskItem";

export default function TasksTable() {
  const tasks = useStore((s) => s.tasks);
  const { switchTaskStatus } = useFirebaseActions();

  function allowDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function drag(e: DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("text", (e.target as any).id);
  }

  function drop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const taskID = e.dataTransfer.getData("text");
    const newTaskStatusTableID = e.currentTarget.id;

    switchTaskStatus(newTaskStatusTableID, taskID);
  }

  if (!tasks) {
    return <p>No Tasks</p>;
  }

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="flex w-full flex-col rounded-sm bg-zinc-200 p-2 transition-all">
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
              <TaskItem key={task.id} data={task} dragEvent={(e) => drag(e)} />
            ))}
        </div>
      </div>

      <div className="flex w-full flex-col rounded-sm bg-zinc-200 p-2 transition-all">
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
              <TaskItem key={task.id} data={task} dragEvent={(e) => drag(e)} />
            ))}
        </div>
      </div>

      <div className="flex w-full flex-col rounded-sm bg-zinc-200 p-2 transition-all">
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
              <TaskItem key={task.id} data={task} dragEvent={(e) => drag(e)} />
            ))}
        </div>
      </div>
    </div>
  );
}
