import { useEffect } from "react";
import dynamic from "next/dynamic";
// components
import AddNewDialog from "../../organisms/addNewDialog";

// hooks
import useFirebaseActions from "@/lib/hooks/firebase";
import useStore from "@/lib/hooks/store";

const TasksTable = dynamic(() => import("@/components/organisms/tasksTable"), {
  ssr: false,
});

export default function Tasks() {
  const { fetchTasks } = useFirebaseActions();
  const setTasks = useStore((s) => s.setTasks);

  useEffect(() => {
    fetchTasks()
      .then((tasks) => setTasks(tasks))
      .catch((e) => console.log("Error fetching tasks, ", e));
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-start gap-2">
      <div className="flex w-full items-center justify-end">
        {/* <h1 className="text-xl font-bold">Tasks</h1> */}
        <AddNewDialog
          name="Create New"
          title="New Task"
          description="Please provide task description"
        />
      </div>

      {/* TODO: Table with tasks */}
      <TasksTable />
    </div>
  );
}
