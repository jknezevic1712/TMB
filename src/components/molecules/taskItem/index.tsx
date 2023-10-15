// utils
import { getFormattedDate } from "@/lib/utils";
// types
import type { TaskForApp } from "@/lib/types/tasks";

type TaskItemProps = {
  children: React.ReactNode;
  data: TaskForApp;
};
export default function TaskItem(props: TaskItemProps) {
  const { children, data } = props;
  return (
    <div
      className="my-2 flex flex-col items-start rounded-sm border-transparent bg-zinc-100 p-2 shadow-md transition-all"
      // draggable
      // onDragStart={(e) => drag(e)}
    >
      <p className="pb-2">{data.description}</p>
      <div className="flex w-full items-center justify-between">
        <span>{getFormattedDate(+data.dateCreated)}</span>
        <span className="flex justify-end gap-2">{children}</span>
      </div>
    </div>
  );
}
