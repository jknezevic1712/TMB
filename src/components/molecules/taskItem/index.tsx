import { type DragEvent } from "react";
// utils
import { getFormattedDate } from "@/lib/utils";
// types
import type { TaskForApp } from "@/lib/types/tasks";

type TaskItemProps = {
  data: TaskForApp;
  dragEvent: (e: DragEvent<HTMLDivElement>) => void;
};
export default function TaskItem(props: TaskItemProps) {
  const { data, dragEvent } = props;
  return (
    <div
      id={data.id}
      className="my-2 flex flex-col items-start rounded-sm border-transparent bg-zinc-100 p-2 shadow-md transition-all"
      draggable
      onDragStart={(e) => dragEvent(e)}
    >
      <p className="pb-2">{data.description}</p>
      <div className="flex w-full items-center justify-between">
        <span>{getFormattedDate(+data.dateCreated)}</span>
      </div>
    </div>
  );
}
