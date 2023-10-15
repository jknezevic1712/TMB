import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/molecules/Table";
import useStore from "@/lib/hooks/store";
import type { TaskForApp } from "@/lib/types/tasks";
import { type DragEvent, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";

export default function TasksTable() {
  const tasks = useStore((s) => s.tasks);
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
    <div className="flex w-full flex-col lg:flex-row">
      <div className="flex w-full flex-col bg-red-100 p-2">
        <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
          To Do
        </h2>
        <div
          id="toDoTable"
          // onDrop={(e) => drop(e)}
          // onDragOver={(e) => allowDrop(e)}
          className="h-full"
        >
          {tasks
            .filter((task) => task.status === "To Do")
            .map((task) => (
              <div
                key={task.id}
                className="group flex items-center border-none p-1 transition-all hover:bg-red-200"
                // draggable
                // onDragStart={(e) => drag(e)}
              >
                {/* <span>{task.dateCreated}</span> */}
                <span className="w-2/3">{task.description}</span>
                <span className="flex w-1/3 justify-end gap-2 lg:pointer-events-none lg:opacity-0 lg:transition-all lg:group-hover:pointer-events-auto lg:group-hover:opacity-100">
                  <Button
                    className="h-8 w-12"
                    onClick={() =>
                      console.log("Task moved to In Progress ", task.id)
                    }
                  >
                    <ChevronRight />
                  </Button>
                  <Button
                    className="h-8 w-12"
                    onClick={() =>
                      console.log("Task moved to Completed ", task.id)
                    }
                  >
                    <ChevronsRight />
                  </Button>
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="flex w-full flex-col bg-yellow-100 p-2">
        <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
          In Progress
        </h2>
        <div
          id="inProgressTable"
          // onDrop={(e) => drop(e)}
          // onDragOver={(e) => allowDrop(e)}
          className="h-full"
        >
          {tasks
            .filter((task) => task.status === "In Progress")
            .map((task) => (
              <div
                key={task.id}
                className="group flex items-center border-none p-1 transition-all hover:bg-yellow-200"
              >
                {/* <span>{task.dateCreated}</span> */}
                <span className="w-2/3">{task.description}</span>
                <span className="flex w-1/3 justify-end gap-2 lg:pointer-events-none lg:opacity-0 lg:transition-all lg:group-hover:pointer-events-auto lg:group-hover:opacity-100">
                  <Button
                    className="h-8 w-12"
                    onClick={() => console.log("Task moved to To Do ", task.id)}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    className="h-8 w-12"
                    onClick={() =>
                      console.log("Task moved to Completed ", task.id)
                    }
                  >
                    <ChevronRight />
                  </Button>
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="flex w-full flex-col bg-green-100 p-2">
        <h2 className="w-full border-b-2 border-zinc-950 pb-2 text-xl capitalize italic">
          Completed
        </h2>
        <div
          id="completedTable"
          // onDrop={(e) => drop(e)}
          // onDragOver={(e) => allowDrop(e)}
          className="h-full"
        >
          {tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <div
                key={task.id}
                className="group flex items-center border-none p-1 transition-all hover:bg-green-200"
              >
                {/* <span>{task.dateCreated}</span> */}
                <span className="w-2/3">{task.description}</span>
                <span className="flex w-1/3 justify-end gap-2 lg:pointer-events-none lg:opacity-0 lg:transition-all lg:group-hover:pointer-events-auto lg:group-hover:opacity-100">
                  <Button
                    className="h-8 w-12"
                    onClick={() => console.log("Task moved to To Do ", task.id)}
                  >
                    <ChevronsLeft />
                  </Button>
                  <Button
                    className="h-8 w-12"
                    onClick={() =>
                      console.log("Task moved to In Progress ", task.id)
                    }
                  >
                    <ChevronLeft />
                  </Button>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
