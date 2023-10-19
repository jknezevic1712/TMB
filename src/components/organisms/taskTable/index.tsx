// types
import type { DragEvent } from "react";
import type { TaskForApp } from "@/lib/types/tasks";
// custom hooks
import useFirebaseActions from "@/lib/hooks/useFirebaseActions";
// components
import TaskItem from "@/components/molecules/taskItem";

type TaskTableProps = {
  id: "toDoTable" | "inProgressTable" | "completedTable";
  tasks: TaskForApp[];
  taskType: "To Do" | "In Progress" | "Completed";
};
export default function TaskTable(props: TaskTableProps) {
  const { id, tasks, taskType } = props;
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

  return (
    <div className="flex min-h-[180px] w-full flex-col rounded-sm bg-zinc-200 p-2 transition-all">
      <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
        {taskType}
      </h2>
      <div
        id={id}
        onDrop={(e) => drop(e)}
        onDragOver={(e) => allowDrop(e)}
        className="flex h-full flex-col justify-start"
      >
        {tasks
          .filter((task) => task.status === taskType)
          .map((task) => (
            <TaskItem
              key={task.id}
              data={task}
              dragEvent={(e) => drag(e, id)}
            />
          ))}
      </div>
    </div>
  );
}
