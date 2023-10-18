import { Input } from "@/components/atoms/input";
import { DropdownMenuFilter } from "../dropdownMenuFilter";
import { X } from "lucide-react";
// types
import type { ReducerActions } from "@/components/templates/tasks";
import type { Dispatch } from "react";
import type { TaskStateData } from "@/lib/utils";

type TaskFilterProps = {
  filters: TaskStateData;
  dispatch: Dispatch<ReducerActions>;
};
export default function TaskFilter(props: TaskFilterProps) {
  const { filters, dispatch } = props;

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Input
          className="max-w-xs border-zinc-300 pr-10"
          placeholder="Filter by description..."
          value={filters.description}
          onChange={(e) =>
            dispatch({ type: "DESCRIPTION", payload: e.target.value })
          }
        />
        <div
          className="absolute right-1 top-0 mt-2 cursor-pointer"
          onClick={() => dispatch({ type: "DESCRIPTION", payload: "" })}
        >
          <X />
        </div>
      </div>
      <DropdownMenuFilter filters={filters} dispatch={dispatch} />
    </div>
  );
}
