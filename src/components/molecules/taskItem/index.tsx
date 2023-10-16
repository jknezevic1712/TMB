import { useState, type DragEvent } from "react";
// components
import { ChevronDown, ChevronUp } from "lucide-react";
// utils
import { getFormattedDate } from "@/lib/utils";
// types
import type { TaskForApp } from "@/lib/types/tasks";
import { Button } from "@/components/atoms/button";

type TaskItemProps = {
  data: TaskForApp;
  dragEvent: (e: DragEvent<HTMLDivElement>) => void;
};
export default function TaskItem(props: TaskItemProps) {
  const { data, dragEvent } = props;
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  function formattedTaskPriority() {
    const defaultClasses = "capitalize font-semibold";

    if (data.priority === "Low")
      return (
        <span className={`${defaultClasses} text-green-600`}>
          {data.priority} Priority
        </span>
      );
    else if (data.priority === "Medium")
      return (
        <span className={`${defaultClasses} text-yellow-600`}>
          {data.priority} Priority
        </span>
      );
    return (
      <span className={`${defaultClasses} text-red-600`}>
        {data.priority} Priority
      </span>
    );
  }

  return (
    <div
      id={data.id}
      className="my-2 flex flex-col items-start gap-2 rounded-sm border-transparent bg-zinc-100 p-2 pb-0 shadow-md transition-all"
      draggable
      onDragStart={(e) => dragEvent(e)}
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

      <div
        className={`flex w-full flex-col items-start justify-center border-t border-zinc-300 transition-all ${
          showTaskDetails
            ? "pointer-events-auto h-full opacity-100"
            : "pointer-events-none h-0 opacity-0"
        }`}
      >
        <div className="flex w-full flex-col items-start justify-center gap-2 py-4">
          <div className="flex w-full items-center justify-between gap-2">
            <span className="font-semibold capitalize italic">
              {data.author}
            </span>
            <span>{getFormattedDate(+data.dateCreated)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Assignee:</span>
            <span className="capitalize">{data.assignee}</span>
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            {formattedTaskPriority()}
            <span>{getFormattedDate(+data.dueDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
