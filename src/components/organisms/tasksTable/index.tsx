// hooks
import useStore from "@/lib/hooks/store";
import useFirebaseActions from "@/lib/hooks/firebase";
// components
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import TaskItem from "@/components/molecules/taskItem";

export default function TasksTable() {
  const tasks = useStore((s) => s.tasks);
  const { editTask } = useFirebaseActions();
  // const [tasks] = useState<TaskForApp[] | null>(null)

  // function allowDrop(e: DragEvent<HTMLDivElement>) {
  //   e.preventDefault();
  // }

  // function drag(e: DragEvent<HTMLDivElement>) {
  //   e.dataTransfer.setData("text", e.target.id);
  // }

  // function drop(e: DragEvent<HTMLDivElement>) {
  //   e.preventDefault();
  //   const data = e.dataTransfer.getData("text");
  //   e.target.appendChild(document.getElementById(data));
  // }

  if (!tasks) {
    return <p>No Tasks</p>;
  }

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="flex w-full flex-col rounded-sm bg-zinc-200 p-2">
        <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
          To Do
        </h2>
        <div
          id="toDoTable"
          // onDrop={(e) => drop(e)}
          // onDragOver={(e) => allowDrop(e)}
          className="flex h-full flex-col justify-start"
        >
          {tasks
            .filter((task) => task.status === "To Do")
            .map((task) => (
              <TaskItem key={task.id} data={task}>
                <Button
                  className="h-8 w-14 bg-zinc-300 text-yellow-600"
                  onClick={() => editTask({ ...task, status: "In Progress" })}
                >
                  <ChevronRight />
                </Button>
                <Button
                  className="h-8 w-14 bg-zinc-300 text-green-600"
                  onClick={() => editTask({ ...task, status: "Completed" })}
                >
                  <ChevronsRight />
                </Button>
              </TaskItem>
            ))}
        </div>
      </div>

      <div className="flex w-full flex-col rounded-sm bg-zinc-200 p-2">
        <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
          In Progress
        </h2>
        <div
          id="inProgressTable"
          // onDrop={(e) => drop(e)}
          // onDragOver={(e) => allowDrop(e)}
          className="flex h-full flex-col justify-start"
        >
          {tasks
            .filter((task) => task.status === "In Progress")
            .map((task) => (
              <TaskItem key={task.id} data={task}>
                <Button
                  className="h-8 w-14 bg-zinc-300 text-red-600"
                  onClick={() => editTask({ ...task, status: "To Do" })}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  className="h-8 w-14 bg-zinc-300 text-green-600"
                  onClick={() => editTask({ ...task, status: "Completed" })}
                >
                  <ChevronRight />
                </Button>
              </TaskItem>
            ))}
        </div>
      </div>

      <div className="flex w-full flex-col rounded-sm bg-zinc-200 p-2">
        <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
          Completed
        </h2>
        <div
          id="completedTable"
          // onDrop={(e) => drop(e)}
          // onDragOver={(e) => allowDrop(e)}
          className="flex h-full flex-col justify-start"
        >
          {tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <TaskItem key={task.id} data={task}>
                <Button
                  className="h-8 w-14 bg-zinc-300 text-red-600"
                  onClick={() => editTask({ ...task, status: "To Do" })}
                >
                  <ChevronsLeft />
                </Button>
                <Button
                  className="h-8 w-14 bg-zinc-300 text-yellow-600"
                  onClick={() => editTask({ ...task, status: "In Progress" })}
                >
                  <ChevronLeft />
                </Button>
              </TaskItem>
            ))}
        </div>
      </div>
    </div>
  );
}
