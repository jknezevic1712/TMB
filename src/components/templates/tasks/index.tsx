import dynamic from "next/dynamic";
import { useEffect, useReducer, useState } from "react";
// custom hooks
import useStore from "@/lib/hooks/useStore";
// utils
import { type TaskStateData, filterTasks } from "@/lib/utils";
// components
import AddNewDialog from "../../organisms/addNewTaskDialog";
import TaskFilter from "@/components/organisms/taskFilter";

const TasksTable = dynamic(() => import("@/components/organisms/tasksTable"), {
  ssr: false,
});

export type ReducerActions =
  | { type: "DESCRIPTION"; payload: string }
  | { type: "ASSIGNEE"; payload: string | null }
  | { type: "PRIORITY" | "DUE_DATE"; payload: number | null }
  | { type: "RESET"; payload: undefined };

const initialState: TaskStateData = {
  description: "",
  assignee: null,
  priority: null,
  dueDate: null,
};
function filterReducer(state: TaskStateData, action: ReducerActions) {
  const { type, payload } = action;
  switch (type) {
    case "DESCRIPTION":
      return (state = { ...state, description: payload });
    case "ASSIGNEE":
      return (state = { ...state, assignee: payload });
    case "PRIORITY":
      return (state = { ...state, priority: payload });
    case "DUE_DATE":
      return (state = { ...state, dueDate: payload });
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function TasksTemplate() {
  const storeTasks = useStore((s) => s.tasks);
  const [tasks, setTasks] = useState(storeTasks);
  const [filters, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    setTasks(filterTasks(filters, storeTasks ?? []));
  }, [filters, storeTasks]);

  return (
    <div className="flex w-full flex-col items-center justify-start gap-2">
      <div className="flex w-full items-center justify-between">
        <TaskFilter filters={filters} dispatch={dispatch} />
        <AddNewDialog
          name="Create New"
          title="New Task"
          description="Please provide task details"
        />
      </div>

      <TasksTable tasks={tasks} />
    </div>
  );
}
