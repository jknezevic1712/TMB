// components
import AddNewDialog from "../addNewDialog";

// hooks
import useFirebaseDB from "@/lib/hooks/firebase";

export default function Tasks() {
  const { addNewTask } = useFirebaseDB();

  // TODO: Fix permission issues to save the new task

  return (
    <div className="flex w-full flex-col items-center justify-start gap-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Tasks</h1>
        <AddNewDialog
          name="Create New"
          title="New Task"
          description="Please provide task description"
          submitAction={addNewTask}
        />
      </div>

      {/* TODO: Table with tasks */}
    </div>
  );
}
