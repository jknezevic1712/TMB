import { useState, type DragEvent } from "react";
// components
import { ChevronDown, ChevronUp } from "lucide-react";
// types
import type { TaskForApp } from "@/lib/types/tasks";
import { Button } from "@/components/atoms/button";
import TaskItemDetails from "../taskItemDetails";
import EditTaskDialog from "@/components/organisms/editTaskDialog";

type TaskItemProps = {
  data: TaskForApp;
  dragEvent: (e: DragEvent<HTMLDivElement>) => void;
};
export default function TaskItem(props: TaskItemProps) {
  const { data, dragEvent } = props;
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <div
      id={data.id}
      className="my-2 flex flex-col items-start gap-2 rounded-sm border-transparent bg-zinc-100 p-2 pb-0 shadow-md transition-all"
      draggable
      onDragStart={(e) => dragEvent(e)}
      // onClick={() => setShowEditDialog(true)}
    >
      <div className="flex flex-col gap-4">
        <p className="leading-normal">{data.description}</p>
      </div>

      <div className="flex w-full items-center justify-end">
        <Button
          className="h-8 w-12 bg-zinc-300 text-zinc-950 hover:text-zinc-300"
          onClick={() => setShowTaskDetails((v) => !v)}
        >
          {showTaskDetails ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      <TaskItemDetails data={data} showTaskDetails={showTaskDetails} />

      {showEditDialog && (
        <EditTaskDialog
          data={data}
          showDialog={showEditDialog}
          setShowDialog={setShowEditDialog}
        />
      )}
    </div>
  );
}
