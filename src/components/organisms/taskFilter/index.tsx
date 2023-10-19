import { AdditionalFilters } from "@/components/molecules/additionalFilters";
// types
import type { ReducerActions } from "@/components/templates/tasks";
import type { Dispatch } from "react";
import type { TaskStateData } from "@/lib/utils";
import DescriptionFilter from "@/components/molecules/descriptionFilter";

type TaskFilterProps = {
  filters: TaskStateData;
  dispatch: Dispatch<ReducerActions>;
};
export default function TaskFilter(props: TaskFilterProps) {
  const { filters, dispatch } = props;

  return (
    <div className="flex items-center gap-2">
      <DescriptionFilter filters={filters} dispatch={dispatch} />
      <AdditionalFilters filters={filters} dispatch={dispatch} />
    </div>
  );
}
