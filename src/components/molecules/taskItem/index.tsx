import { useState, type DragEvent } from "react";
// components
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/atoms/button";
import TaskItemDetails from "@/components/molecules/taskItemDetails";
import EditTaskDialog from "@/components/organisms/editTaskDialog";
// utils
import { setColorByTaskPriority } from "@/lib/utils";
// types
import type { TaskForApp } from "@/lib/types/tasks";

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
      className="my-2 flex flex-col items-start gap-2 rounded-sm border-transparent bg-zinc-100 p-2 pb-0 shadow-md transition-all hover:shadow-xl"
      draggable
      onDragStart={(e) => dragEvent(e)}
    >
      <div className="flex flex-col gap-2">
        <span>
          <AlertTriangle
            className={`${setColorByTaskPriority(data.priority)}`}
          />
        </span>
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

      <TaskItemDetails
        data={data}
        showTaskDetails={showTaskDetails}
        setShowEditDialog={setShowEditDialog}
      />

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
