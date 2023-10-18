import dynamic from "next/dynamic";
// components
import AddNewDialog from "../../organisms/addNewTaskDialog";
// hooks
import useStore from "@/lib/hooks/useStore";
import { useState } from "react";

const TasksTable = dynamic(() => import("@/components/organisms/tasksTable"), {
  ssr: false,
});

export default function TasksTemplate() {
  const storeTasks = useStore((s) => s.tasks);
  // const [tasks, setTasks] = useState(() => storeTasks?.map((t) => t).sort((a, b) => {
  //   return
  // }))

  return (
    <div className="flex w-full flex-col items-center justify-start gap-2">
      <div className="flex w-full items-center justify-end">
        <AddNewDialog
          name="Create New"
          title="New Task"
          description="Please provide task details"
        />
      </div>

      <TasksTable tasks={storeTasks} />
    </div>
  );
}
