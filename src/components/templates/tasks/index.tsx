import dynamic from "next/dynamic";
// components
import AddNewDialog from "../../organisms/addNewDialog";

const TasksTable = dynamic(() => import("@/components/organisms/tasksTable"), {
  ssr: false,
});

export default function Tasks() {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-2">
      <div className="flex w-full items-center justify-end">
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