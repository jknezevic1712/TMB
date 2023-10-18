import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// components
import { Input } from "@/components/atoms/input";
import AddNewDialog from "../../organisms/addNewTaskDialog";
import { X } from "lucide-react";
// custom hooks
import useStore from "@/lib/hooks/useStore";
// utils
import { filterTasks } from "@/lib/utils";

const TasksTable = dynamic(() => import("@/components/organisms/tasksTable"), {
  ssr: false,
});

export default function TasksTemplate() {
  const storeTasks = useStore((s) => s.tasks);
  const [tasks, setTasks] = useState(storeTasks);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setTasks(filterTasks(filter, storeTasks ?? []));
  }, [filter, storeTasks]);

  return (
    <div className="flex w-full flex-col items-center justify-start gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="relative">
          <Input
            className="max-w-xs border-zinc-300 pr-10"
            placeholder="Filter by description..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div
            className="absolute right-1 top-0 mt-2 cursor-pointer"
            onClick={() => setFilter("")}
          >
            <X />
          </div>
        </div>
        <AddNewDialog
          name="Create New"
          title="New Task"
          description="Please provide task details"
        />
      </div>

      <TasksTable tasks={tasks} />
    </div>
  );
}
