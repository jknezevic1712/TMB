// components
import { Button } from "@/components/atoms/button";
// utils
import {
  getFormattedDate,
  setColorByTaskPriority,
  taskPriorities,
} from "@/lib/utils";
// hooks
import useFirebaseActions from "@/lib/hooks/useFirebaseActions";
// types
import { type TaskForApp } from "@/lib/types/tasks";
import type { Dispatch, SetStateAction } from "react";

type TaskItemDetailsProps = {
  data: TaskForApp;
  showTaskDetails: boolean;
  setShowEditDialog: Dispatch<SetStateAction<boolean>>;
};
export default function TaskItemDetails(props: TaskItemDetailsProps) {
  const { data, showTaskDetails, setShowEditDialog } = props;
  const { deleteTask } = useFirebaseActions();

  return (
    <div
      className={`flex w-full flex-col items-start justify-center border-t border-zinc-300 transition-all ${
        showTaskDetails
          ? "pointer-events-auto h-full opacity-100"
          : "pointer-events-none h-0 opacity-0"
      }`}
    >
      <div className="flex w-full flex-col items-start justify-center gap-2 py-4">
        <div className="flex w-full items-center justify-between gap-2">
          <span className="font-semibold capitalize italic">{data.author}</span>
          <span>{getFormattedDate(+data.dateCreated)}</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="font-semibold">Assignee</span>
          <span className="capitalize">{data.assignee}</span>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <span
            className={`font-semibold capitalize ${setColorByTaskPriority(
              data.priority,
            )}`}
          >
            {taskPriorities[data.priority]} Priority
          </span>
          <span>{getFormattedDate(+data.dueDate)}</span>
        </div>
        <div className="flex w-full items-center justify-center gap-2 pt-2">
          <Button
            variant="info"
            className="w-full"
            onClick={() => setShowEditDialog(true)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => deleteTask(data.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
