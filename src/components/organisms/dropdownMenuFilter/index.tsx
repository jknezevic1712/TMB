import * as React from "react";
// utils
import { assigneesMockData, taskPriorities } from "@/lib/assets";
import type { ReducerActions } from "@/components/templates/tasks";
// types
import type { TaskStateData } from "@/lib/utils";
// components
import {
  DropdownMenuRoot,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuArrow,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/molecules/dropdownMenu";
import { ListFilter, Trash2 } from "lucide-react";
import FilterDatePicker from "@/components/molecules/filterDatePicker";
import { Button } from "@/components/atoms/button";

type DropdownMenuFilterProps = {
  filters: TaskStateData;
  dispatch: React.Dispatch<ReducerActions>;
};
export function DropdownMenuFilter(props: DropdownMenuFilterProps) {
  const { filters, dispatch } = props;

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <ListFilter className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        onMouseLeave={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Additional Filters</span>
          <Button
            className="h-8 w-8"
            size="icon"
            variant="destructive"
            onClick={() => dispatch({ type: "RESET", payload: undefined })}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Assignees</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {assigneesMockData.map((assignee, idx) => (
                <DropdownMenuCheckboxItem
                  key={idx}
                  checked={assignee === filters.assignee}
                  onCheckedChange={(checked) =>
                    dispatch({
                      type: "ASSIGNEE",
                      payload: checked ? assignee : "",
                    })
                  }
                >
                  {assignee}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuArrow />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {taskPriorities.map((priority, idx) => (
                <DropdownMenuCheckboxItem
                  key={idx}
                  checked={idx === filters.priority}
                  onCheckedChange={(checked) =>
                    dispatch({
                      type: "PRIORITY",
                      payload: checked ? idx : null,
                    })
                  }
                >
                  {priority}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuArrow />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <div className="focus:bg-accent data-[state=open]:bg-accent relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-zinc-200">
          <FilterDatePicker
            value={filters.dueDate}
            onChange={(date: Date) =>
              dispatch({ type: "DUE_DATE", payload: date.getTime() })
            }
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
